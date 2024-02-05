'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { newEntry } from '@/utils/api';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ToastAction } from '@/components/ui/toast';

const NewEntry = () => {
  const [entryContent, setEntryContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleDiscard = () => {
    router.push('/journal');
  };

  const handleEntryContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEntryContent(e.target.value);
    },
    []
  );

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const data = await newEntry(entryContent);
      router.push(`/journal/${data.id}`);
    } catch (error) {
      console.error('Failed to save entry:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem saving your entry.',
        action: (
          <ToastAction
            onClick={handleSave}
            altText="Try again"
          >
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  let saveBtnTxt = isLoading ? 'Saving...' : 'Save Entry';

  return (
    <div className="w-auto p-1 flex flex-col h-full">
      <Tabs
        defaultValue="new-entry"
        className="max-w-[500px] w-full mx-auto my-1 sm:my-8 flex flex-col h-full"
      >
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger
            className="text hover:cursor-default"
            value="new-entry"
          >
            New Entry
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="new-entry"
          className="flex-grow"
        >
          <Card className="flex flex-col h-full">
            <CardContent className="flex-grow pt-6 sm:m-0">
              <Textarea
                className="p-4 w-full h-full text-base sm:text-lg outline-none resize-none"
                placeholder="Write about your day!"
                value={entryContent}
                onChange={handleEntryContentChange}
              />
            </CardContent>
            <CardFooter className="flex justify-between sm:m-0">
              <Button
                onClick={handleSave}
                disabled={isLoading}
              >
                {saveBtnTxt}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isLoading}
                  >
                    Discard
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The entry will be discarded.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="mt-6">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        onClick={handleDiscard}
                        disabled={isLoading}
                      >
                        Discard
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewEntry;
