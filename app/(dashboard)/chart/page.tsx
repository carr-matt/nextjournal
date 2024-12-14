import MoodChart from '@/components/MoodChart';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { AlertCircle, ArrowDown, Info, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import NewEntryButton from '@/components/NewEntryButton';

const getData = async () => {
  const user = await getUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (analyses.length === 0) return { analyses: [], avg: 'N/A', isEmpty: true };

  const sum = analyses.reduce(
    (all, current) => all + current.sentimentScore,
    0
  );
  const avg = (sum / analyses.length).toString().slice(0, 4);
  return { analyses, avg, isEmpty: false };
};

const Mood = async () => {
  const { analyses, avg, isEmpty } = await getData();

  if (isEmpty) {
    return (
      <div className="p-2 sm:p-8 h-full">
        <h2 className="pb-2 text-2xl sm:text-3xl font-semibold tracking-tight">
          Mood Chart
        </h2>
        <Separator />
        <div className="w-full h-full p-1 sm:px-8">
          <Alert className="mx-auto my-20 max-w-[500px]">
            <AlertCircle className="size-4" />
            <AlertTitle>No data to display</AlertTitle>
            <AlertDescription>
              Try adding some journal entries!
            </AlertDescription>
          </Alert>
          <div className="w-full flex flex-col items-center">
            <ArrowDown className="size-8 animate-bounce" />
            <NewEntryButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-8 h-full">
      <h2 className="pb-2 text-2xl sm:text-3xl font-semibold tracking-tight">
        Mood Chart
      </h2>
      <Separator />
      <div>
        <h3 className="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight my-4">
          Average Sentiment Score
          <Popover>
            <PopoverTrigger>
              <Button
                variant="ghost"
                className="px-1"
              >
                <Info size={26} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-base">
                Each journal entry is analyzed and assigned a sentiment score,
                ranging from -10 (worst possible mood) to 10 (the best mood).
              </p>
            </PopoverContent>
          </Popover>
          : <span>{avg}</span>
        </h3>
      </div>
      <div className="h-full w-full mb-10">
        <MoodChart data={analyses} />
      </div>
    </div>
  );
};

export default Mood;
