import React, { useEffect, useState } from 'react'
import {
    useGetDiscussionsByGroupIdWithoutCtxUserQuery,
    GetDiscussionsByGroupIdWithoutCtxUserQuery,
} from '@/graphql/generated/schema'

const EspaceDiscussion = ({
    isMenuHidden,
    selectedDiscussionId,
    groupId,
}: {
    isMenuHidden: boolean
    selectedDiscussionId: number | null
    groupId: number
}) => {
    const { data, loading, error } =
        useGetDiscussionsByGroupIdWithoutCtxUserQuery({
            variables: {
                groupId,
            },
            fetchPolicy: 'cache-and-network',
        })
    type DiscussionType =
        | GetDiscussionsByGroupIdWithoutCtxUserQuery['getDiscussionsByGroupIdWithoutCtxUser']['discussions'][0]
        | null

    const [selectedDiscussion, setSelectedDiscussion] =
        useState<DiscussionType>(null)
    useEffect(() => {
        if (data && selectedDiscussionId) {
            const discussion =
                data.getDiscussionsByGroupIdWithoutCtxUser.discussions.find(
                    disc => disc.id === selectedDiscussionId
                ) || null
            setSelectedDiscussion(discussion)
        }
    }, [data, selectedDiscussionId])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error loading discussion</div>

    return (
        <div
            className={`hidden md:w-7/12 md:flex md:flex-grow md:justify-center md:items-center transition-all duration-1000 ease-in-out ${isMenuHidden ? 'md:w-full' : 'md:w-12/12'}`}
        >
            <div>
                <img
                    src={selectedDiscussion?.userDiscussion?.avatar?.url || ''}
                    alt=''
                />
                <p>Noël</p>
            </div>
            <div>
                <p>
                    Partie où on recevra les messages pour discussion{' '}
                    {selectedDiscussion?.userDiscussion?.pseudo}
                </p>
            </div>
            {/* Barre d'outils en bas */}
            <div></div>
        </div>
    )
}

export default EspaceDiscussion
