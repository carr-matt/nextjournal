import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

const NewEntryButton = () => (
  <Button
    asChild
    variant="default"
  >
    <Link href="/journal/new-entry">
      <Pencil className="mr-2 h-4 w-4" />
      New Entry
    </Link>
  </Button>
);

export default NewEntryButton;
