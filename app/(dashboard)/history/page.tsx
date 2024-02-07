import HistoryChart from '@/components/HistoryChart';
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

const History = async () => {
  const { analyses, avg, isEmpty } = await getData();

  if (isEmpty) {
    return (
      <div className="h-full p-8">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          History
        </h2>
        <Separator />
        <div className="w-full h-full p-1 sm:px-8">
          <Alert className="mx-auto my-20 max-w-[500px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No data to display</AlertTitle>
            <AlertDescription>
              Try adding some journal entries!
            </AlertDescription>
          </Alert>
          <div className="w-full flex flex-col items-center">
            <ArrowDown className="h-8 w-8 animate-bounce" />
            <Button
              asChild
              variant="default"
              className=""
            >
              <Link href="/journal/new-entry">
                <Pencil className="mr-2 h-4 w-4" />
                New Entry
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-8">
      <h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        History
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
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
};

export default History;
