import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');
    const title = searchParams.get('title');

    if (!moduleId || !title) {
      return Response.json(
        { error: 'Missing moduleId or title' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('module_lessons')
      .select('id, title, module_id, content, lesson_order')
      .eq('module_id', moduleId)
      .eq('title', decodeURIComponent(title))
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: error.message },
        { status: 404 }
      );
    }

    if (!data) {
      return Response.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    return Response.json(data);
  } catch (err: any) {
    console.error('API error:', err);
    return Response.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
