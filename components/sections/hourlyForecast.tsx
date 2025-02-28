"use client"

import { getDailyWeather } from "@/components/getWeatherAPI";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryState } from "nuqs";
import { Suspense, useEffect, useState } from "react";
import { returnSVG } from "./customFunctions/returnSVG";
import { Droplet } from "lucide-react";

interface HourlyData {
    time: string;
    temp: string;
    feelsLike: string;
    weatherDesc: string;
    chanceOfRain: string;
    humidity: string;
}

export const HourlyForecast = () => {
    const [cityName] = useQueryState("cityName", { defaultValue: "Esch-sur-Alzette" });
    const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleTempUnitChange = async () => {
            setIsLoading(true);
            try {
                if (cityName) {
                    const data = await getDailyWeather(cityName);
                    setHourlyData(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        handleTempUnitChange();

        // Atualiza a cada 5 minutos
        const interval = setInterval(handleTempUnitChange, 5 * 60 * 1000);

        window.addEventListener('storage', handleTempUnitChange);

        return () => {
            window.removeEventListener('storage', handleTempUnitChange);
            clearInterval(interval);
        };
    }, [cityName]);

    return (
        <Suspense>
            <div className="w-full">
                <div className="ml-0.5 mb-6 text-2xl font-bold">Forecast of Today</div>
                <div className="flex overflow-x-auto pb-4 gap-4">
                    {!isLoading && hourlyData.length > 0 ? (
                        hourlyData.map((hour, index) => (
                            <HourlyItem key={index} data={hour} />
                        ))
                    ) : (
                        Array(8).fill(0).map((_, index) => (
                            <HourlyItemSkeleton key={index} />
                        ))
                    )}
                </div>
            </div>
        </Suspense>
    );
};

const HourlyItem = ({ data }: { data: HourlyData }) => {
    const unit = localStorage.getItem('tempUnit') === "F" ? "°F" : "°C";

    const hour = parseInt(data.time.split(':')[0]);
    const time = (hour >= 18 || hour < 6) ? "night" : "day";
    let displayedTime = "";
    if (hour === 12)
        displayedTime = `${hour}:00 PM`
    if (hour < 12)
        displayedTime = `0${hour}:00 AM`
    else if (hour > 12)
        displayedTime = `${hour}:00 PM`

    return (
        <div className="flex flex-col items-center shrink-0 bg-accent/50 dark:bg-neutral-500/50 p-4 rounded-xl select-none box-border w-36">
            <div className="text-sm font-medium text-black/50 dark:text-white/50">{displayedTime}</div>
            <div className="my-2">{returnSVG(data.weatherDesc, time, 48)}</div>
            <div className="text-lg font-bold">{data.temp.toString().charAt(1) === '0' ? data.temp.toString().substring(1) : data.temp}{unit}</div>
            {/* <div>{data.weatherDesc}</div> */}
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
                Feels: {data.feelsLike}{unit}
            </div>
            <div className="text-xs mt-2">
                <div className="text-center inline-flex items-center justify-center translate-x-4 gap-1"><Droplet className="size-4 antialiased" />{data.chanceOfRain}%</div>
                <div className="text-center">Humidity: {data.humidity}%</div>
            </div>
        </div>
    );
};

const HourlyItemSkeleton = () => {
    return (
        <div className="flex flex-col items-center w-32 bg-accent/50 dark:bg-neutral-500/50 p-4 rounded-xl gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-20" />
            <div className="flex flex-col gap-1 mt-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
    );
}; 