'use client'
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { FaBug, FaCheckCircle, FaHourglassHalf, FaUsers } from 'react-icons/fa'


import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import WeeklyIssuesChart from './WeeklyIssuesChart'
import PieStats from './PieStats'
import StatsCards from './StatsCards'

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)


const DashboardPage = () => {
	
// Get stats from databe  
 







	return (
		<div className="min-h-screen bg-white px-4 py-8 md:px-12 lg:px-24">
			<div>
				<h1 className="text-3xl md:text-4xl font-bold text-sky-950 mb-8 text-center">
					Dashboard
				</h1>
			</div>
			{/* Stats Cards */}
			<StatsCards />

			{/* Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
				{/* Bar Chart */}
				<WeeklyIssuesChart />
				{/* Doughnut Chart */}
				<PieStats />
			</div>

			{/* Activity Section */}
			<div className="bg-white rounded-xl shadow-md p-6 mb-10">
				<h2 className="text-lg font-bold text-sky-950 mb-4">Recent Activity</h2>
				<ul className="divide-y divide-sky-100">
					<li className="py-3 flex items-center gap-3">
						<span className="inline-block w-2 h-2 rounded-full bg-sky-950"></span>
						<span className="text-sky-900 font-medium">Issue #42</span>
						<span className="text-sky-700 text-sm">created by Alice</span>
						<span className="ml-auto text-xs text-gray-400">2 hours ago</span>
					</li>
					<li className="py-3 flex items-center gap-3">
						<span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>
						<span className="text-sky-900 font-medium">Issue #37</span>
						<span className="text-sky-700 text-sm">resolved by Bob</span>
						<span className="ml-auto text-xs text-gray-400">5 hours ago</span>
					</li>
					<li className="py-3 flex items-center gap-3">
						<span className="inline-block w-2 h-2 rounded-full bg-sky-400"></span>
						<span className="text-sky-900 font-medium">Issue #39</span>
						<span className="text-sky-700 text-sm">assigned to Priya</span>
						<span className="ml-auto text-xs text-gray-400">1 day ago</span>
					</li>
				</ul>
			</div>

			{/* Team Section */}
			<div className="bg-sky-50 rounded-xl shadow-md p-6">
				<h2 className="text-lg font-bold text-sky-950 mb-4">Team Members</h2>
				<Creaters />
			</div>
		</div>
	)
}

export default DashboardPage