import React from 'react'
import { Badge } from '@radix-ui/themes'
import { IssueStatus } from '@/app/generated/prisma'

const statusMap: Record<IssueStatus,{label: string, color: "red" | "yellow" | "green"}> = {
    OPEN: {label: 'Open', color: 'green'},
    ON_PROGRESS: {label: 'On Progress', color: 'yellow'},
    CLOSED: {label: 'Closed', color: 'red'},
}

const issueStatusBadge = ({status}: {status: IssueStatus}) => {

  return (
    <div>
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    </div>
  )
}

export default issueStatusBadge