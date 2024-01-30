import HistoryChart from '@/components/HistoryChart';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const getData = async () => {
  const user = await getUserByClerkId;
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const sum = analyses.reduce(
    (all, current) => all + current.sentimentScore,
    0
  );
  const avg = (sum / analyses.length).toString().slice(0, 4);
  return { analyses, avg };
};

const History = async () => {
  const { analyses, avg } = await getData();
  return (
    <div className="h-full p-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        History
      </h2>
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
