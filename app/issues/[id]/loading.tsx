import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'  
import 'react-loading-skeleton/dist/skeleton.css'


const IssueDetailsLoading = () => {
  return (
   <div className=" mx-auto mt-10 bg-white rounded-xl p-8">
        <Link href="/issues" className="text-blue-600 hover:underline mb-4 inline-block">
         <i className="absolute top-20 left-12 text-white hover:text-sky-700  transition-colors duration-400 btn-circle bg-sky-950 p-2  fa-solid fa-arrow-left"></i>
        </Link>
      <h1 className="text-3xl font-bold secondary-text mb-4"><Skeleton width={200} height={20} /></h1>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div>
          <span className="font-semibold text-sky-950"><Skeleton width={100} height={20} /> </span>
          <span className="inline-block px-2 py-1 rounded  text-xs"><Skeleton width={80} height={15}/></span>
        </div>
        {/* You can add more meta info here if needed */}
      </div>
      <div className="mb-8">
        <span className="font-semibold text-sky-950"><Skeleton width={150} height={20} /></span>
        <p className="mt-2 text-gray-700"><Skeleton width={400} height={15} count={3}/></p>
      </div>
      {/* Actions Section */}
      <div className="border-t pt-6 flex flex-col sm:flex-row gap-4">
       <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
       
      </div>
    </div>
  )
}

export default IssueDetailsLoading