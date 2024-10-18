import React from 'react';
import JsonEditor from './components/JsonEditor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[80vh] bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col">
        <JsonEditor />
      </div>
    </div>
  );
}

export default App;