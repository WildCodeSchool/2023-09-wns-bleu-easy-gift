import { useGetMessagesByDisscutionQuery } from '@/graphql/generated/schema'
import React from 'react'

function TestDiscData({ discussionId }: { discussionId: number }) {
    const { data, refetch, fetchMore } = useGetMessagesByDisscutionQuery({
        variables: {
            discussionId: discussionId || 0,
            limit: 10,
            offset: 0,
        },
    })

    return (
        <div>
            {data?.getMessagesByDisscution.map(message => (
                <div>{message.content}</div>
            ))}
        </div>
    )
}

export default TestDiscData
