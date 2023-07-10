import Link from 'next/link'
import React, { useEffect } from 'react'
import logo from '../public/logo.svg'
import Image from 'next/image'
import { NavLinks } from '@/constant/constant'
import AuthProvider from './AuthProvider'
import { getProviders } from 'next-auth/react'
import { getCurrentUser } from '@/lib/session'
import ProfileMenu from './ProfileMenu'

const Navbar = async () => {

    const session = await getCurrentUser()

    // min 01:05:00

    return (
        <nav className='flex justify-between items-center'>
            <div className='flex items-center gap-5'>
                <Link href="./">
                    <Image src={logo} width={115} height={43} alt="flexible"></Image>
                </Link>
                <ul className='lg:flex hidden gap-5'>
                    {NavLinks.map((v, i, a) => {
                        return (<Link className='hover:text-teal-500' href={v.href} key={i}>{v.text}</Link>)
                    })}
                </ul>
            </div>

            <div className='flex items-center gap-4'>
                {session?.user
                    ? (
                        <>
                            <ProfileMenu session={session}></ProfileMenu>
                            <Link className=' bg-black text-white rounded-md px-4 py-2 hover:bg-violet-500 transition-all ease-linear duration-100' href="/create-project"> Share Work</Link>

                        </>
                    )
                    : (<AuthProvider></AuthProvider>)
                }
            </div>

        </nav >
    )
}

export default Navbar