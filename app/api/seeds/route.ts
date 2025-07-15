// app/api/seed/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';// use your Prisma client path

export async function POST() {
  try {
    await prisma.issue.createMany({
      data: [
      {
        title: 'Fix user authentication bug',
        status: 'OPEN',
        description: 'Users are currently unable to log in due to token validation issues.',
        createdAt: new Date('2024-06-01T10:12:00Z'),
        updatedAt: new Date('2024-06-01T10:15:00Z')
      },
      {
        title: 'Improve dashboard loading speed',
        status: 'ON_PROGRESS',
        description: 'Dashboard performance is degraded due to unoptimized queries.',
        createdAt: new Date('2024-06-02T09:45:00Z'),
        updatedAt: new Date('2024-06-03T12:00:00Z')
      },
      {
        title: 'Update project dependencies',
        status: 'CLOSED',
        description: 'Outdated dependencies were upgraded to latest stable versions.',
        createdAt: new Date('2024-05-15T14:20:00Z'),
        updatedAt: new Date('2024-05-16T10:00:00Z')
      },
      {
        title: 'Redesign landing page UI',
        status: 'ON_PROGRESS',
        description: 'Apply new branding and Figma-based design to landing page.',
        createdAt: new Date('2024-06-10T08:00:00Z'),
        updatedAt: new Date('2024-06-11T13:45:00Z')
      },
      {
        title: 'Fix 500 error on checkout',
        status: 'OPEN',
        description: 'Null reference found in order processing module during payment.',
        createdAt: new Date('2024-06-08T15:12:00Z'),
        updatedAt: new Date('2024-06-08T15:12:00Z')
      },
      {
        title: 'Add unit tests for billing',
        status: 'OPEN',
        description: 'Add Jest test coverage for all billing and invoice scenarios.',
        createdAt: new Date('2024-04-28T16:30:00Z'),
        updatedAt: new Date('2024-04-28T16:30:00Z')
      },
      {
        title: 'Migrate database to PostgreSQL 15',
        status: 'CLOSED',
        description: 'Migration completed successfully with no data loss.',
        createdAt: new Date('2024-05-10T12:00:00Z'),
        updatedAt: new Date('2024-05-11T09:00:00Z')
      },
      {
        title: 'Add two-factor authentication',
        status: 'ON_PROGRESS',
        description: 'Implement 2FA using authenticator apps and recovery codes.',
        createdAt: new Date('2024-06-05T11:00:00Z'),
        updatedAt: new Date('2024-06-07T17:00:00Z')
      },
      {
        title: 'Purge unused CSS classes',
        status: 'CLOSED',
        description: 'Reduced CSS bundle by 400 KB after cleanup.',
        createdAt: new Date('2024-04-22T10:00:00Z'),
        updatedAt: new Date('2024-04-22T12:20:00Z')
      },
      {
        title: 'Fix profile avatar upload bug',
        status: 'OPEN',
        description: 'Image upload occasionally fails with network timeout.',
        createdAt: new Date('2024-06-01T11:30:00Z'),
        updatedAt: new Date('2024-06-01T11:30:00Z')
      },
      {
        title: 'Fix broken links in docs',
        status: 'CLOSED',
        description: 'Verified and updated all 404 links in markdown docs.',
        createdAt: new Date('2024-05-01T10:00:00Z'),
        updatedAt: new Date('2024-05-02T13:00:00Z')
      },
      {
        title: 'Add language switcher',
        status: 'ON_PROGRESS',
        description: 'Enable multi-language support with a toggle in navbar.',
        createdAt: new Date('2024-06-03T14:00:00Z'),
        updatedAt: new Date('2024-06-04T09:30:00Z')
      },
      {
        title: 'Implement dark mode',
        status: 'CLOSED',
        description: 'Users can now switch between light and dark themes.',
        createdAt: new Date('2024-04-30T08:45:00Z'),
        updatedAt: new Date('2024-05-01T08:00:00Z')
      },
      {
        title: 'Email notifications for comments',
        status: 'OPEN',
        description: 'Send email alerts when a user replies to a comment thread.',
        createdAt: new Date('2024-06-12T10:10:00Z'),
        updatedAt: new Date('2024-06-12T10:10:00Z')
      },
      {
        title: 'Compress uploaded images',
        status: 'ON_PROGRESS',
        description: 'Reduce image size with server-side compression.',
        createdAt: new Date('2024-06-06T13:00:00Z'),
        updatedAt: new Date('2024-06-07T13:00:00Z')
      },
      {
        title: 'Update privacy policy',
        status: 'CLOSED',
        description: 'Added GDPR compliance section and cookie tracking info.',
        createdAt: new Date('2024-05-18T09:00:00Z'),
        updatedAt: new Date('2024-05-18T12:30:00Z')
      },
      {
        title: 'Fix mobile nav toggle issue',
        status: 'OPEN',
        description: 'Menu toggle doesn’t work on small screens after resize.',
        createdAt: new Date('2024-06-13T16:00:00Z'),
        updatedAt: new Date('2024-06-13T16:00:00Z')
      },
      {
        title: 'Audit third-party libraries',
        status: 'ON_PROGRESS',
        description: 'Flag outdated packages with security concerns.',
        createdAt: new Date('2024-06-04T10:00:00Z'),
        updatedAt: new Date('2024-06-04T14:20:00Z')
      },
      {
        title: 'Implement search suggestions',
        status: 'OPEN',
        description: 'Add real-time search suggestion dropdown with debounce.',
        createdAt: new Date('2024-06-11T11:00:00Z'),
        updatedAt: new Date('2024-06-11T11:00:00Z')
      },
      {
        title: 'Fix timezone conversion bug',
        status: 'CLOSED',
        description: 'Local time rendering was incorrect due to offset errors.',
        createdAt: new Date('2024-05-05T10:30:00Z'),
        updatedAt: new Date('2024-05-06T09:00:00Z')
      }
    ],
    });

    return NextResponse.json({ message: 'Seeded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
