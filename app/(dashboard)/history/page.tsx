import HistoryChart from '@/components/HistoryChart';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

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
  const avg = Math.round(sum / analyses.length);
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
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-4">{`Average Sentiment Score: ${avg}`}</h3>
      </div>
      <div className="h-[90%] w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
};

export default History;
