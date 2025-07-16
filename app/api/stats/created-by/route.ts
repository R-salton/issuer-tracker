// app/api/recent-issues/route.ts
import prisma  from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(issues);
  } catch (error) {
    console.error('Error fetching recent issues:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
