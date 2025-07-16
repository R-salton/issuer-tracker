
import prisma from '@/prisma/client'
export const getStats = async () => {
		const open = await prisma.issue.count({
			where: {
				status: 'OPEN',
			},
		})

		const inProgress = await prisma.issue.count({
			where: {
				status: 'ON_PROGRESS',
			},
		})
		const closed = await prisma.issue.count({
			where: {
				status: 'CLOSED',
			},
		})

        return {
            open,
            inProgress,
            closed,
        }
		
}