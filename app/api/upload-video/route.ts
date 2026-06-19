import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const lessonId = formData.get('lessonId') as string;
    const videoTitle = formData.get('videoTitle') as string;

    if (!file || !lessonId || !videoTitle) {
      return NextResponse.json(
        { error: 'Missing file, lessonId, or videoTitle' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `${lessonId}/${filename}`;

    // Upload to storage using service role (bypasses RLS)
    // Use file directly without converting to buffer
    const { data, error: uploadError } = await supabase.storage
      .from('lesson-videos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message || 'File size may exceed limits'}` },
        { status: 400 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('lesson-videos')
      .getPublicUrl(filePath);

    const videoUrl = urlData.publicUrl;

    // Fetch current lesson content
    const { data: lessonData, error: fetchError } = await supabase
      .from('module_lessons')
      .select('id, title, content')
      .eq('id', lessonId)
      .single();

    console.log('Lesson fetch result:', { lessonData, fetchError });

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: `Fetch error: ${fetchError.message}` },
        { status: 400 }
      );
    }

    if (!lessonData) {
      console.error('No lesson found for ID:', lessonId);
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Parse and update content (or create if doesn't exist)
    let content;
    
    if (!lessonData.content) {
      console.log('Lesson has no content, creating new structure');
      content = {
        title: lessonData.title,
        duration_min: 0,
        blocks: []
      };
    } else {
      console.log('Content type before parse:', typeof lessonData.content);
      
      if (typeof lessonData.content === 'string') {
        try {
          content = JSON.parse(lessonData.content);
          console.log('Content parsed successfully');
        } catch (parseErr) {
          console.error('JSON parse error:', parseErr);
          // If parse fails, create new structure
          content = {
            title: lessonData.title,
            duration_min: 0,
            blocks: []
          };
        }
      } else {
        content = lessonData.content;
        console.log('Content is already an object');
      }
    }

    // Ensure blocks array exists
    // Add video title as paragraph
    const titleBlock = {
      type: 'paragraph' as const,
      content: {
        text: `🎥 ${videoTitle}`
      }
    };

    // Add video as proper video block
    const videoBlock = {
      type: 'video' as const,
      content: {
        src: videoUrl,
        type: file.type || 'video/mp4'
      }
    };

    content.blocks.push(titleBlock);
    content.blocks.push(videoBlock);

    // Update lesson in database
    const { error: updateError } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(content) })
      .eq('id', lessonId);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: `Update failed: ${updateError.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Video "${videoTitle}" uploaded and added to lesson`,
      videoUrl
    });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
