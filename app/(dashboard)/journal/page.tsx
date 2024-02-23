'use client';

import EntryCard from '@/components/EntryCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Loading from './loading';
import { getEntries } from '@/utils/api';
import { Separator } from '@/components/ui/separator';
import { JournalEntry } from '@/utils/types';
import NewEntryButton from '@/components/NewEntryButton';
import AiButton from '@/components/AiButton';

const JournalPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = await getEntries();
      setEntries(fetchedEntries);
      setLoading(false);
    };

    fetchEntries();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-2 sm:p-8 h-full">
      <h2 className="pb-2 text-2xl sm:text-3xl font-semibold tracking-tight">
        Journal
      </h2>
      <Separator />
      <div className="my-4 sm:my-8">
        <NewEntryButton />
      </div>
      <AiButton entries={entries} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-8 mb-16">
        {entries.map((entry) => (
          <Link
            href={`/journal/${entry.id}`}
            key={entry.id}
          >
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
