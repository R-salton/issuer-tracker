import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Doughnut } from 'react-chartjs-2'


interface Stats {
  open: number;
  inProgress: number;
  closed: number;
}


export const getStats = async (): Promise<Stats> => {
	const res = await fetch('/api/stats');
  if (!res.ok) throw new Error('Failed to fetch stats');
  const stats : Stats = await res.json();
  
  return stats;
};

const PieStats = () => {

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
  return (
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
  )
}

export default PieStats