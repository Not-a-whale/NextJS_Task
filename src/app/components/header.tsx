"use client";

import {ThemeChanger} from "@/app/components/theme-changer";

export const Header = () => {


    return (
        <header className="flex items-center justify-end h-[5rem] bg-white shadow-lg mb-50 md:mb-10 sm:mb-5 xs:mb-[1rem]">
            <ThemeChanger />
        </header>
    )
}