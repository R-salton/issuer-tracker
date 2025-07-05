import React from 'react'
import Link from 'next/link'
import DeleteBtn from './DeleteBtn';

interface Props {
  params: Promise<{
    id: string;
  }>
}

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
}

const IssueDetailsPage = async ({ params }: Props) => {
  const id = parseInt((await params).id);

  const res = await fetch(`http://localhost:3000/api/issues/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    return <div className="text-red-600 p-8">Issue not found.</div>;
  }

  const issue: Issue = await res.json();

  return (
    <div className=" mx-auto mt-10 bg-white rounded-xl p-8">
        <Link href="/issues" className="text-blue-600 hover:underline mb-4 inline-block">
         <i className="absolute top-20 left-12 text-white hover:text-sky-700  transition-colors duration-400 btn-circle bg-sky-950 p-2  fa-solid fa-arrow-left"></i>
        </Link>
      <h1 className="text-3xl font-bold secondary-text mb-4">{issue.title}</h1>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div>
          <span className="font-semibold text-sky-950">Status: </span>
          <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs">{issue.status}</span>
        </div>
        {/* You can add more meta info here if needed */}
      </div>
      <div className="mb-8">
        <span className="font-semibold text-sky-950">Description:</span>
        <p className="mt-2 text-gray-700">{issue.description}</p>
      </div>
      {/* Actions Section */}
      <div className="border-t pt-6 flex flex-col sm:flex-row gap-4">
        <Link
          href={`/issues/${issue.id}/edit`}
          className="px-8 py-2 flex  justify-center items-center rounded  text-sm border-1 border-sky-950 font-semibold hover:bg-sky-950 hover:text-white transition  duration-400 text-center"
        >
            <i className="fa-solid fa-pen mr-2"></i>
          <p>Edit</p>
        </Link>
        <button
          className="px-5 py-2 rounded bg-sky-950 primary-text text-sm font-semibold hover:bg-sky-900 hover:text-white transition duration-400 text-center"
        >
          Assign
        </button>
        <DeleteBtn />
      </div>
    </div>
  )
}

export default IssueDetailsPage