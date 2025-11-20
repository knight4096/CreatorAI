
import React from 'react';
import { CheckCircle2, Lightbulb, LayoutTemplate, Code2 } from 'lucide-react';

interface ResultDisplayProps {
  result: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  // Simple markdown parsing for the specific format requested
  const sections = result.split('###').filter(Boolean);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CheckCircle2 className="text-green-400" />
          Generated Content
        </h2>
        <p className="text-gray-400 text-sm mt-1">Ready to copy and paste</p>
      </div>
      
      <div className="p-6 space-y-8">
        {sections.map((section, index) => {
          const [titleLine, ...contentLines] = section.split('\n');
          const title = titleLine.replace('✔', '').trim();
          const content = contentLines.join('\n').trim();
          
          // If title is empty or content is empty, skip (except for mockup which might have code only)
          if (!titleLine.trim()) return null;

          // Handle UI Mockup Visualization
          if (title.toLowerCase().includes('ui mockup')) {
             // Extract code from markdown block
             const match = content.match(/```(?:html)?([\s\S]*?)```/);
             const htmlCode = match ? match[1].trim() : content;
             
             // If no code found, skip rendering this section
             if (!htmlCode) return null;

             return (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden mt-6 shadow-sm">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <LayoutTemplate className="w-4 h-4 text-purple-600" />
                            AI Suggested UI Design
                        </h3>
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Live Preview</span>
                    </div>
                    
                    {/* Preview Area */}
                    <div className="p-8 bg-slate-100 overflow-x-auto flex justify-center">
                        <div 
                            className="w-full max-w-md bg-white rounded-lg shadow-md p-4 border border-gray-100 transition-all hover:shadow-lg"
                            dangerouslySetInnerHTML={{ __html: htmlCode }} 
                        />
                    </div>

                    {/* Code Toggle/View */}
                    <div className="bg-gray-900 p-4 border-t border-gray-800">
                         <div className="flex items-center gap-2 mb-2">
                            <Code2 className="w-3 h-3 text-gray-400" />
                            <span className="text-xs font-medium text-gray-400">Generated HTML + Tailwind</span>
                         </div>
                         <pre className="text-[10px] font-mono text-gray-500 whitespace-pre-wrap overflow-x-auto max-h-32 custom-scrollbar">
                            {htmlCode}
                         </pre>
                    </div>
                </div>
             );
          }

          const isTips = title.toLowerCase().includes('tips');

          if (isTips) {
            return (
              <div key={index} className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  {title}
                </h3>
                <div className="prose prose-amber max-w-none text-amber-900 text-sm whitespace-pre-wrap leading-relaxed">
                  {content}
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-purple-500 rounded-full inline-block"></span>
                {title}
              </h3>
              <div className="prose prose-purple max-w-none text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                {content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
