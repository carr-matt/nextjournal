'use client';

import { updateEntry, deleteEntry } from '@/utils/api';
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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const Editor = ({ entry }) => {
  const [entryContent, setEntryContent] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const router = useRouter();

  const handleDelete = async () => {
    await deleteEntry(entry.id);
    router.push('/journal');
  };

  let saveBtnTxt = isLoading ? 'Saving...' : 'Save Entry';

  const { mood, summary, color, subject, negative } = analysis;
  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: summary },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const data = await updateEntry(entry.id, entryContent);
      setAnalysis(data.analysis);
    } catch (error) {
      // Handle error here (e.g., show error message to the user)
      console.error('Failed to save entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const date = new Date(analysis.updatedAt).toDateString();
  const time = new Date(analysis.updatedAt).toLocaleTimeString();
  const moodColor = analysis.color;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div className="h-max sm:h-4/5 md:col-span-2 m-6">
        <Textarea
          className="h-max sm:h-4/5 p-4 text-lg outline-none"
          value={entryContent}
          onChange={(e) => setEntryContent(e.target.value)}
        />
        <div className="flex justify-between my-2">
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
                  This action cannot be undone. The entry will be permanently
                  deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="mt-6">Cancel</AlertDialogCancel>
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
        </div>
      </div>

      <Card className="m-6">
        <CardHeader>
          <CardTitle className="text-center">Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {analysisData.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">Mood Color</TableCell>
                <TableCell
                  style={{ backgroundColor: moodColor, color: moodColor }}
                  className="rounded-full font-extrabold text-center bg-clip-content"
                >
                  {analysis.color}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>{`Updated: ${time} ${date}`}</CardFooter>
      </Card>
    </div>
  );
};

export default Editor;
