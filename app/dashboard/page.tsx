'use client'
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { FaBug, FaCheckCircle, FaHourglassHalf, FaUsers } from 'react-icons/fa'


import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import WeeklyIssuesChart from './WeeklyIssuesChart'

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

interface Stats {
  open: number;
  inProgress: number;
  closed: number;
}





const getStats = async (): Promise<Stats> => {
	const res = await fetch('/api/stats');
  if (!res.ok) throw new Error('Failed to fetch stats');
  const stats : Stats = await res.json();
  
  return stats;
};
		
		

		
	



const DashboardPage = () => {
	
// Get stats from databe

  const { data, error, isLoading } = useQuery<Stats>({
    queryKey: ['stats'],
    queryFn: getStats,
    staleTime: 1000 * 60, // 1 minute
  });

  
  const doughnutData = {
	labels: ['Open', 'In Progress', 'Closed'],
	datasets: [
		{
			data: [data?.open, data?.inProgress, data?.closed],
			backgroundColor: ['#0c4a6e', '#38bdf8', '#22c55e'],
			borderWidth: 2,
		},
	],
}

const [stats, setStats] = useState([
	{
		label: 'Open Issues',
		value: data?.open,
		icon: <FaBug className="text-sky-950 text-3xl" />,
		color: 'bg-sky-100',
	},
	{
		label: 'In Progress',
		value: data?.inProgress,
		icon: <FaHourglassHalf className="text-sky-950 text-3xl" />,
		color: 'bg-sky-200',
	},
	{
		label: 'Resolved',
		value: data?.closed,
		icon: <FaCheckCircle className="text-green-600 text-3xl" />,
		color: 'bg-green-50',
	},
	{
		label: 'Team Members',
		value: 0,
		icon: <FaUsers className="text-sky-950 text-3xl" />,
		color: 'bg-sky-50',
	},
])
const [total, setTotal] = useState(0)




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
				<WeeklyIssuesChart />
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