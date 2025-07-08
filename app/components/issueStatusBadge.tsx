import { IssueStatus } from '@/app/generated/prisma'
import { Badge } from '@radix-ui/themes'

const statusMap: Record<IssueStatus,{label: string, color: "blue" | "yellow" | "green"}> = {
    OPEN: {label: 'Open', color: 'blue'},
    ON_PROGRESS: {label: 'On Progress', color: 'yellow'},
    CLOSED: {label: 'Closed', color: 'green'},
}

const IssueStatusBadge = ({status}: {status: IssueStatus}) => {

  return (
    <div>
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    </div>
  )
}

export default IssueStatusBadge