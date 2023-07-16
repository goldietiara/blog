"use client";

import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import close from "@/public/close.svg"


export default function Modal({ children }: { children: ReactNode }) {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.push("/");
    }, [router]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target === overlay.current) && onDismiss) {
            onDismiss();
        }
    }, [onDismiss, overlay]);

    return (
        <div ref={overlay} className="fixed flex justify-center z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80" onClick={(e) => handleClick(e)}>

            <div ref={wrapper} className="flex justify-start items-center flex-col absolute bg-white h-[95%] w-[95%] bottom-0  rounded-t-3xl lg:px-40 px-8 pt-14 pb-72 overflow-auto">
                {/* <button type="button" onClick={onDismiss} className="absolute top-15 right-12  bg-black hover:bg-red-400 p-2 rounded-md transition-all ease-linear duration-150">
                    <Image src={close} width={17} height={17} alt="close" />
                </button> */}
                {children}
            </div>
        </div >
    );
}