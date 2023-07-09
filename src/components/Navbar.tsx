import Link from 'next/link'
import React, { useEffect } from 'react'
import logo from '../public/logo.svg'
import Image from 'next/image'
import { NavLinks } from '@/constant/constant'
import AuthProvider from './AuthProvider'
import { getProviders } from 'next-auth/react'
import { getCurrentUser } from '@/lib/session'

const Navbar = async () => {

    const session = await getCurrentUser()

    // min 01:05:00

    return (
        <nav className='flex justify-between'>
            <div className='flex'>
                <Link href="./">
                    <Image src={logo} width={115} height={43} alt="flexible"></Image>
                </Link>
                <ul className='lg:flex hidden'>
                    {NavLinks.map((v, i, a) => {
                        return (<Link href={v.href} key={i}>{v.text}</Link>)
                    })}
                </ul>
            </div>

            <div>
                {session?.user
                    ? (
                        <>
                            {session?.user?.image && (<Image src={session.user.image} width={40} height={40} alt={session.user.name}></Image>)}
                            User Photo <Link href="/create-project"> Share Work</Link>
                        </>
                    )
                    : (<AuthProvider></AuthProvider>)
                }
            </div>

        </nav >
    )
}

export default Navbar