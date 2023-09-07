import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/action";
import Image from "next/image";

// npx grafbase@0.24 dev

type typeSearchParams = {
  category: string;
  endCursor: string;
};

type typeProps = {
  searchParams: typeSearchParams;
};

type typeProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export default async function Home({
  searchParams: { category, endCursor },
}: typeProps) {
  const data = (await fetchAllProjects(
    // "Frontend",
    endCursor
  )) as typeProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className=" h-screen flex flex-col items-center justify-start lg:px-20 py-6 px-5">
        <>Video</>
        <Categories></Categories>

        <p className="w-full text-center my-10 px-2">No projects found</p>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-start flex-col lg:px-20 py-6 px-5 mb-16">
      <>Video</>
      <Categories></Categories>

      <section className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-10 w-full">
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
            />
          );
        })}
      </section>

      <h1>Posts</h1>
      <LoadMore
        startCursor={data?.projectSearch?.pageInfo?.startCursor}
        endCursor={data?.projectSearch?.pageInfo?.endCursor}
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      />
    </section>
  );
}
