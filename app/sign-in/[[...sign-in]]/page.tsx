import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="w-screen h-screen grid grid-cols-1 place-content-center">
      <div className="self-center mx-auto">
        <SignIn redirectUrl="/journal" />
      </div>
    </div>
  );
}
