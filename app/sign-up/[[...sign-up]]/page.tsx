import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="w-screen h-screen grid grid-cols-1 place-content-center">
      <div className="self-center mx-auto">
        <SignUp
          afterSignUpUrl="/new-user"
          redirectUrl="/new-user"
        />
      </div>
    </div>
  );
}
