'use client'
import React, { useEffect, useState } from 'react'
import { Button, Table } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import { FiEye } from 'react-icons/fi'
import DeleteIssueBtn from './DeleteIssueBtn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    setLoading(true);
    const { data } = await axios.get<Issue[]>('/api/issues');
    setIssues(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <section className="px-2 py-4 sm:px-6 md:px-12 lg:px-24">
      <div className="flex flex-col items-center mb-6">
        <Button className="w-full sm:w-auto">Issues Page</Button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[320px] sm:min-w-[480px] md:min-w-[600px] text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-sky-950">
                <th className="py-2 px-3 text-left">Title</th>
                <th className="hidden md:table-cell py-2 px-3 text-left">Description</th>
                <th className="hidden md:table-cell py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="text-sky-950 hover:bg-softblue transition border-b-1 border-gray-300">
                  <td className="py-2 px-3">{issue.title}
                    <div className='block mt-2 bg-green-100 text-green-700 w-14 text-center
                    p-2 rounded-lg md:hidden'>{issue.status}</div>
                  </td>
                  
                  <td className="hidden md:table-cell py-2 px-3">{issue.description}
                    
                  </td>
                  <td className="hidden md:table-cell py-2 px-3">
                    <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                      {issue.status}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-4 text-lg">
                      <i className="cursor-pointer hover:text-sky-700 transition-colors duration-400 fa-solid fa-pen"></i>
                      <i className="cursor-pointer hover:text-sky-700 transition-colors duration-400 fa-solid fa-ellipsis-vertical"></i>
                      <i className="cursor-pointer text-red-500 hover:text-sky-700 transition-colors duration-400 fa-solid fa-trash-can"></i>
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