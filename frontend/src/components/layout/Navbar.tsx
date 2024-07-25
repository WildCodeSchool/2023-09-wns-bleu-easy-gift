import React, { useState, useRef, useEffect } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Logout from '../Logout'
import { checkUserConnected } from '@/utils/checkConnection'
import { maxWidthScreen } from '@/constants/styles'
import { useRouter } from 'next/router'

export default function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const isConnected = checkUserConnected()
    const menuRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const currentPath = router.pathname

    const closeMenu = () => setMenuOpen(false)

    const handleLogoClick = () => {
        router.push('/')
    }

    console.log('isConnected from nav', isConnected)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                closeMenu()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <nav className='w-full h-16 sticky top-0 shadow-lg z-10 bg-bgPrimary'>
            <div
                className={`max-w-[${maxWidthScreen}] h-full flex justify-between items-center gap-2 mx-auto px-10 2xl:px-[350px]`}
            >
                {/* Burger Icon for Mobile Screens */}
                <button
                    aria-label='Ouvrir ou fermer la navigation'
                    onClick={() => setMenuOpen(!isMenuOpen)}
                    className='md:hidden'
                >
                    <svg
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 6h16M4 12h16M4 18h16'
                        />
                    </svg>
                </button>

                <div
                    className='space-y-1 flex justify-center items-center hover:cursor-pointer'
                    onClick={handleLogoClick}
                >
                    <Link
                        href='/'
                        className='font-rubik text-2xl text-primaryBlue font-bold flex items-center justify-between'
                        aria-label='Lien vers la page d’accueil'
                    >
                        <img
                            src='/images/logo/logo-easy-gift-tablet.png'
                            alt="Logo d'easy-gift"
                            className='mr-2'
                        />
                        Easy Gift
                    </Link>
                </div>

                {/* Links for Larger Screens */}
                {isConnected && (
                    <>
                        <div className={`hidden md:flex md:flex-row gap-4`}>
                            <Link
                                href='/groupes'
                                className={`font-semibold ${currentPath === '/groupes' ? 'underline' : ''}`}
                            >
                                Mes groupes
                            </Link>

                            <Link
                                href='/mon-profil'
                                className={`font-semibold ${currentPath === '/mon-profil' ? 'underline' : ''}`}
                            >
                                Mon profil
                            </Link>
                        </div>
                    </>
                )}

                {/* Side Drawer for Mobile Screens */}
                <div
                    ref={menuRef}
                    className={`absolute left-0 top-0 w-[75%] h-110 bg-bgPrimary shadow-lg transform ${
                        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out flex flex-col gap-4 p-4 md:hidden`}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setMenuOpen(false)}
                        className='self-end md:hidden'
                        aria-label='Fermer la navigation'
                    >
                        <svg
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    </button>
                    {isConnected && (
                        <>
                            <Link href='/mon-profil' onClick={closeMenu}>
                                Mon profil
                            </Link>
                            <Link href='/groupes' onClick={closeMenu}>
                                Mes groupes
                            </Link>
                        </>
                    )}

                    {!isConnected && (
                        <>
                            <Button>
                                <Link onClick={closeMenu} href='/auth/login'>
                                    Se connecter
                                </Link>
                            </Button>
                            <Button>
                                <Link onClick={closeMenu} href='/auth/register'>
                                    S'enregistrer
                                </Link>
                            </Button>
                        </>
                    )}
                    <Logout />
                </div>

                {/* Auth Buttons for Larger Screens */}
                <div className={`hidden md:flex md:flex-row gap-2`}>
                    {!isConnected && (
                        <>
                            <Button>
                                <Link href='/auth/login'>Se connecter</Link>
                            </Button>
                            <Button>
                                <Link href='/auth/register'>S'enregistrer</Link>
                            </Button>
                        </>
                    )}
                    {isConnected && <Logout />}
                </div>
            </div>
        </nav>
    )
}
