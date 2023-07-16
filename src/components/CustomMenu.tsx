"use client"

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import iconArrowDown from '@/public/arrow-down.svg'

type typeProps = {
    title: string,
    state: string,
    filters: Array<string>,
    setState: (value: string) => void;
}

const CustomMenu = ({ title, state, filters, setState }: typeProps) => (
    <div className="flex items-center justify-start flex-col w-full gap-7 relative">
        <label htmlFor={title} className="w-full text-black">{title}</label>
        <Menu as="div" className="self-start relative w-full">
            <div className=' bg-slate-100 w-full rounded-md text-slate-500'>
                <Menu.Button className="flex items-center gap-4 w-full rounded-md bg-light-white-100 p-4 text-base outline-none capitalize">
                    {state || 'Category'}
                    <Image
                        src={iconArrowDown}
                        width={10}
                        height={5}
                        alt="arrow down"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="flex items-center justify-start flex-col absolute left-0 mt-2 xs:min-w-[300px] w-fit max-h-64 origin-top-right rounded-xl bg-white border border-nav-border shadow-menu overflow-y-auto">
                    {filters.map((tag) => (
                        <Menu.Item key={tag}>
                            <button
                                type="button"
                                value={tag}
                                className="text-left w-full px-5 py-2 text-sm hover:bg-light-white-100 self-start whitespace-nowrap capitalize"
                                onClick={(e) => setState(e.currentTarget.value)}
                            >
                                {tag}
                            </button>
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    </div>
);

export default CustomMenu;
