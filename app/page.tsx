import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const { userId } = await auth();

  let href = userId ? '/journal' : '/new-user';

  return (
    <main className="w-screen h-screen flex justify-center items-center p-4 sm:p-6 md:p-8 bg-slate-100">
      <div className="w-full max-w-[600px] lg:max-w-[800px] mx-auto text-left">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-6 font-extrabold tracking-tight scroll-m-20 mx-auto">
          A Journal App
        </h1>
        <div className="ml-10 my-10">
          <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Chronicle each day.
          </h2>
          <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Let AI analyze your mood.
          </h2>
          <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Ask your journal AI for insights using your entries as context.
          </h2>
        </div>
        <div className="flex justify-center sm:justify-start">
          <Button className="mx-auto sm:ml-10 text-2xl py-8 px-6">
            <Link
              href={href}
              // className="inline-block bg-white py-2 sm:py-3 px-6 sm:px-8 text-lg sm:text-xl font-medium text-blue-600 rounded-full shadow-lg hover:bg-blue-100 hover:text-blue-700 active:bg-blue-200 active:scale-95 transform transition duration-300"
            >
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
