'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

const NewEntry = () => {
  const [entryContent, setEntryContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDiscard = () => {
    router.push('/journal');
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const data = await newEntry(entryContent);
      router.refresh();
      router.push(`/journal/${data.id}`);
    } catch (error) {
      console.error('Failed to save entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  let saveBtnTxt = isLoading ? 'Saving...' : 'Save Entry';

  return (
    <div className="flex flex-col items-center max-w-xl m-6">
      <Textarea
        className="p-4 text-lg outline-none self-stretch flex-grow"
        placeholder="Write about your day!"
        value={entryContent}
        onChange={(e) => setEntryContent(e.target.value)}
      />
      <div className="flex-none">
        <div className="flex flex-row justify-between my-2">
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
                <AlertDialogCancel className="mt-6">Cancel</AlertDialogCancel>
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
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
