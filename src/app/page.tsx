import { ProjectInterface } from '@/common.types'
import ProjectCard from '@/components/ProjectCard'
import { fetchAllProjects } from '@/lib/action'
import Image from 'next/image'

type typeProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[]
    pageInfo: {
      hasPreviousPage: boolean
      hasNextPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}

export default async function Home() {

  const data = await fetchAllProjects() as typeProjectSearch

  const projectsToDisplay = data?.projectSearch?.edges || []

  if (projectsToDisplay.length === 0) {
    return (
      <section className='flex flex-col items-center justify-start lg:px-20 py-6 px-5'>
        <p className='w-full text-center my-10 px-2'>No projects found</p>
      </section>
    )
  }



  return (
    <section className='flex items-center justify-start flex-col lg:px-20 py-6 px-5 mb-16'>
      <h1 >Categories</h1>

      <section className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-10 w-full'>
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }, i, a) => {
          return (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy?.name}
              avatarUrl={node?.createdBy?.avatarUrl}
              userId={node?.createdBy?.id}
            />)
        })}

      </section>

      <h1>Posts</h1>
      <h1>Loadmore</h1>
    </section>
  )
}
