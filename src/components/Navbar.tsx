import Link from 'next/link'
import React from 'react'
import logo from '../app/public/logo.svg'
import Image from 'next/image'
import { NavLinks } from '@/constant/constant'
import AuthProvider from './AuthProvider'

const Navbar = () => {

    const session = {}

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
                {session
                    ? <> User Photo <Link href="/create-project"> Share Work</Link> </>
                    : <AuthProvider></AuthProvider>
                }
            </div>

        </nav >
    )
}

export default Navbar