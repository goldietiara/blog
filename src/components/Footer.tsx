import React from 'react'
import Image from 'next/image'
import Logo from '@/public/logo-purple.svg'
import { footerLinks } from '@/constant/constant'
import Link from 'next/link'

type typeFooterColumn = {
    title: string
    links: Array<string>
}

const FooterColumn = ({ title, links }: typeFooterColumn) => {
    return (
        <div className='flex flex-col py-3'>
            <h4 className='font-bold'>{title}</h4>
            <ul className='flex flex-col text-sm font-semibold'>
                {links.map((v, i, a) => {
                    return <Link href="/" className=' text-zinc-600 hover:text-teal-500 py-1 hover:underline underline-offset-4'>{v}</Link>
                })}
            </ul>
        </div>
    )
}

const Footer = () => {
    return (
        <footer className='flex flex-col'>
            <section className='flex flex-col gap-3'>
                <Image src={Logo} width={115} height={38} alt='logo'></Image>
                <p className='text-sm'>Flexible is the world's leading community for creatives to share,grow and get hired</p>
            </section>

            <section className=' hidden md:flex md:justify-between'>
                <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links}></FooterColumn>
                <div>
                    <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links}></FooterColumn>
                    <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links}></FooterColumn>
                </div>

                <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links}></FooterColumn>

                <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links}></FooterColumn>
                <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links}></FooterColumn>

                <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links}></FooterColumn>
            </section>

            <section className='flex justify-between lg:text-sm text-sm'>
                <p>@2023 Flexible. All right reserved</p>
                <p><span>10,214</span> Projects submitted</p>
            </section>
        </footer>
    )
}

export default Footer