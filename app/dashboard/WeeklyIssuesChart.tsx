import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Bar } from 'react-chartjs-2'



interface WeeklyIssueData {
  labels: string[];
  data: number[];
}


const fetchWeeklyData = async (): Promise<WeeklyIssueData> => {
  const res = await fetch('/api/stats/issues-weekly');
  if (!res.ok) throw new Error('Failed to load weekly data');
 
  return res.json();
};

const WeeklyIssuesChart = () => {

     const { data, isLoading, error } = useQuery<WeeklyIssueData>({
    queryKey: ['issues-per-day'],
    queryFn: fetchWeeklyData,
    staleTime: 60 * 1000, // 1 min
  });


const barData = {
	labels: data?.labels,
	datasets: [
		{
			label: 'Issues Created',
			data: data?.data,
			backgroundColor: 'rgba(8, 47, 73, 0.8)',
			borderRadius: 8,
			barThickness: 24,
		},
	],
}

  return (
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
  )
}

export default WeeklyIssuesChart