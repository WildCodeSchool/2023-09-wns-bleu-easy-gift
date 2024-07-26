import { useUserData } from '@/context/userContext'
import { GetMessagesByDisscutionQuery } from '@/graphql/generated/schema'
import Image from 'next/image'
import React from 'react'
import { formatTimestamp } from '@/utils/date'

function Message({
    message,
}: {
    message: GetMessagesByDisscutionQuery['getMessagesByDisscution'][0]
}) {
    const { userData } = useUserData()
    const messageDate = formatTimestamp(
        message.created_at,
        'DD/MM/YYYY HH:mm:ss'
    )
    const userAvatar = message.user.avatar?.url || ''
    const currentUserId = userData?.id || ''

    // border largeur message

    return (
        <div
            className={`w-full flex ${message.user.id === parseInt(currentUserId, 10) ? 'justify-end' : 'justify-start'} px-10`}
        >
            <div className=' w-2/3 p-3 rounded-md relative bg-slate-100'>
                <Image
                    alt={`${message.user.pseudo} avtar`}
                    src={userAvatar}
                    width={30}
                    height={30}
                    className={`rounded-full absolute  ${parseInt(currentUserId, 10) === message.user.id ? '-top-3 -right-3' : '-top-3 -left-3'}`}
                />
                <div
                    className={`w-full flex justify-between pt-1 ${parseInt(currentUserId, 10) === message.user.id ? 'flex-row-reverse' : ''}`}
                >
                    <p className='pl-1 text-sm font-semibold text-red600'>
                        {message.user.pseudo}
                    </p>
                    <p className='text-sm'>{messageDate}</p>
                </div>
                <p className='w-full break-words text-balance'>
                    {message.content}
                </p>
            </div>
        </div>
    )
}

export default Message
