import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    useGetMessagesByDisscutionQuery,
    useAddNewMessageSubscription,
    useCreateMessageMutation,
    GetMessagesByDisscutionQuery,
} from '@/graphql/generated/schema'
import Message from './Message'
import { useUserData } from '@/context/userContext'
import { useRouter } from 'next/router'
import { useIntersectionObserver } from '@/hook/useIntersectionObserver'
import { Button } from '../ui/button'

const EspaceDiscussion = ({
    isMenuHidden,
}: {
    isMenuHidden: boolean
    groupId: number
}) => {
    const router = useRouter()
    const { discussionId } = router.query
    const { userData } = useUserData()
    const limit = 15
    const [offset, setOffset] = useState(0)
    const [content, setContent] = useState('')
    const [messages, setMessages] = useState<
        GetMessagesByDisscutionQuery['getMessagesByDisscution']
    >([])
    const [canShowIntersector, setCanShowIntersector] = useState(false)
    const [canGetMore, setCanGetMore] = useState(true)
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5,
    })

    const [isGettingMore, setIsGettingMore] = useState(false)

    const selectedDiscussionId = discussionId
        ? parseInt(discussionId as string, 10)
        : null

    const { data, fetchMore, refetch } = useGetMessagesByDisscutionQuery({
        variables: {
            discussionId: selectedDiscussionId || 0,
            limit,
            offset,
        },
        onCompleted: data => {
            if (data.getMessagesByDisscution.length === 0)
                return setCanGetMore(false)
            setCanGetMore(true)
        },
    })

    const { data: subscriptionData } = useAddNewMessageSubscription({
        variables: {
            discussionId: selectedDiscussionId || 0,
        },
    })

    useEffect(() => {
        if (data?.getMessagesByDisscution && !subscriptionData?.newMessage) {
            setMessages(prev => {
                const allMessages = [...data.getMessagesByDisscution, ...prev]
                const mapMessages = new Map()
                for (const message of allMessages) {
                    mapMessages.set(message.id, message)
                }
                return Array.from(mapMessages.values()).sort((a, b) => {
                    return a.created_at > b.created_at ? 1 : -1
                })
            })
        }
        if (
            subscriptionData?.newMessage &&
            subscriptionData.newMessage.user.id !==
                parseInt(userData?.id || '0', 10)
        ) {
            setMessages(prev => [...prev, subscriptionData.newMessage])
        }
    }, [subscriptionData, data])

    const getMore = async () => {
        setOffset(prevOffset => prevOffset + limit)
        setIsGettingMore(true)
        try {
            await fetchMore({
                variables: {
                    discussionId: selectedDiscussionId || 0,
                    limit,
                    offset: offset + limit,
                },
            })

            setTimeout(() => {
                setIsGettingMore(false)
            }, 2000)
        } catch (error) {
            console.error('Error fetching more messages:', error)
        }
    }

    useEffect(() => {
        if (isIntersecting) {
            handleScrollContainer('step')
            getMore()
        }
    }, [isIntersecting])

    const [createMessage] = useCreateMessageMutation()

    const handleSendMessage = async () => {
        try {
            await createMessage({
                variables: {
                    discussionId: selectedDiscussionId || 0,
                    userId: parseInt(userData?.id || '0', 10),
                    content,
                },
                onCompleted: data => {
                    setMessages(prev => [...prev, data.createMessage])
                },
            })
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    const handleScrollContainer = (off: 'all' | 'step') => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                off === 'all'
                    ? messagesContainerRef.current.scrollHeight
                    : messagesContainerRef.current.scrollTop + 100
        }
    }

    useEffect(() => {
        if (isGettingMore) return
        setCanShowIntersector(false)
        if (messages.length) {
            setTimeout(() => {
                return setCanShowIntersector(true)
            }, 500)
        }
        handleScrollContainer('all')
    }, [messages])

    const messagesContainerRef = useRef<React.LegacyRef<HTMLUListElement>>(null)

    useMemo(() => {
        setMessages([])
        setOffset(0)
        refetch()
    }, [discussionId])

    return (
        <div
            className={`hidden md:w-7/12 md:flex md:flex-grow md:justify-center md:items-center transition-all duration-1000 ease-in-out ${isMenuHidden ? 'md:w-full' : 'md:w-12/12'}`}
        >
            <div
                className={`hidden h-full md:w-7/12 md:flex md:flex-grow md:justify-center md:items-center transition-all duration-1000 ease-in-out ${isMenuHidden ? 'md:w-full' : 'md:w-12/12'}`}
            >
                <div className='w-full h-full relative mx-10 p-3 bg-slate-200 rounded-lg'>
                    <ul
                        className='  absolute bottom-10 pb-5 pt-20 w-full max-h-full overflow-y-scroll gap-4 flex-col flex right-1 '
                        //@ts-ignore
                        ref={messagesContainerRef}
                    >
                        {canShowIntersector && canGetMore ? (
                            <div
                                ref={ref}
                                className='absolute w-full h-2/5 p-3'
                            />
                        ) : (
                            <p className='font-semibold w-full text-center pb-4'>
                                Début de la discussion
                            </p>
                        )}
                        {messages.map(message => (
                            <Message key={message.id} message={message} />
                        ))}
                    </ul>

                    <div className='absolute bottom-0 flex w-full items-center justify-evenly p-3'>
                        <input
                            className='w-3/6 p-2 rounded-md'
                            type='text'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                        <Button disabled={!content.length}>Envoyer</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EspaceDiscussion
