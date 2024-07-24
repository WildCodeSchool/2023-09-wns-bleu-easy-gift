import Message from '@/components/discussions/Message'
import {
    Message as MessageType,
    useAddNewMessageSubscription,
    useCreateMessageMutation,
    useGetMessagesByDisscutionQuery,
} from '@/graphql/generated/schema'
import React, { useEffect, useRef, useState } from 'react'

const discId = 7
const limit = 10
const offset = 0

function Index() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [content, setContent] = useState('')

    const messagesContainerRef = useRef<React.LegacyRef<HTMLUListElement>>(null)

    const { data, loading, error } = useGetMessagesByDisscutionQuery({
        variables: {
            discussionId: discId,
            limit: limit,
            offset: offset,
        },
    })

    const { data: subscriptionData } = useAddNewMessageSubscription({
        variables: {
            discussionId: discId,
        },
    })

    const [createMessage] = useCreateMessageMutation()

    const handleSendMessage = async () => {
        try {
            await createMessage({
                variables: {
                    discussionId: discId,
                    userId: 3,
                    content,
                },
            })
            setContent('')
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    useEffect(() => {
        if (data?.getMessagesByDisscution) {
            setMessages(data.getMessagesByDisscution as MessageType[])
        }
    }, [data])

    useEffect(() => {
        if (subscriptionData) {
            const newMessage = subscriptionData.newMessage
            setMessages(prevMessages => {
                if (
                    !prevMessages.find(message => message.id === newMessage.id)
                ) {
                    return [...prevMessages, newMessage as MessageType]
                }
                return [...prevMessages]
            })
        }
    }, [subscriptionData])

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight
        }
    }, [messages])

    return (
        <div className='w-full h-screen flex items-start justify-end'>
            <div className='w-2/3 h-4/6 relative mt-16 mx-10 p-3 bg-slate-200 rounded-lg'>
                <ul
                    className='absolute bottom-0 w-full max-h-full overflow-y-scroll gap-4 flex-col flex right-1 '
                    ref={messagesContainerRef}
                >
                    {messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))}
                </ul>

                <div className='absolute -bottom-10 flex w-full items-center justify-evenly '>
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
    )
}

export default Index
