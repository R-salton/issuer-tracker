
import delay from 'delay'
import IssueStatusBadge from '../components/issueStatusBadge'


import prisma from "@/prisma/client"

import Link from 'next/link'
import DeleteIssueBtn from './DeleteIssueBtn'
import IssueStatusFilter from './list/IssueStatusFilter'
import { Issue, IssueStatus } from '../generated/prisma'
import toast from 'react-hot-toast'
import NextLink from 'next/link'
import { ArrowUp, Dot } from 'lucide-react'
import { log } from 'console'
import { serialize } from 'v8'
import TablePagination from './Pagination'
import { DotsVerticalIcon } from '@radix-ui/react-icons'


delay(2000) // Simulate loading delay

interface Props {
 searchParams : {status?: {status: IssueStatus}, orderBy?: keyof Issue,page?: string;
    pageSize?: string;},

}

const IssuesPage = async({
  searchParams,
} : Props) => {


const filter = await searchParams
let issues: Issue[] = [];

console.log(filter)


const columns: { 
  label: string;
   key: keyof Issue;
   className?: string;
   }[] = [
  { label: 'Title', key: 'title' },
  { label: 'Status', key: 'status',className: 'hidden md:table-cell py-2 px-3 text-left' },
  { label: 'Created', key: 'createdAt',className: "hidden md:table-cell py-2 px-3 text-left" },
  
]


const statuses  = Object.values(IssueStatus);

 
  
const orderBy = await searchParams.orderBy ? {[await searchParams.orderBy as keyof Issue]: 'asc'} : undefined;

 const page = parseInt(searchParams.page ?? '1');
  const pageSize = parseInt(searchParams.pageSize ?? '10');
   const total = await prisma.issue.count();

 try {
   issues = await prisma.issue.findMany({
  where: {
    status: filter.status ,
  },
    orderBy: orderBy || undefined,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });


   

  return (
    <section className="px-2 py-4 sm:px-6 md:px-12 lg:px-24">
    <div className="mb-6 flex  sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-sky-900 mb-1">Issues Tracker</h1>
        <p className="text-gray-600 max-w-2xl text-sm sm:text-base">
      View and manage all your project issues here. Track status, review details, and take action quickly. 
        </p>
      </div>
      <div className='flex items-center gap-4'>
        <IssueStatusFilter />
        <Link href="/issues/new">
        <button className="w-full sm:w-auto bg-sky-950 text-white px-3 py-2 rounded text-sm hover:bg-sky-900 transition-colors duration-300" >
      + New Issue 
        </button>
      </Link>
      </div>
    </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[320px] sm:min-w-[480px] md:min-w-[600px] text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-sky-950">
                {
                  columns.map((column) => (
                    <th key={column.key} className={`py-2 px-3 text-left ${column.className}`}>
                     <NextLink className='flex items-center gap-1' 
                            href={{
                              query: { status: filter.status, orderBy: column.key }, // ✅ proper key-value structure
                            }}
                          >
                      {column.label}
                      {column.key === searchParams.orderBy && <ArrowUp className='ml-2 h-4 w-4' />}
                      </NextLink>

                    </th>
                   
                  ))
                }
                 <th className='text-sky-950 font-bold text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>


              { issues.length > 0 ? issues.map((issue) => (
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
                      <DotsVerticalIcon className='text-sky-950 hover:text-sky-700 transition-colors duration-400 fa-solid fa-pen'></DotsVerticalIcon>
                      </Link>
                     
                    </div>
                  </td>
                </tr>
              )) :
              <tr className="text-sky-950 hover:bg-softblue transition border-b-1 border-gray-300">
                <td className="py-2 px-3">No issues found</td>
                <td className="hidden md:table-cell py-2 px-3"></td>
                <td className="hidden md:table-cell py-2 px-3"></td>
                <td className="py-2 px-3"></td>
                </tr>
              }
            </tbody>
   
          </table>
         
        </div>
                     
   
          
        
      </div>
      <div className="w-full mt-6 mb-2 flex justify-end">
  <TablePagination
    currentPage={page}
    pageSize={pageSize}
    totalItems={total}
  />
</div>
      
    </section>
  )

  
 } catch (error) {

  return (
      <div className="text-center mt-10 text-red-600">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p>Please try again later.</p>
      </div>
    );
  
 }

  
  
}

export default IssuesPage