"use client"

import { useState, useEffect } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import React from 'react'
import Button from './Button'

// 01:37:00

type typeProvider = {
    id: string
    name: string
    type: string
    signinUrl: string
    callbackUrl: string
    signinUrlParams?: Record<string, string> | null
}

type typeProviders = Record<string, typeProvider>

const AuthProvider = () => {

    const [providers, setProviders] = useState<typeProviders | null>(null)

    useEffect(() => {
        const fetchProvider = async () => {
            const res = await getProviders()
            console.log(res)
            setProviders(res)
        }

        fetchProvider()
    }, [])

    if (providers) {
        return (
            <div>
                {Object.values(providers).map((v: typeProvider, i, a) => {
                    return (
                        <Button key={i} title='Sign In' handleClick={() => signIn(v?.id)} />
                    )
                })}
            </div>
        )
    }
}

export default AuthProvider