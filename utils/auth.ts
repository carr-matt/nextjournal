import { auth } from '@clerk/nextjs';
import { prisma } from './db';

// Get userId from db by matching Clerk's Id
export const getUserByClerkId = async () => {
  const { userId } = await auth();

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId,
      },
    });
    return user;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw new Error('Error connecting to the database');
  }
};
