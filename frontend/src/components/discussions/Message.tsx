import { useUserData } from '@/context/userContext'
import { GetMessagesByDisscutionQuery } from '@/graphql/generated/schema'
import Image from 'next/image'
import React from 'react'

function Message({
    message,
}: {
    message: GetMessagesByDisscutionQuery['getMessagesByDisscution'][0]
}) {
    const { userData } = useUserData()
    // const messageDate = new Date(message.created_at)
    // console.log('messageDate', new Date(1721828473944))
    const userAvatar = message.user.avatar?.url || ''
    const currentUserId = userData?.id || ''

    return (
        <div
            className={`w-full flex ${message.user.id === parseInt(currentUserId, 10) ? 'justify-end' : 'justify-start'} px-10`}
        >
            <div className=' w-2/6 p-2 rounded-md relative bg-slate-100'>
                <Image
                    alt={`${message.user.pseudo} avtar`}
                    src={userAvatar}
                    width={30}
                    height={30}
                    className='rounded-full absolute -top-3 -left-3'
                />
                <div className='w-full flex justify-end'>
                    {/* <p className='text-sm'>{messageDate}</p> */}
                </div>
                <div>{message.content}</div>
            </div>
        </div>
    )
}

export default Message
