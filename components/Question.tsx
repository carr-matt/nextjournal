'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircleQuestion } from 'lucide-react';

const Question = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const answer = await askQuestion(value);

    setResponse(answer);
    setValue('');
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-3xl items-center space-x-2"
      >
        <Input
          disabled={loading}
          onChange={onChange}
          value={value}
          id="question"
          type="text"
          placeholder="Ask your Journal AI a question"
        />
        <Button
          disabled={loading}
          type="submit"
        >
          <MessageCircleQuestion className="mr-2 h-4 w-4" />
          Ask
        </Button>
      </form>
      {loading && <div>...loading</div>}
      {response && (
        <div className="w-full max-w-3xl">
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {response}
          </blockquote>
        </div>
      )}
    </div>
  );
};

export default Question;
