import Link from 'next/link';
import { auth } from '@clerk/nextjs';

export default async function Home() {
  const { userId } = await auth();

  let href = userId ? '/journal' : '/new-user';

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[600px] mx-auto text-center sm:text-left">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-6 font-semibold text-gray-100">
          A Journal App
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-6">
          Chronicle each day. Let AI track your mood.
        </p>
        <div className="flex justify-center sm:justify-start">
          <Link
            href={href}
            className="inline-block bg-white py-2 sm:py-3 px-6 sm:px-8 text-lg sm:text-xl font-medium text-blue-600 rounded-full shadow-lg hover:bg-blue-100 hover:text-blue-700 active:bg-blue-200 active:scale-95 transform transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
