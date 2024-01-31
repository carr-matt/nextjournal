import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';
import Question from '@/components/Question';
import { Suspense } from 'react';
import Loading from './loading';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">
        Journal
      </h2>
      <div className="my-8">
        <Question />
      </div>
      <Button
        asChild
        variant="default"
      >
        <Link href="/journal/new-entry">
          <Pencil className="mr-2 h-4 w-4" />
          New Entry
        </Link>
      </Button>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8 mb-16">
        {/* <NewEntryCard /> */}
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
