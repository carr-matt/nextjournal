import Editor from '@/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { JournalEntry } from '@/utils/types';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface EntryPageProps {
  params: {
    id: string;
  };
}

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });
  return entry;
};

const EntryPage: React.FC<EntryPageProps> = async ({ params }) => {
  const entry = await getEntry(params.id);

  if (!entry) {
    return (
      <div className="w-full h-full p-1 sm:px-8">
        <Alert className="mx-auto my-20 max-w-[500px]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Entry not found</AlertTitle>
          <AlertDescription>
            We couldn&apos;t find the entry you were looking for.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Editor entry={entry as unknown as JournalEntry} />
    </div>
  );
};

export default EntryPage;
