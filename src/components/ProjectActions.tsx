"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import iconPencil from '@/public/pencile.svg'
import iconTrash from '@/public/trash.svg'
import { fetchToken } from '@/lib/action'
import { FaTrashCan, FaPenToSquare } from 'react-icons/fa6'
import { deleteProject } from '@/lib/action'

type Props = {
    projectId: string
}

const ProjectActions = ({ projectId }: Props) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const router = useRouter()


    const handleDeleteProject = async () => {
        setIsDeleting(true)

        const { token } = await fetchToken();

        try {
            await deleteProject(projectId, token);

            router.push("/");
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <Link href={`/edit-project/${projectId}`} className="gap-2 flex justify-center items-center p-3 bg-black text-white  hover:bg-teal-400 rounded-lg text-sm font-medium transition-all ease-linear duration-150">
                <FaPenToSquare />Edit
            </Link>

            <button
                type="button"
                disabled={isDeleting}
                className={`gap-2 flex justify-center items-center p-3 text-white bg-black hover:bg-red-600 rounded-lg text-sm font-medium ${isDeleting ? "bg-orange-500" : ""}`}
                onClick={handleDeleteProject}
            >
                <FaTrashCan />
                Delete
            </button>
        </>
    )
}

export default ProjectActions