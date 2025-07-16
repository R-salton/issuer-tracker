'use client'
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from 'chart.js'
import RecentCreatedIssues from './Creaters'
import PieStats from './PieStats'
import StatsCards from './StatsCards'
import WeeklyIssuesChart from './WeeklyIssuesChart'

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)


const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const DashboardPage = () => {
	
// Get stats from databe  
 






// Simulate loading delay
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
			<RecentCreatedIssues />

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