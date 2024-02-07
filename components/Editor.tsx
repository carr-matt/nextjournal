'use client';

import { updateEntry, deleteEntry } from '@/utils/api';
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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Separator } from './ui/separator';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { JournalEntry } from '@/utils/types';
import { Frown, Smile } from 'lucide-react';

interface EditorProps {
  entry: JournalEntry;
}

const Editor: React.FC<EditorProps> = ({ entry }) => {
  const [entryContent, setEntryContent] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleEntryContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEntryContent(e.target.value);
    },
    []
  );

  const handleDelete = async () => {
    await deleteEntry(entry.id);
    router.push('/journal');
  };

  let saveBtnTxt = isLoading ? 'Saving...' : 'Save Changes';

  const { subject, summary } = entry.analysis || {};
  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: summary },
  ];

  const negIcon = entry.analysis?.negative ? <Frown /> : <Smile />;

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const data = await updateEntry(entry.id, entryContent);
      setAnalysis(data.analysis);
    } catch (err: unknown) {
      console.error('Failed to save entry:', error);
      setError(err.message);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error,
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
      router.refresh();
      toast({ description: 'Your entry has been updated.' });
    }
  };

  const analysisDate = new Date(entry.analysis?.updatedAt || '').toDateString();
  const analysisTime = new Date(
    entry.analysis?.updatedAt || ''
  ).toLocaleTimeString();
  const entryDate = new Date(entry.createdAt).toDateString();
  const entryTime = new Date(entry.createdAt).toLocaleTimeString();
  const updatedDate = new Date(entry.updatedAt).toDateString();
  const updatedTime = new Date(entry.updatedAt).toLocaleTimeString();
  const moodColor = entry.analysis?.color || '';

  return (
    <div className="w-auto p-1 flex flex-col h-full">
      <Tabs
        defaultValue="analysis"
        className="max-w-[500px] w-full mx-auto my-1 sm:my-8 flex flex-col h-full"
      >
        <h2 className="pb-2 text-2xl sm:text-3xl font-semibold tracking-tight">
          {entryDate} · {entryTime}
        </h2>
        <Separator />
        <h3 className="text-base font-medium text-muted-foreground sm:text-2xl tracking-tight py-2">
          {updatedTime !== entryTime
            ? `Updated ${updatedDate} @ ${updatedTime}`
            : ''}
        </h3>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="entry">Entry</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        <div className="flex flex-col h-full">
          <TabsContent
            value="entry"
            className="flex-grow"
          >
            <Card className="flex flex-col h-full">
              <CardContent className="flex-grow pt-6 sm:m-0">
                <Textarea
                  className="p-4 w-full h-full text-base sm:text-lg outline-none resize-none"
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
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. The entry will be
                        permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="mt-6">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          onClick={handleDelete}
                          disabled={isLoading}
                        >
                          Yep! Delete It
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="analysis">
            <Card>
              <CardContent>
                <Table>
                  <TableBody>
                    {analysisData.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.value}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-medium">Mood</TableCell>
                      <TableCell className="flex flex-row justify-between">
                        <span>{entry.analysis?.mood || ''}</span>
                        <span>{negIcon || ''}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mood Color</TableCell>
                      <TableCell
                        style={{ backgroundColor: moodColor, color: moodColor }}
                        className="rounded-full font-extrabold text-center bg-clip-content"
                      >
                        {entry.analysis?.color || ''}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="text-muted-foreground text-base p-4 text-center">{`Analyzed ${analysisDate} @ ${analysisTime}`}</CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Editor;
