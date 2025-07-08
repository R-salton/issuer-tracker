import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'
import { IssueStatus } from '@/app/generated/prisma';

// Define your validation schema
const issueSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.string().optional(),
});

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


export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await request.json();

  // Validate input
  const result = issueSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.errors.map(e => ({ path: e.path, message: e.message })) },
      { status: 400 }
    );
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    return NextResponse.json({ message: 'Issue not found' }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...result.data,
      status: result.data.status as IssueStatus,
    },
  });

  return NextResponse.json(updatedIssue);
}