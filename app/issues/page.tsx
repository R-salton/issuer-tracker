'use client'
import delay from 'delay'
import { useEffect, useState } from 'react'
import IssueStatusBadge from '../components/issueStatusBadge'
import { IssueStatus } from '../generated/prisma'

import Link from 'next/link'
import DeleteIssueBtn from './DeleteIssueBtn'

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

delay(2000) // Simulate loading delay

const IssuesPage =  () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async (): Promise<void> => {
    setLoading(true);
    const data  = await fetch('http://localhost:3000/api/issues', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next:{
        revalidate: 3600, // Revalidate every 60 seconds
      }
    });
    if (!data.ok) {
      throw new Error('Failed to fetch issues');
    }
    const issues = await data.json();
    setIssues(issues);
    setLoading(false);

  };
  useEffect(() => {
    fetchIssues();
  }, []);




  // Simulate loading delay

  return (
    <section className="px-2 py-4 sm:px-6 md:px-12 lg:px-24">
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-sky-900 mb-1">Issues Tracker</h1>
        <p className="text-gray-600 max-w-2xl text-sm sm:text-base">
      View and manage all your project issues here. Track status, review details, and take action quickly. 
        </p>
      </div>
      <Link href="/issues/new">
        <button className="w-full sm:w-auto bg-sky-950 text-white px-3 py-2 rounded text-sm hover:bg-sky-900 transition-colors duration-300"  >
      + New Issue
        </button>
      </Link>
    </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[320px] sm:min-w-[480px] md:min-w-[600px] text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-sky-950">
                <th className="py-2 px-3 text-left">Title</th>
               
                <th className="hidden md:table-cell py-2 px-3 text-left">Status</th>
                <th className="hidden md:table-cell py-2 px-3 text-left">Created At</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="text-sky-950 hover:bg-softblue transition border-b-1 border-gray-300">
                  <td className="py-2 px-3">{issue.title}
                    <div className=' text-green-700 w-14 text-center p-2 rounded-lg md:hidden'>
                      <IssueStatusBadge status={issue.status as IssueStatus} />
                    </div>
                  </td>
                  
                 
                    
                  
                  <td className="hidden md:table-cell py-2 px-3">
                   <IssueStatusBadge status={issue.status as IssueStatus} />
                  </td>
                  <td className="hidden md:table-cell py-2 px-3">
                    {new Date(issue.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-4 text-lg">
                      <i className="cursor-pointer hover:text-sky-700 transition-colors duration-400 fa-solid fa-pen"></i>
                      <Link href={`/issues/${issue.id}`} className='flex items-center gap-2'>
                      <p className='text-xs'>View</p>
                      </Link>
                      <DeleteIssueBtn issue={issue} onDeleted={() => setIssues(issues.filter((i) => i.id !== issue.id))} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default IssuesPage