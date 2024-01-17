import Link from 'next/link';
import { auth } from '@clerk/nextjs';

export default async function Home() {
  const { userId } = await auth();

  let href = userId ? '/journal' : '/new-user';

  return (
    <main className="w-screen h-screen bg-black flex justify-center items-center text-white/90">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-8xl mb-5">A journal app.</h1>
        <p className="text-3xl text-white/65 mb-5">
          Chronicle each day. Let AI track your mood.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-purple-900 py-3 px-5 rounded-md text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
