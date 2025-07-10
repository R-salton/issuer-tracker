'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import classNames from 'classnames';
import Image from 'next/image';
import logo from "@/public/images/logo.png"
import { useSession } from 'next-auth/react';
import UserCard from './components/UserCard';
import { EnterIcon } from '@radix-ui/react-icons';
import delay from 'delay';
import Skeleton from './components/Skeleton';

// Simulate loading delay
delay(2000); // Simulate loading delay
const NavaBar = () => {
  const navBarItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Issues', path: '/issues' },
    { name: "Create New issue", path: "/issues/new" },
    { name: 'Contact', path: '/contact' },
  ];

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const {status, data: session} = useSession();

 

  return (
    <nav className="px-4 custom-nav navbar shadow-sm bg-primary sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
       
          <span className="inline-block align-middle mr-2">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-20 h-20 object-cover" />
          </Link>
          </span>
         
        

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center px-2 py-1 border rounded text-sky-950 border-sky-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Menu */}
        <div className={classNames(
          "flex-none text-black md:flex md:items-center",
          menuOpen ? "block absolute top-full left-0 w-full bg-white shadow-md md:static md:w-auto md:bg-transparent md:shadow-none" : "hidden md:block"
        )}>
          <ul className="flex flex-col items-center pb-4 transition-opacity duration-500 md:flex-row md:space-x-4 text-md md:items-center md:mt-0 mt-2">
            {/* Mobile only: Profile card */}
            {menuOpen && (
              <li className="flex md:hidden flex-col items-center gap-2 mb-2">
                <div className="w-full max-w-xs bg-white rounded-lg shadow p-4 flex flex-col items-center border border-gray-200">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover mb-2 border border-gray-300"
                  />
                  <div className="text-center">
                    <div className="font-semibold text-sky-950 text-base">John Doe</div>
                    <div className="text-xs text-gray-500 mb-2">john.doe@email.com</div>
                  </div>
                  <Link
                    href="/profile"
                    className="mt-2 px-4 py-1 rounded bg-softblue text-secondary font-medium hover:bg-secondary hover:text-white transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    View Profile
                  </Link>
                </div>
              </li>
            )}
            {navBarItems.map((item) => (
              <li key={item.path}
                className={classNames(
                  'mr-0 md:mr-4 transition-all duration-200 font-medium text-sm rounded-md px-4 py-2 md:px-2 md:py-0',
                  {
                    'text-sky-950 bg-softblue md:bg-transparent': pathname === item.path,
                    'text-sky-900 hover:text-sky-800': pathname !== item.path,
                  }
                )}
                onClick={() => setMenuOpen(false)}
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
            {/* Mobile only: Profile link with avatar (optional, can remove if using card above) */}
            {/* <li className="flex md:hidden items-center gap-2 mt-2 border-t pt-2">
              <span className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="Profile"
                  className="w-8 h-8 object-cover"
                />
              </span>
              <Link href="/profile" className="text-sky-900 hover:text-sky-800 font-medium" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Right-side icons (hidden on mobile, shown on md+) */}
        <div>
       
        {
          status === "loading" ? (
            <Skeleton width={100} height={30}/>
          ) : (
            <AuthStatus />
          )
        }
       
       </div>
      </div>
    </nav>
  )
}

export default NavaBar



 const AuthStatus = () => {
  const { status, data: session } = useSession();
    if (status === "loading")
      return <Skeleton width={100} height={30}/>;
    if (status === "authenticated") 
      return <UserCard session={session} />
    
    if (status === "unauthenticated") 
      return (<Link href="/api/auth/signin" className="flex items-center gap-2 bg-sky-950 text-white px-3 py-2 rounded text-sm hover:bg-sky-900 transition-colors duration-300">
          <EnterIcon className="w-4 h-4 text-white" />
          Login
          </Link>
      )
    }
 