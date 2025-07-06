
import { NextResponse } from 'next/server'
import  prisma from '@/prisma/client'


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
 

  if (!issue) {
    return NextResponse.json({ message: 'Issue not found' }, { status: 404 });
  }

  return NextResponse.json(issue);
}


export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const  {id}  = await params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    return NextResponse.json({ message: 'Issue not found' }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({ message: 'Issue deleted' });
}