'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
        <Textarea
          className="w-[97%] h-2/3 m-2 p-4 text-lg outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          className="mx-2"
          onClick={handleSave}
          disabled={isLoading}
        >
          {saveBtnTxt}
        </Button>
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
