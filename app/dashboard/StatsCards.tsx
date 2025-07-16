import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { FaBug, FaHourglassHalf, FaCheckCircle, FaUsers } from 'react-icons/fa'
import { getStats } from './PieStats';

interface Stats {
  open: number;
  inProgress: number;
  closed: number;
}


const StatsCards = () => {
      const { data, error, isLoading } = useQuery<Stats>({
        queryKey: ['stats'],
        queryFn: getStats,
        staleTime: 1000 * 60, // 1 minute
      });
    
      

      
const stats = [
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
]

  return (
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
  )
}

export default StatsCards