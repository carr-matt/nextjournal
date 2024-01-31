import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';
import Question from '@/components/Question';
import { Suspense } from 'react';
import Loading from './loading';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    include: {
      analysis: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <div className="p-8 h-full">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Journal
      </h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <NewEntryCard />
        <Suspense fallback={<Loading />}>
          {entries.map((entry) => (
            <Link
              href={`/journal/${entry.id}`}
              key={entry.id}
            >
              <EntryCard entry={entry} />
            </Link>
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default JournalPage;
