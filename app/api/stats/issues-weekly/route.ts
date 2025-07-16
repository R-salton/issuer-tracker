// app/api/issues-per-day/route.ts
import prisma  from '@/prisma/client';
import { NextResponse } from 'next/server';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval';


export async function GET() {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 }); // Sunday

  // Get all issues created this week
  const issues = await prisma.issue.findMany({
    where: {
      createdAt: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
  });

  // Initialize counts for each day of the week
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const dayLabels = days.map((d: DateOrStringOrNumber) => format(d, 'EEE')); // ['Mon', 'Tue', ...]
  const counts = days.map((day: DateOrStringOrNumber) =>
    issues.filter((issue) =>
      format(issue.createdAt, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    ).length
  );

  return NextResponse.json({
    labels: dayLabels,
    data: counts,
  });
}
