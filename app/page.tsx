import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Image from 'next/image';

export default async function Home() {
  const { userId } = await auth();

  let href = userId ? '/journal' : '/new-user';

  return (
    <main className="flex justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[600px] lg:max-w-[775px] mx-auto text-left">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl ml-8 mb-8 md:mb-16 mt-24 font-extrabold tracking-tight">
          A Journal App
        </h1>
        <div className="mx-8 my-12">
          <h2 className="mt-4 border-b pb-2 text-3xl font-semibold tracking-tight pl-10 -indent-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-extrabold drop-shadow-lg">
              Chronicle
            </span>{' '}
            each day.
          </h2>
          <h2 className="mt-4 border-b pb-2 text-3xl font-semibold tracking-tight pl-10 -indent-10">
            Let AI{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-extrabold drop-shadow-lg">
              analyze
            </span>{' '}
            your mood.
          </h2>
          <h2 className="mt-4 border-b pb-2 pl-10 text-3xl font-semibold tracking-tight -indent-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-extrabold drop-shadow-lg">
              Ask
            </span>{' '}
            your journal AI for insights&mdash;using your entries as context.
          </h2>
        </div>
        <div className="flex justify-center sm:justify-start">
          <Button className="mx-auto mb-20 sm:mb-25 md:mb-30 lg:mb-35 xl:mb-40 sm:ml-20 text-2xl py-8 px-6 font-bold">
            <Link href={href}>Get Started</Link>
          </Button>
        </div>
        <footer className="flex-grow mx-8">
          <p className="text-sm text-muted-foreground text-center border-t py-4">
            Created by{' '}
            <Link
              href="https://github.com/carr-matt"
              target="_blank"
              className="underline"
            >
              matt
            </Link>{' '}
            &{' '}
            <Popover>
              <PopoverTrigger className="underline">maddy</PopoverTrigger>
              <PopoverContent
                side="right"
                className="h-auto w-auto p-1 rounded-full"
              >
                <Image
                  src="/maddy.jpg"
                  alt="A dog named Maddy."
                  width="250"
                  height="250"
                  className="size-24 sm:size-28 md:size-32 lg:size-48 rounded-full"
                />
              </PopoverContent>
            </Popover>
            . Source code available on{' '}
            <Link
              href="https://github.com/carr-matt/nextjournal"
              target="_blank"
              className="underline"
            >
              GitHub
            </Link>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
