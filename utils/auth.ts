import { auth } from '@clerk/nextjs';
import { prisma } from './db';

// Get userId from db by matching Clerk's Id
export const getUserByClerkId = async () => {
  const { userId } = await auth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  });
  return user;
};
