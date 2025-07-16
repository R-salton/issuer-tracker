
import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({ where: { status: 'ON_PROGRESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  return NextResponse.json({ open, inProgress, closed });
}