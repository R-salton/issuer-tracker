
import Link from 'next/link'
import React from 'react'
import { Pencil2Icon } from '@radix-ui/react-icons'


const Editbtn = ({id}: {id: number}) => {
  return (
   <>
    <Link
             href={`/issues/${id}/update`}
             className="px-8 py-2 flex  justify-center items-center rounded  text-sm border-1 border-sky-950 font-semibold hover:bg-sky-950 hover:text-white transition  duration-400 text-center"
           >
              <Pencil2Icon className='mr-2' />
             <p>Edit</p>
           </Link>
   </>
  )
}

export default Editbtn