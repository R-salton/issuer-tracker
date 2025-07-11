import { IssueStatus } from '@/app/generated/prisma';
import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth'
import AuthOptions from '@/app/auth/AuthOptions'
import { title } from 'process';
import { create } from 'domain';
import { createIssueSchema, patchIssueShema } from '@/app/validationSchemas';

// Define your validation schema




interface Paramas{
  id: Promise<string>;
}

export async function GET(request: Request, { params }: { params: Paramas }) {
  const  id  = await params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(await id.id),
    },
  });
  
 

  if (!issue) {
    return NextResponse.json({ message: 'Issue not found' }, { status: 404 });
  }

  const assignedUser = issue.assignedToUserId
    ? await prisma.user.findUnique({
        where: {
          id: issue.assignedToUserId,
        },
      })
    : null;

  return NextResponse.json({
    ...issue,
    assignedUser: assignedUser ? { id: assignedUser.id, name: assignedUser.name } : null,
  });
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


export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await request.json();
  console.log(data);


  const session = await getServerSession(AuthOptions);
  // Check if user is authenticated
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }


  // Validate input
  const result = patchIssueShema.safeParse(data);
  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.errors.map(e => ({ path: e.path, message: e.message })) },
      { status: 400 }
    ); 
  }

  const {assignedToUserId,title,description,status} = data;
  if(assignedToUserId === null){
    // If assignedToUserId is null, we can set it to undefined
    data.assignedToUserId = null;
  }

  if(assignedToUserId){
    // Check if the assigned user exists
    const assignedUser = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!assignedUser) {
      return NextResponse.json({ message: 'Invalid User!' }, { status: 400 });
    }
  }


  // Check if issue exists
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
      ...data, // Spread the validated data
      // Ensure status is of type IssueStatus
      status: status as IssueStatus, // Type assertion to ensure correct type
      title,
      description, // Ensure status is of type IssueStatus
      assignedToUserId// Use undefined if not provided
      
    },
  });

  return NextResponse.json(updatedIssue);
}