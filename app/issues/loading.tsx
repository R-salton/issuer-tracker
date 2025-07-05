import { Button } from '@radix-ui/themes'
import React from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const IssueLoadingPage = () => {
const issues = [1,2,3,4,5,6,7,8,9,10]

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
                <th className="py-2 px-3 text-left"><Skeleton width={100} height={20} /></th>
              
                <th className="hidden md:table-cell py-2 px-3 text-left"><Skeleton width={100} height={20} /></th>
                <th className="hidden md:table-cell py-2 px-3 text-left"><Skeleton width={100} height={20} /></th>
                <th className="py-2 px-3 text-left"><Skeleton width={100} height={20} /></th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue} className="text-sky-950 hover:bg-softblue transition border-b-1 border-gray-300">
                  <td className="py-2 px-3"><Skeleton width={100} height={20} />
                    <div className=' text-green-700 w-14 text-center p-2 rounded-lg md:hidden'>
                    <Skeleton width={50} height={20} />
                    </div>
                  </td>
                  
                  <td className="hidden md:table-cell py-2 px-3"><Skeleton width={200} height={20} />
                    
                  </td>
                  <td className="hidden md:table-cell py-2 px-3">
                 <Skeleton width={100} height={20} />
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-4 text-lg">
                     <Skeleton width={20} height={20} />
                      <Skeleton width={20} height={20} />
                      <Skeleton width={20} height={20} />
                      
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

export default IssueLoadingPage