
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
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
               <Image src={session.user?.image!} width={80} height={80} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                    <a className="justify-between">
                    {session.user?.name}
                    
                    </a>
                    </li>
              <li>
                <a className="justify-between">
                  Profile
                  
                </a>
              </li>
              <li><a>Settings</a></li>
             <li>
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