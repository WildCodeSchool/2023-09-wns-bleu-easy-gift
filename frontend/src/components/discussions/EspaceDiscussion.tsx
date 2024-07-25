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

    const selectedDiscussionId = discussionId
        ? parseInt(discussionId as string, 10)
        : null

    const { fetchMore, refetch } = useGetMessagesByDisscutionQuery({
        variables: {
            discussionId: selectedDiscussionId || 0,
            limit,
            offset,
        },
        onCompleted(data) {
            setMessages(data.getMessagesByDisscution)
        },
    })

    const { data: subscriptionData } = useAddNewMessageSubscription({
        variables: {
            discussionId: selectedDiscussionId || 0,
        },
        // onComplete() {
        //     refetch({
        //         discussionId: selectedDiscussionId || 0,
        //         limit,
        //         offset,
        //     })
        // },
    })

    useEffect(() => {
        // if (data?.getMessagesByDisscution) {
        //     if (subscriptionData?.newMessage) {
        //         setMessages(prev => [
        //             ...prev,
        //             ...data.getMessagesByDisscution,
        //             subscriptionData.newMessage,
        //         ])

        //         return
        //         // return [
        //         //     ...data.getMessagesByDisscution,
        //         //     subscriptionData.newMessage,
        //         // ]
        //     }
        //     setMessages(prev => [...prev, ...data.getMessagesByDisscution])
        // }
        if (subscriptionData?.newMessage) {
            setMessages(prev => [...prev, subscriptionData.newMessage])
        }
    }, [subscriptionData])

    // useEffect(() => {
    //     // setMessages([])
    // }, [selectedDiscussionId])

    const getMore = async () => {
        setOffset(prevOffset => prevOffset + limit)
        try {
            await fetchMore({
                variables: {
                    discussionId: selectedDiscussionId || 0,
                    limit,
                    offset,
                },
            })
        } catch (error) {
            console.error('Error fetching more messages:', error)
        }
    }

    const [createMessage] = useCreateMessageMutation()

    const handleSendMessage = async () => {
        try {
            await createMessage({
                variables: {
                    discussionId: selectedDiscussionId || 0,
                    userId: parseInt(userData?.id || '0', 10),
                    content,
                },
                // refetchQueries: [
                //     {
                //         query: GetMessagesByDisscutionDocument,
                //         variables: {
                //             discussionId: selectedDiscussionId || 0,
                //             limit,
                //             offset,
                //         },
                //     },
                // ],
                // awaitRefetchQueries: true,
            })
            setContent('')
            handleScrollToBottom()
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    const messagesContainerRef = useRef<React.LegacyRef<HTMLUListElement>>(null)

    useMemo(() => {
        refetch()
    }, [discussionId])

    // useEffect(() => {
    //     if (messagesContainerRef.current) {
    //         //@ts-ignore
    //         messagesContainerRef.current.scrollTop =
    //             //@ts-ignore
    //             messagesContainerRef.current.scrollHeight
    //     }
    // }, [messages])

    const handleScrollToBottom = () => {
        //@ts-ignore
        messagesContainerRef.current.scrollTop =
            //@ts-ignore
            messagesContainerRef.current.scrollHeight
    }

    // useEffect(() => {
    //     if (!messagesContainerRef.current) return

    //     messagesContainerRef.current.addEventListener('scroll', () => {
    //         if (messagesContainerRef.current.scrollTop < 20) {
    //             getMore()
    //         }
    //     })

    //     return () => {
    //         messagesContainerRef.current.removeEventListener('scroll', () => {})
    //     }
    // }, [])

    // const handleScroll = () => {
    //     if (messagesContainerRef.current) {
    //         const { scrollTop, scrollHeight, clientHeight } =
    //             messagesContainerRef.current
    //         if (scrollTop === 0) {
    //             setOffset(prevOffset => prevOffset + limit)
    //         }
    //     }
    // }

    // useEffect(() => {
    //     if (messagesContainerRef.current) {
    //         messagesContainerRef.current.addEventListener(
    //             'scroll',
    //             handleScroll
    //         )
    //     }
    //     return () => {
    //         if (messagesContainerRef.current) {
    //             messagesContainerRef.current.removeEventListener(
    //                 'scroll',
    //                 handleScroll
    //             )
    //         }
    //     }
    // }, [])

    return (
        <div
            className={`hidden md:w-7/12 md:flex md:flex-grow md:justify-center md:items-center transition-all duration-1000 ease-in-out ${isMenuHidden ? 'md:w-full' : 'md:w-12/12'}`}
        >
            {/* w-full h-screen flex items-start justify-end */}
            <button onClick={getMore}>GET MORE</button>
            <div
                className={`hidden h-full md:w-7/12 md:flex md:flex-grow md:justify-center md:items-center transition-all duration-1000 ease-in-out ${isMenuHidden ? 'md:w-full' : 'md:w-12/12'}`}
            >
                <div className='w-full h-full relative mx-10 p-3 bg-slate-200 rounded-lg'>
                    <ul
                        className='absolute bottom-10 pb-5 pt-20 w-full max-h-full overflow-y-scroll gap-4 flex-col flex right-1 '
                        //@ts-ignore
                        ref={messagesContainerRef}
                    >
                        {messages.map(message => (
                            <Message key={message.id} message={message} />
                        ))}
                    </ul>

                    <div className='absolute bottom-0 flex w-full items-center justify-evenly '>
                        <input
                            className='w-3/6 p-2 rounded-md'
                            type='text'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EspaceDiscussion
