import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileJson2 } from 'lucide-react';

const JsonEditor: React.FC = () => {
  const [jsonText, setJsonText] = useState('');
  const [isValid, setIsValid] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    validateJson(jsonText);
  }, [jsonText]);

  const validateJson = (text: string) => {
    try {
      if (text.trim() === '') {
        setIsValid(true);
        return;
      }
      JSON.parse(text);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonText(e.target.value);
  };

  const prettifyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const prettified = JSON.stringify(parsed, null, 2);
      setJsonText(prettified);
      // Force re-render of SyntaxHighlighter
      if (textareaRef.current) {
        textareaRef.current.value = prettified;
        textareaRef.current.scrollTop = 0;
      }
    } catch (error) {
      // If JSON is invalid, don't prettify
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center bg-gray-800 text-white p-2">
        <h2 className="text-lg font-semibold flex items-center">
          <FileJson2 className="mr-2" /> JSON Editor
        </h2>
        <button
          onClick={prettifyJson}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded transition duration-200"
        >
          Prettify
        </button>
      </div>
      <div className="relative flex-grow overflow-auto">
        <textarea
          ref={textareaRef}
          className={`w-full h-full p-4 font-mono text-sm resize-none outline-none bg-transparent text-transparent caret-white absolute top-0 left-0 z-10 ${
            isValid ? '' : 'bg-red-900 bg-opacity-20'
          }`}
          value={jsonText}
          onChange={handleChange}
          placeholder="Enter JSON here..."
          spellCheck={false}
          wrap="soft"
        />
        <SyntaxHighlighter
          language="json"
          style={vscDarkPlus}
          className="w-full h-full p-4 font-mono text-sm overflow-visible whitespace-pre-wrap break-all"
          wrapLines={true}
          wrapLongLines={true}
        >
          {jsonText || ' '}
        </SyntaxHighlighter>
      </div>
      {!isValid && (
        <div className="text-red-500 bg-red-100 p-2 text-center">Invalid JSON format</div>
      )}
    </div>
  );
};

export default JsonEditor;