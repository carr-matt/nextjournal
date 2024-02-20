'use client';

import { Loader2, Send, SparklesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { askQuestion } from '@/utils/api';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const AiButton = ({ entries }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [lastQuestion, setLastQuestion] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const answer = await askQuestion(value);

    setResponse(answer);
    setLastQuestion(value);
    setValue('');
    setLoading(false);
  };

  return (
    <Drawer
    // shouldScaleBackground
    // snapPoints={[1]}
    >
      <DrawerTrigger>
        <Button
          variant="shine"
          className="fixed bottom-4 left-4 rounded-full p-2 shadow-md z-20 shadow-violet-500 hover:shadow-violet-700 hover:scale-105 ease-in-out"
        >
          <SparklesIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-xl">
        <DrawerHeader>
          <DrawerTitle>Journal AI</DrawerTitle>
          <DrawerDescription>
            Ask your Journal AI any question! It uses your past entries as
            context to provide personalized insights and answers. The more
            entries you have, the more accurate and insightful the responses.
          </DrawerDescription>
          <form onSubmit={handleSubmit}>
            <Input
              disabled={loading || !entries.length}
              onChange={onChange}
              value={value}
              id="question"
              type="text"
              placeholder="Ask your Journal AI a question..."
              className="w-full mt-6"
            />
            <Button
              disabled={loading || !entries.length}
              type="submit"
              className="w-full mt-2"
            >
              <Send />
            </Button>
          </form>
          {!entries.length && (
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Please write entries to give your Journal AI information to work
              with. The more entries, the better!
            </p>
          )}
          {loading && (
            <div className="mx-auto my-10">
              <Loader2 className="w-16 h-16 animate-spin" />
            </div>
          )}
          {response && (
            <div className="mt-6 mb-10">
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-left">
                You asked: {lastQuestion}
              </p>
              <blockquote className="mt-6 border-l-2 pl-6 italic text-left">
                {response}
              </blockquote>
            </div>
          )}
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Dismiss</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AiButton;
