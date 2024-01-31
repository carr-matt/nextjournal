import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  let i = 0;
  return (
    <div className="p-8 h-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...new Array(8)].map(() => (
          <Skeleton
            key={i++}
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
