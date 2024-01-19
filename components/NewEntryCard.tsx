'use client';

import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const NewEntryCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <Card
      className="cursor-pointer"
      onClick={handleOnClick}
    >
      <CardHeader>
        <CardTitle>New Entry</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default NewEntryCard;
