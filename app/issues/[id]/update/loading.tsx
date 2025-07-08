import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const loading = () => {
  return (
    <section className="flex items-center justify-center min-h-[80vh] bg-softblue px-2">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-zinc-200 w-full max-w-md flex flex-col gap-6">
        <Skeleton height={32} width="60%" className="mb-4" />
        <div className="flex flex-col gap-4">
          <div>
            <Skeleton height={16} width="30%" className="mb-2" />
            <Skeleton height={40} width="100%" />
          </div>
          <div>
            <Skeleton height={16} width="30%" className="mb-2" />
            <Skeleton height={96} width="100%" />
          </div>
        </div>
        <Skeleton height={48} width="100%" className="mt-4" />
      </div>
    </section>
  )
}

export default loading