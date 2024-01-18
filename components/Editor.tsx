'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  let saveBtnTxt = isLoading ? 'Saving...' : 'Save Entry';

  const { mood, summary, color, subject, negative } = analysis;
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const data = await updateEntry(entry.id, value);
      setAnalysis(data.analysis);
    } catch (error) {
      // Handle error here (e.g., show error message to the user)
      console.error('Failed to save entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <textarea
          className="w-full h-2/3 p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="mx-8 my-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSave}
          disabled={isLoading}
        >
          {saveBtnTxt}
        </button>
      </div>

      <div className="border-l border-black/10">
        <div
          className="px-6 py-10"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex p-3 items-center border-b border-black/10 justify-between"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
