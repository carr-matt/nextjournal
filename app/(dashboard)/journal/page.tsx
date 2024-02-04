'use client';

import EntryCard from '@/components/EntryCard';
import Link from 'next/link';
import Question from '@/components/Question';
import { useState, useEffect } from 'react';
import Loading from './loading';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getEntries } from '@/utils/api';

const JournalPage = () => {
  const [entries, setEntries] = useState([]);
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
