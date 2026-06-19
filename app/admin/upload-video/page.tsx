'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Upload, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';

// Use API route for uploads (will use service role)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Lesson {
  id: string;
  title: string;
  module_id: string;
}

interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  message: string;
}

export default function UploadVideoPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
    progress: 0,
    message: ''
  });
  const [isDragging, setIsDragging] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Fetch lessons
  useEffect(() => {
    const fetchLessons = async () => {
      const { data } = await supabase
        .from('module_lessons')
        .select('id, title, module_id')
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.type.startsWith('video/')) {
        setFile(droppedFile);
        setUploadState({ status: 'idle', progress: 0, message: '' });
      } else {
        setUploadState({
          status: 'error',
          progress: 0,
          message: 'Please drop a video file (MP4, MOV, WebM, etc.)'
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type.startsWith('video/')) {
        setFile(selectedFile);
        setUploadState({ status: 'idle', progress: 0, message: '' });
      } else {
        setUploadState({
          status: 'error',
          progress: 0,
          message: 'Please select a video file'
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedLessonId || !videoTitle) {
      setUploadState({
        status: 'error',
        progress: 0,
        message: 'Please select a lesson, provide a title, and choose a video file'
      });
      return;
    }

    setUploadState({ status: 'uploading', progress: 0, message: 'Uploading...' });

    try {
      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = `${selectedLessonId}/${filename}`;

      // Upload via API endpoint (uses service role, bypasses RLS)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('lessonId', selectedLessonId);
      formData.append('videoTitle', videoTitle);

      const uploadResponse = await fetch('/api/upload-video', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        setUploadState({
          status: 'error',
          progress: 0,
          message: `Upload failed: ${error.error || 'Unknown error'}`
        });
        return;
      }

      const uploadResult = await uploadResponse.json();

      setUploadState({
        status: 'success',
        progress: 100,
        message: `Video "${videoTitle}" uploaded and added to lesson!`
      });

      // Reset form
      setFile(null);
      setVideoTitle('');

      // Clear success message after 5 seconds
      setTimeout(() => {
        setUploadState({ status: 'idle', progress: 0, message: '' });
      }, 5000);
    } catch (err: any) {
      setUploadState({
        status: 'error',
        progress: 0,
        message: err.message || 'Upload failed'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Lesson Video</h1>
          <p className="text-gray-600">Upload a video file and automatically add it to a lesson</p>
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
              placeholder="e.g., NCC Orientation Overview"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Drop Zone */}
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
            }`}
          >
            <Upload className="mx-auto text-gray-400 mb-4" size={40} />
            <p className="text-gray-900 font-medium mb-1">Drag and drop your video here</p>
            <p className="text-gray-500 text-sm mb-4">or</p>
            <label className="inline-block">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer font-medium">
                Select File
              </span>
            </label>
            <p className="text-gray-500 text-xs mt-4">
              MP4, MOV, WebM, OGG • Max 2GB per file
            </p>
          </div>

          {/* Selected File */}
          {file && (
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* Status Messages */}
          {uploadState.status === 'uploading' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Loader className="animate-spin text-blue-600" size={20} />
                <span className="text-blue-900 font-medium">{uploadState.message}</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${uploadState.progress}%` }}
                />
              </div>
            </div>
          )}

          {uploadState.status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              <span className="text-green-900 font-medium">{uploadState.message}</span>
            </div>
          )}

          {uploadState.status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="text-red-600" size={20} />
              <span className="text-red-900 font-medium">{uploadState.message}</span>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || !selectedLessonId || !videoTitle || uploadState.status === 'uploading'}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {uploadState.status === 'uploading' ? 'Uploading...' : 'Upload & Add to Lesson'}
          </button>
        </div>
      </div>
    </div>
  );
}
