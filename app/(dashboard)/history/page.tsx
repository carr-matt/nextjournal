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
    <div className="h-full px-6 py-8">
      <div>
        <h1 className="text-2xl mb-4">{`Average Sentiment Score: ${avg}`}</h1>
      </div>
      <div className="h-[90%] w-[90%]">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
};

export default History;
