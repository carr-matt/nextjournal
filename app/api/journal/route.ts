import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

// Name function after the HTTP method it's handling
export const POST = async (req: Request) => {
  const data = await req.json();
  console.log(data);
  const user = await getUserByClerkId();
  const { content } = data;
  console.log('Content to save:', { content });
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: content,
    },
  });

  const analysis = await analyze(entry.content);
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    },
  });

  revalidatePath('/journal');

  return NextResponse.json({ data: entry });
};
