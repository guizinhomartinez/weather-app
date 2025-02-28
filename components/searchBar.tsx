import React, { Suspense, useEffect, useState } from "react";
import ModeToggle from "./modeToggle";
import TempToggle from "./tempToggle";

interface SearchBarProps {
    cityNameFake: string;
    setCityNameFake: (value: string) => void;
    setCityName: (value: string) => void;
    setCityNameFake2: (value: string) => void;
    onCityNameDisplayChange: (value: string) => void;
}

export default function SearchBar({ cityNameFake, setCityName, setCityNameFake2, onCityNameDisplayChange }: SearchBarProps) {
    const [inputValue, setInputValue] = useState(cityNameFake);

    useEffect(() => {
        setInputValue(cityNameFake);
    }, [cityNameFake]);

    const normalizeText = (text: string): string =>
        text
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('-');

    const handleSubmit = () => {
        const normalized = normalizeText(inputValue);
        setCityName(normalized);
        onCityNameDisplayChange(inputValue);
        setCityNameFake2(normalized);
    };

    return (
        <div className="flex gap-4 relative bg-background dark:bg-neutral-500/50 p-4 w-full md:rounded-xl">
            <div className="relative flex items-center w-full gap-2">
                <input
                    className="w-full border-2 border-slate-400/75 dark:border-neutral-500 p-3 rounded-full pl-4 dark:bg-neutral-500/50 placeholder:text-black/50 placeholder:dark:text-white/50"
                    placeholder="Esch-sur-Alzette"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
            </div>
            <ModeToggle />
            <TempToggle />
        </div>
    );
}