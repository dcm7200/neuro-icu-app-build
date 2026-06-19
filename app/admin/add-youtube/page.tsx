'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Lesson {
  id: string;
  title: string;
}

interface AddState {
  status: 'idle' | 'saving' | 'success' | 'error';
  message: string;
}

export default function AddYouTubePage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [videoTitle, setVideoTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [state, setState] = useState<AddState>({
    status: 'idle',
    message: ''
  });

  // Fetch lessons
  useEffect(() => {
    const fetchLessons = async () => {
      const { data } = await supabase
        .from('module_lessons')
        .select('id, title')
        .order('title');

      if (data) {
        setLessons(data);
        if (data.length > 0) {
          setSelectedLessonId(data[0].id);
        }
      }
    };

    fetchLessons();
  }, []);

  const handleAdd = async () => {
    if (!selectedLessonId || !videoTitle || !youtubeUrl) {
      setState({
        status: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    // Validate YouTube URL
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    if (!youtubeRegex.test(youtubeUrl)) {
      setState({
        status: 'error',
        message: 'Invalid YouTube URL. Try: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID'
      });
      return;
    }

    setState({ status: 'saving', message: 'Adding video...' });

    try {
      // Fetch current lesson content
      const { data: lessonData } = await supabase
        .from('module_lessons')
        .select('content')
        .eq('id', selectedLessonId)
        .single();

      if (!lessonData) {
        setState({
          status: 'error',
          message: 'Lesson not found'
        });
        return;
      }

      // Parse content
      let content = lessonData.content;
      if (typeof content === 'string') {
        content = JSON.parse(content);
      } else if (!content) {
        content = { title: '', duration_min: 0, blocks: [] };
      }

      // Ensure blocks array exists
      if (!content.blocks || !Array.isArray(content.blocks)) {
        content.blocks = [];
      }

      // Add title paragraph
      content.blocks.push({
        type: 'paragraph',
        content: { text: `🎥 ${videoTitle}` }
      });

      // Add video block with YouTube URL
      content.blocks.push({
        type: 'video',
        content: {
          src: youtubeUrl,
          type: 'youtube'
        }
      });

      // Update lesson
      const { error: updateError } = await supabase
        .from('module_lessons')
        .update({ content: JSON.stringify(content) })
        .eq('id', selectedLessonId);

      if (updateError) {
        setState({
          status: 'error',
          message: `Update failed: ${updateError.message}`
        });
        return;
      }

      setState({
        status: 'success',
        message: `Video "${videoTitle}" added to lesson!`
      });

      // Reset form
      setVideoTitle('');
      setYoutubeUrl('');

      // Clear success message after 5 seconds
      setTimeout(() => {
        setState({ status: 'idle', message: '' });
      }, 5000);
    } catch (err: any) {
      setState({
        status: 'error',
        message: err.message || 'Failed to add video'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add YouTube Video to Lesson</h1>
          <p className="text-gray-600">Embed YouTube videos without file size limits</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
          {/* Lesson Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Select Lesson
            </label>
            <select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a lesson...</option>
              {lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>

          {/* Video Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Video Title
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="e.g., Neuro Exam Walkthrough"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* YouTube URL */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              YouTube URL
            </label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-2">
              Paste the full YouTube URL. Supports: youtube.com/watch?v=... or youtu.be/...
            </p>
          </div>

          {/* Status Messages */}
          {state.status === 'saving' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <Loader className="animate-spin text-blue-600" size={20} />
              <span className="text-blue-900 font-medium">{state.message}</span>
            </div>
          )}

          {state.status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              <span className="text-green-900 font-medium">{state.message}</span>
            </div>
          )}

          {state.status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="text-red-600" size={20} />
              <span className="text-red-900 font-medium">{state.message}</span>
            </div>
          )}

          {/* Add Button */}
          <button
            onClick={handleAdd}
            disabled={!selectedLessonId || !videoTitle || !youtubeUrl || state.status === 'saving'}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {state.status === 'saving' ? 'Adding...' : 'Add Video to Lesson'}
          </button>
        </div>
      </div>
    </div>
  );
}
