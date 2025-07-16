'use client'

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import  formatDistanceToNow  from 'date-fns'

interface Issue {
  id: number
  title: string
  createdAt: string
  createdByUser: {
    name: string | null
    image: string | null
  } | null
}

const RecentCreatedIssues = () => {
  const { data, isLoading } = useQuery<Issue[]>({
    queryKey: ['recent-issues'],
    queryFn: async () => {
      const res = await fetch('/api/stats/created-by');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    staleTime: 60 * 1000,
  });

  console.log(data);
  if (isLoading) return <p className="text-gray-400">Loading recent activity...</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-10">
      <h2 className="text-lg font-bold text-sky-950 mb-4">Recent Activity</h2>
      <ul className="divide-y divide-sky-100">
        {data?.map((issue, idx) => (
          <li key={issue.id} className="py-3 flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-950"></span>

            <Image
              src={issue.createdByUser?.image ?? `/images/avatar${(idx % 3) + 1}.png`}
              alt={issue.createdByUser?.name ?? 'Unknown'}
              width={28}
              height={28}
              className="rounded-full border border-sky-100 object-cover"
            />

            <span className="text-sky-900 font-medium">{`Issue #${issue.id}`}</span>
            <span className="text-sky-700 text-sm">
              created by {issue.createdByUser?.name ?? 'Unknown'}
            </span>

            {/* <span className="ml-auto text-xs text-gray-400">
              {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
            </span> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCreatedIssues;
