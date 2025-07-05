
import { NextResponse } from 'next/server'
import  prisma from '@/prisma/client'


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  console.log(issue);

  if (!issue) {
    return NextResponse.json({ message: 'Issue not found' }, { status: 404 });
  }

  return NextResponse.json(issue);
}