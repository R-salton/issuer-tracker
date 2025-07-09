'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import classNames from 'classnames';
import Image from 'next/image';
import logo from "@/public/images/logo.png"

const NavaBar = () => {
  const navBarItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Issues', path: '/issues' },
    { name: "Create New issue", path: "/issues/new" },
    { name: 'Contact', path: '/contact' },
  ];

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="flex-none hidden md:flex items-center gap-4">
          {/* Cart Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
              <div className="card-body">
                <Link href={"/"}>
                <span className="text-lg font-bold text-red-700">189 Items</span>
                </Link>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavaBar