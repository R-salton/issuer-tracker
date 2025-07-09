'use client'
import React from 'react'
import Link from 'next/link'
import { SessionProvider } from 'next-auth/react';

export default function LandingPage() {

  const logedIn = false; // Replace with actual authentication logic
  return (
    <main className="bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-20 gap-10 text-sky-950 relative overflow-hidden bg-white">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Effortless <span className="text-white bg-sky-950 px-2 rounded">Issue Tracking</span> <br />
            For Modern Teams
          </h1>
          <p className="text-md md:text-2xl mb-8 text-black-500 max-w-xl">
            Stay organized, collaborate, and resolve issues faster with <span className="font-bold text-sky-950">Issuer Tracker</span>.
          </p>
          <Link href="/issues" className="px-8 py-3 rounded-lg bg-sky-950 text-white font-bold text-lg shadow-lg hover:bg-sky-900 transition-all duration-300">
            Get Started
          </Link>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex justify-center items-center animate-fade-in">
          <img
            src="/images/hero.svg"
            alt="Issue Tracker Illustration"
            className="w-full max-w-md drop-shadow-xl"
          />
        </div>
        {/* Animated background shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-sky-950 opacity-10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-sky-950 opacity-10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16 bg-white flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-950 mb-10 animate-fade-in-down">Why Choose Issuer Tracker?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-7xl">
          <div className="bg-sky-950 border rounded-xl p-8 shadow-lg text-white flex flex-col items-center text-center animate-fade-in-up delay-100">
            <svg className="w-12 h-12 mb-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-xl mb-2 ">Easy Issue Management</h3>
            <p className="">Create, assign, and track issues with a clean and intuitive interface.</p>
          </div>
          <div className="bg-sky-950 border text-white  rounded-xl p-8 shadow-lg flex flex-col items-center text-center animate-fade-in-up delay-200">
            <svg className="w-12 h-12 mb-4 " fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              <circle cx="17" cy="17" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-xl mb-2 ">Team Collaboration</h3>
            <p className="">Work together, assign tasks, and keep everyone in the loop.</p>
          </div>
          <div className="bg-sky-950 text-white border border-sky-100 rounded-xl p-8 shadow-lg flex flex-col items-center text-center animate-fade-in-up delay-300">
            <svg className="w-12 h-12 mb-4 " fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 9l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="font-bold text-xl mb-2 ">Real-Time Updates</h3>
            <p className="">Stay up-to-date with instant notifications and live status changes.</p>
          </div>
          <div className="bg-sky-950 text-white border border-sky-100 rounded-xl p-8 shadow-lg flex flex-col items-center text-center animate-fade-in-up delay-400">
            <svg className="w-12 h-12 mb-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-xl mb-2 ">Analytics & Insights</h3>
            <p className="">Visualize progress and bottlenecks with beautiful charts and reports.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-16 bg-white flex flex-col items-center shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-950 mb-10 animate-fade-in-down">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
          <div className="bg-white border border-sky-100 rounded-xl p-8 shadow flex flex-col items-center text-center animate-fade-in-up delay-100">
            <span className="text-4xl font-bold text-sky-950 mb-2">1</span>
            <h4 className="font-semibold text-lg mb-2 text-sky-950">Create Issues</h4>
            <p className="text-sky-900">Quickly add new issues with all the details your team needs.</p>
          </div>
          <div className="bg-white border border-sky-100 rounded-xl p-8 shadow flex flex-col items-center text-center animate-fade-in-up delay-200">
            <span className="text-4xl font-bold text-sky-950 mb-2">2</span>
            <h4 className="font-semibold text-lg mb-2 text-sky-950">Assign & Track</h4>
            <p className="text-sky-900">Assign issues to team members and monitor their progress in real time.</p>
          </div>
          <div className="bg-white border border-sky-100 rounded-xl p-8 shadow flex flex-col items-center text-center animate-fade-in-up delay-300">
            <span className="text-4xl font-bold text-sky-950 mb-2">3</span>
            <h4 className="font-semibold text-lg mb-2 text-sky-950">Resolve & Analyze</h4>
            <p className="text-sky-900">Close issues, leave feedback, and analyze team performance with insightful reports.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-16 bg-white flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-950 mb-10 animate-fade-in-down">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 shadow flex flex-col items-center text-center animate-fade-in-up delay-100">
            <img src="/images/avatar1.png" alt="User 1" className="w-16 h-16 rounded-full mb-3 border-2 border-sky-950" />
            <p className="text-sky-900 mb-2">"Issuer Tracker has transformed the way our team handles bugs and tasks. The interface is clean and the notifications keep us on track!"</p>
            <span className="font-semibold text-sky-950">— Sarah, Project Manager</span>
          </div>
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 shadow flex flex-col items-center text-center animate-fade-in-up delay-200">
            <img src="/images/avatar2.png" alt="User 2" className="w-16 h-16 rounded-full mb-3 border-2 border-sky-950" />
            <p className="text-sky-900 mb-2">"Assigning issues and tracking progress is so easy now. Our productivity has doubled!"</p>
            <span className="font-semibold text-sky-950">— Alex, Developer</span>
          </div>
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 shadow flex flex-col items-center text-center animate-fade-in-up delay-300">
            <img src="/images/avatar3.png" alt="User 3" className="w-16 h-16 rounded-full mb-3 border-2 border-sky-950" />
            <p className="text-sky-900 mb-2">"The analytics dashboard gives us real insight into our workflow. Highly recommended!"</p>
            <span className="font-semibold text-sky-950">— Priya, Team Lead</span>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <div className="py-20 px-6 md:px-16 bg-sky-950 flex flex-col items-center animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Ready to boost your productivity?</h2>
        <p className="text-sky-100 mb-8 text-lg text-center max-w-2xl">
          Start tracking issues the smart way. Join teams who resolve faster and work better together.
        </p>
        <Link href="/issues" className="px-8 py-3 rounded-lg bg-white text-sky-950 font-bold text-lg shadow-lg hover:bg-sky-100 transition-all duration-300">
          Try Issuer Tracker Now
        </Link>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in {
          0% { opacity: 0;}
          100% { opacity: 1;}
        }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(.4,0,.2,1) both;}
        .animate-fade-in-down { animation: fade-in-down 1s cubic-bezier(.4,0,.2,1) both;}
        .animate-fade-in { animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;}
        .delay-100 { animation-delay: .1s;}
        .delay-200 { animation-delay: .2s;}
        .delay-300 { animation-delay: .3s;}
        .delay-400 { animation-delay: .4s;}
      `}</style>
    </main>
  )
}
