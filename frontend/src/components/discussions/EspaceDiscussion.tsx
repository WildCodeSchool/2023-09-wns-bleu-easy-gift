import { useRouter } from 'next/router'
import React from 'react'

const EspaceDiscussion = ({ isMenuHidden }: { isMenuHidden: boolean }) => {
    const router = useRouter()

    console.log(router.query)

    return (
        <div
            className={`hidden md:w-7/12 md:flex md:flex-grow md:justify-center md:items-center transition-all duration-1000 ease-in-out ${isMenuHidden ? 'md:w-full' : 'md:w-12/12'}`}
        >
            <div>
                <img src='' alt='' />
                <p>Noël</p>
            </div>
            <div>
                <p>Partie où on recevra les messages</p>
            </div>
            {/* Barre d'outils en bas */}
            <div></div>
        </div>
    )
}

export default EspaceDiscussion
