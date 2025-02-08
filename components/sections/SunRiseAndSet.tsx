"use client"

import { getSunRiseSet } from "@/components/getWeatherAPI";
import { Sunrise, Sunset } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SunriseStuff = () => {
    const [cityName, setCityName] = useQueryState("cityName", { defaultValue: "Esch-sur-Alzette" });
    const [sunRise, setSunRise] = useState("");
    const [sunSet, setSunSet] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getSunRiseSet(cityName);
                setSunRise(data.sunRise);
                setSunSet(data.sunSet);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [cityName]);

    return (
        <div className="flex justify-around items-center mt-4">
            {!isLoading ? (
                <>
                    <div className="flex flex-col items-center">
                        <Sunrise className="size-[4.75em]" />
                        <div className="text-lg">Sunrise</div>
                        <div className="text-2xl font-bold">{sunRise}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <Sunset className="size-[4.75em]" />
                        <div className="text-lg">Sunset</div>
                        <div className="text-2xl font-bold">{sunSet}</div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="size-[4.75em]" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="size-[4.75em]" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                </>
            )}
        </div>
    );
};