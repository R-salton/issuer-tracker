'use client'
import React from 'react'
import { FaBug, FaCheckCircle, FaHourglassHalf, FaUsers } from 'react-icons/fa'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

const stats = [
	{
		label: 'Open Issues',
		value: 24,
		icon: <FaBug className="text-sky-950 text-3xl" />,
		color: 'bg-sky-100',
	},
	{
		label: 'In Progress',
		value: 12,
		icon: <FaHourglassHalf className="text-sky-950 text-3xl" />,
		color: 'bg-sky-200',
	},
	{
		label: 'Resolved',
		value: 40,
		icon: <FaCheckCircle className="text-green-600 text-3xl" />,
		color: 'bg-green-50',
	},
	{
		label: 'Team Members',
		value: 8,
		icon: <FaUsers className="text-sky-950 text-3xl" />,
		color: 'bg-sky-50',
	},
]

const barData = {
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	datasets: [
		{
			label: 'Issues Created',
			data: [5, 8, 6, 7, 4, 3, 2],
			backgroundColor: 'rgba(8, 47, 73, 0.8)',
			borderRadius: 8,
			barThickness: 24,
		},
	],
}

const doughnutData = {
	labels: ['Open', 'In Progress', 'Resolved'],
	datasets: [
		{
			data: [24, 12, 40],
			backgroundColor: ['#0c4a6e', '#38bdf8', '#22c55e'],
			borderWidth: 2,
		},
	],
}

const DashboardPage = () => {
	return (
		<div className="min-h-screen bg-white px-4 py-8 md:px-12 lg:px-24">
			<div>
				<h1 className="text-3xl md:text-4xl font-bold text-sky-950 mb-8 text-center">
					Dashboard
				</h1>
			</div>
			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className={`flex items-center gap-4 p-6 rounded-xl shadow-md ${stat.color} transition hover:scale-105 hover:shadow-lg`}
					>
						<div className="p-3 rounded-full bg-white shadow">{stat.icon}</div>
						<div>
							<div className="text-2xl font-bold text-sky-950">
								{stat.value}
							</div>
							<div className="text-sky-700 text-sm font-medium">
								{stat.label}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
				{/* Bar Chart */}
				<div className="bg-sky-50 rounded-xl shadow-md p-6 flex flex-col items-center">
					<h2 className="text-lg font-bold text-sky-950 mb-4">
						Issues Created This Week
					</h2>
					<Bar
						data={barData}
						options={{
							responsive: true,
							plugins: { legend: { display: false } },
							scales: {
								x: { grid: { display: false } },
								y: {
									beginAtZero: true,
									grid: { color: '#e5e7eb' },
								},
							},
						}}
					/>
				</div>
				{/* Doughnut Chart */}
				<div className="bg-sky-50 rounded-xl shadow-md p-6 flex flex-col items-center">
					<h2 className="text-lg font-bold text-sky-950 mb-4">
						Issue Status Distribution
					</h2>
					<Doughnut
						data={doughnutData}
						options={{
							plugins: {
								legend: {
									position: 'bottom',
									labels: { color: '#0c4a6e', font: { size: 14 } },
								},
							},
							cutout: '70%',
						}}
					/>
				</div>
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
				<div className="flex flex-wrap gap-6">
					{['Alice', 'Bob', 'Priya', 'John', 'Sarah', 'Alex', 'Emma', 'David'].map(
						(name, idx) => (
							<div key={name} className="flex flex-col items-center">
								<img
									src={`/images/avatar${(idx % 3) + 1}.png`}
									alt={name}
									className="w-14 h-14 rounded-full border-2 border-sky-950 mb-2 object-cover"
								/>
								<span className="text-sky-950 font-medium">{name}</span>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default DashboardPage