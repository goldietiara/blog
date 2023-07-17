"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { categoryFilters } from "@/constant/constant";

const Categories = () => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const category = searchParams.get("category")

    const handleTags = (item: string) => {
        router.push(`${pathName}?category=${item}`)
    };

    return (
        <div className="flex justify-between items-center w-full gap-5 flex-wrap">
            <ul className="flex overflow-auto">
                {categoryFilters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => handleTags(filter)}
                        className={`hover:bg-black hover:text-white transition-all ease-out duration-500 ${category === filter
                            ? "bg-black text-white font-medium"
                            : "font-normal"
                            } px-4 py-3 capitalize whitespace-nowrap`}
                    >
                        {filter}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default Categories;