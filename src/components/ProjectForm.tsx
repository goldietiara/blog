"use client"

import { SessionInterface } from '@/common.types'
import Image from 'next/image'
import React, { ChangeEvent, FormEvent } from 'react'
import FormField from './FormField'
import CustomMenu from './CustomMenu'
import { categoryFilters } from '@/constant/constant'
// other way to do it


type typeProps = {
    type: string
    session: SessionInterface
}

const ProjectForm = ({ type, session }: typeProps) => {

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { }
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => { }
    const handleStateChange = (fieldName: string, value: string) => {

    }
    const form = {
        image: "",
        title: ""
    }

    return (
        <form onSubmit={handleFormSubmit} className='flex items-center justify-start flex-col w-full lg:pt-24 pt-12 gap-10 text-lg max-w-5xl mx-auto'>
            <div>
                <label htmlFor="poster" className='flex justify-center items-center z-10 text-center w-full h-full p-20 text-gray-100 border-2 border-gray-50 border-dashed'>
                    {!form.image && 'chooose a poster for your project'}
                </label>
                <input
                    id="image"
                    type='file'
                    accept='image/*'
                    required={type === 'create' ? true : false}
                    onChange={handleChangeImage}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className='p-10 object-contain z-20'
                        alt='object poster'
                        fill
                    >

                    </Image>
                )}
            </div>

            <FormField
                title='Title'
                state={form.title}
                placeholder="flexible"
                setState={(value) => handleStateChange('title', value)}

            />

            <FormField
                title="Title"
                state={form.title}
                placeholder="flexible"
                setState={(value) => handleStateChange('title', value)}
            />
            <FormField
                title="Description"
                state={form.description}
                placeholder="Showcase and discover remarkable developer projects"
                setState={(value) => handleStateChange('description', value)}
            />
            <FormField
                type='url'
                title="Website Url"
                state={form.liveSiteUrl}
                placeholder="test test"
                setState={(value) => handleStateChange('liveSiteUrl', value)}
            />
            <FormField
                type='url'
                title="Github URL"
                state={form.githubUrl}
                placeholder="https://github.com"
                setState={(value) => handleStateChange('githubUrl', value)}
            />

            <CustomMenu
                title="Github URL"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />
            {/* { custom input} */}
            <button className='flex items-center justify-start w-full'>
                <button>Create</button>
            </button>
        </form>
    )
}

export default ProjectForm