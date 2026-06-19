import React, { useState } from 'react';
import { ChevronDown, AlertCircle, Info, BookOpen } from 'lucide-react';

type BlockType = 'heading' | 'paragraph' | 'callout' | 'warning' | 'collapsible' | 'table' | 'case-vignette' | 'video' | 'html';

interface ContentBlock {
  type: BlockType;
  content: any;
  order?: number;
}

interface LessonContent {
  title: string;
  duration_min: number;
  blocks: ContentBlock[];
}

// Callout Component
const Callout: React.FC<{ icon?: string; title?: string; text: string }> = ({ icon = 'info', title, text }) => {
  const bgColor = icon === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200';
  const iconColor = icon === 'warning' ? 'text-amber-600' : 'text-blue-600';
  const Icon = icon === 'warning' ? AlertCircle : Info;

  return (
    <div className={`border-l-4 ${bgColor} p-4 my-4 rounded`}>
      <div className="flex gap-3">
        <Icon className={`${iconColor} flex-shrink-0 mt-0.5`} size={20} />
        <div>
          {title && <p className="font-semibold text-gray-900 mb-1">{title}</p>}
          <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
};

// Warning Component
const Warning: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="border-l-4 border-red-500 bg-red-50 p-4 my-4 rounded">
      <div className="flex gap-3">
        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
        <p className="text-red-800 text-sm leading-relaxed font-medium">{text}</p>
      </div>
    </div>
  );
};

// Collapsible Component
const Collapsible: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg my-3 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors font-medium text-gray-900"
      >
        <span>{title}</span>
        <ChevronDown
          size={20}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-white border-t border-gray-200 text-gray-700 text-sm leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
};

// Table Component
const Table: React.FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, idx) => (
              <th key={idx} className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="border border-gray-300 px-4 py-2 text-gray-700 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Case Vignette Component
const CaseVignette: React.FC<{ stem: string; role: string; correct_action: string }> = ({
  stem,
  role,
  correct_action,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="border-l-4 border-purple-500 bg-purple-50 p-4 my-4 rounded">
      <div className="mb-3">
        <p className="text-sm font-semibold text-gray-600 mb-1">CLINICAL VIGNETTE</p>
        <p className="text-gray-900 font-medium">{stem}</p>
      </div>
      <div className="mb-3">
        <p className="text-sm">
          <span className="font-semibold text-purple-700">Role:</span> {role}
        </p>
      </div>
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="inline-flex items-center gap-2 text-sm font-medium text-purple-700 hover:text-purple-900 transition-colors"
      >
        <ChevronDown size={16} className={`transition-transform ${showAnswer ? 'rotate-180' : ''}`} />
        {showAnswer ? 'Hide' : 'Show'} Correct Action
      </button>
      {showAnswer && (
        <div className="mt-3 p-3 bg-white rounded border border-purple-200">
          <p className="text-gray-700 text-sm">{correct_action}</p>
        </div>
      )}
    </div>
  );
};

// Main Renderer Component
const LessonRenderer: React.FC<{ content: LessonContent }> = ({ content }) => {
  // Safety check: ensure content and blocks exist
  if (!content || !content.blocks || !Array.isArray(content.blocks)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">No content available</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{content.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <BookOpen size={16} />
            {content.duration_min} min read
          </span>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="prose prose-lg max-w-none">
        {content.blocks.map((block, idx) => {
          switch (block.type) {
            case 'heading':
              return (
                <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4 scroll-mt-20">
                  {block.content.text}
                </h2>
              );

            case 'paragraph':
              return (
                <p key={idx} className="text-gray-700 text-base leading-relaxed mb-4">
                  {block.content.text}
                </p>
              );

            case 'callout':
              return (
                <Callout
                  key={idx}
                  icon={block.content.icon}
                  title={block.content.title}
                  text={block.content.text}
                />
              );

            case 'warning':
              return <Warning key={idx} text={block.content.text} />;

            case 'collapsible':
              return (
                <Collapsible
                  key={idx}
                  title={block.content.title}
                  content={block.content.content}
                />
              );

            case 'table':
              return (
                <Table
                  key={idx}
                  headers={block.content.headers}
                  rows={block.content.rows}
                />
              );

            case 'case-vignette':
              return (
                <CaseVignette
                  key={idx}
                  stem={block.content.stem}
                  role={block.content.role}
                  correct_action={block.content.correct_action}
                />
              );

            case 'video':
              // Check if it's a YouTube URL
              const isYouTube = block.content.src?.includes('youtube.com') || block.content.src?.includes('youtu.be');
              let youtubeId = '';
              
              if (isYouTube) {
                // Extract YouTube video ID
                const match = block.content.src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
                youtubeId = match ? match[1] : '';
              }

              return (
                <div key={idx} className="my-6 rounded-lg overflow-hidden">
                  {youtubeId ? (
                    <iframe
                      width="100%"
                      height="600"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: '8px' }}
                    />
                  ) : (
                    <video
                      width="100%"
                      height="600"
                      controls
                      style={{ borderRadius: '8px', backgroundColor: '#000' }}
                    >
                      <source src={block.content.src} type={block.content.type || 'video/mp4'} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              );

            case 'html':
              return (
                <div
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: block.content.html }}
                  className="my-6"
                />
              );

            default:
              return null;
          }
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
        <p>End of lesson · Mark complete to proceed</p>
      </div>
    </div>
  );
};

export default LessonRenderer;
export { LessonRenderer };
