
import { Session } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import { ExitIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

interface Props{
    session: Session
}

const UserCard = ({session}: Props) => {
  return (
    <div className="flex-none hidden md:flex items-center gap-4">
          
          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
               <Image src={session.user?.image??"https://avatars.githubusercontent.com/u/10199134?v=4"} alt="Avatar" width={50} height={50} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white text-sky-950 rounded-box z-1 mt-3 w-52 p-2 shadow-2xl not-odd:border-1 border-gray-300">
                <li className='hover:bg-gray-300   transition-all font-bold rounded duration-500'>
                    <a className="justify-between">
                    {session.user?.name}
                    
                    </a>
                    </li>
              <li className='hover:bg-gray-300   transition-all rounded duration-500'>
                <a className="justify-between">
                  Profile
                  
                </a>
              </li>
              <li className='hover:bg-gray-300  transition-all rounded duration-500'><a>Settings</a></li>
             <li className='hover:bg-gray-300  transition-all rounded duration-500'>
                 <Link href="/api/auth/signout">
                     <ExitIcon className="" />
                     Logout
              </Link>
             </li>
            </ul>
          </div>
        </div>
  )
}

export default UserCard