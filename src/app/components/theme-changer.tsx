"use client";

import {themes} from "@/app/shared/constants/ui-themes";
import {useEffect, useState} from "react";
import {themeChange} from "theme-change";

export const ThemeChanger = () => {
    const getTheme = () => {
        if (typeof window !== 'undefined') {
            return (localStorage as any).getItem('theme') as string;
        }
    }

    const [theme, setTheme] = useState<string>(getTheme() || 'retro');

    useEffect(() => {
        themeChange(false);
    }, [theme]);

    const changeTheme = (theme: string) => {
        if (typeof window !== 'undefined') {
            (localStorage as any).setItem('theme', theme!)
        }
        document.querySelector('html')?.setAttribute('data-theme', theme)
    }

    return (
        <select className="select select-bordered w-full max-w-xs mr-10 bg-neutral-content" data-choose-theme={theme} onChange={(event) => changeTheme(event.target.value as any)}>
            <option disabled>Aktuální téma:</option>
            {themes.map((theme: string, index: number) => (
                <option key={index} value={theme}>{theme}</option>
            ))}
        </select>
    )
}