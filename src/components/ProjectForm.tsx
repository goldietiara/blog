"use client"

import { SessionInterface } from '@/common.types'
import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useState } from 'react'
// other way to do it
import FormField from './FormField'
import CustomMenu from './CustomMenu'
import { categoryFilters } from '@/constant/constant'
import Button from './Button'

import plus from '@/public/plus.svg'
import { createNewProject, fetchToken } from '@/lib/action'
import { useRouter } from 'next/navigation'


type typeProps = {
    type: string
    session: SessionInterface
}

const ProjectForm = ({ type, session }: typeProps) => {

    const router = useRouter()

    // Submit Form
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmit(true)

        const { token } = await fetchToken()

        try {
            if (type === "create") {
                // create new project action
                await createNewProject(form, session?.user?.id, token)
                router.push('/')
            }
        } catch (error) {
            console.log(error)

        } finally {
            setIsSubmit(false)
        }
    }

    // Change Image
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0]
        // if no file : return
        if (!file) {
            return
        }
        // if file is not image : return alert
        if (!file.type.includes('image')) {
            return alert('Please upload an "Image" file')
        }

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            const result = reader.result as string

            handleStateChange('image', result)
        }
    }

    // State Change
    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prev) => ({ ...prev, [fieldName]: value }))
    }
    const [isSubmit, setIsSubmit] = useState(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
        image: '',
        liveSiteUrl: '',
        githubUrl: '',
        category: '',
    })


    return (
        <form onSubmit={handleFormSubmit} className='flex items-center justify-start flex-col w-full lg:pt-24 pt-12 gap-10 text-lg max-w-5xl mx-auto '>
            <div className='flex items-center justify-start w-full lg:min-h-[400px] min-h-[200px] relative'>
                <label htmlFor="poster" className='flex justify-center items-center z-10 text-center w-full h-full p-20 text-gray-400 border-2 border-gray-300 border-dashed'>
                    {!form.image && 'chooose a poster for your project'}
                </label>
                <input
                    id="image"
                    type='file'
                    accept='image/*'
                    required={type === 'create' ? true : false}
                    className='absolute z-30 w-full opacity-0 h-full cursor-pointer'
                    onChange={handleChangeImage}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className='sm:p-10 object-contain z-20'
                        alt='object poster'
                        fill
                    >

                    </Image>
                )}
            </div>


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

            {/* <CustomMenu
                title="Github URL"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            /> */}
            {/* { custom input} */}
            <button className='flex items-center justify-start w-full'>
                <Button
                    title={isSubmit
                        ? `${type === 'create' ? 'Creating' : 'Editing'}`
                        : `${type === 'create' ? 'Create' : 'Edit'}`
                    }
                    type="submit"
                    leftIcon={isSubmit
                        ? ""
                        : plus
                    }
                    isSubmit={isSubmit}
                />
            </button>
        </form>
    )
}

export default ProjectForm