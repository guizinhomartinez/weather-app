"use client"

import { getHourlyWeather } from "@/components/getWeatherAPI";
import { Dot } from "lucide-react";
import { useQueryState } from "nuqs";
import { Suspense, useEffect, useState } from "react";
import { returnSVG } from "./customFunctions/returnSVG";

export const DailyForecast = ({ highTemp, lowTemp }: { highTemp: string, lowTemp: string }) => {
    const [cityName] = useQueryState("cityName", { defaultValue: "Esch-sur-Alzette" });
    const [hourlyHighOne, setHourlyHighOne] = useState("");
    const [hourlyHighTwo, setHourlyHighTwo] = useState("");
    const [hourlyHighThree, setHourlyHighThree] = useState("");
    const [hourlyLowOne, setHourlyLowOne] = useState("");
    const [hourlyLowTwo, setHourlyLowTwo] = useState("");
    const [hourlyLowThree, setHourlyLowThree] = useState("");
    const [timeOfDay] = useState("");
    const [weatherOne, setWeatherOne] = useState("");
    const [weatherTwo, setWeatherTwo] = useState("");
    const [weatherThree, setWeatherThree] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleTempUnitChange = async () => {
            setIsLoading(true);
            try {
                const result = await getHourlyWeather(cityName);
                if (result) {
                    const unit = localStorage.getItem('tempUnit') === "F" ? "°F" : "°C";
                    setHourlyHighOne(result.highOne + unit);
                    setHourlyHighTwo(result.highTwo + unit);
                    setHourlyHighThree(result.highThree + unit);

                    setHourlyLowOne(result.lowOne + unit);
                    setHourlyLowTwo(result.lowTwo + unit);
                    setHourlyLowThree(result.lowThree + unit);

                    setWeatherOne(result.weatherOne);
                    setWeatherTwo(result.weatherTwo);
                    setWeatherThree(result.weatherThree);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        handleTempUnitChange();
        window.addEventListener('storage', handleTempUnitChange);

        return () => {
            window.removeEventListener('storage', handleTempUnitChange);
        };
    }, [cityName]);

    return (
        <>
            <Suspense>
                <div className='ml-0.5 mb-6 text-2xl font-bold'>Next 3-day Forecast</div>
                <div className="flex flex-col w-full gap-2">
                    {!isLoading ? (
                        <>
                            <DailyForecastItems highTemp={hourlyHighOne} lowTemp={hourlyLowOne} index={1} timeOfDay={timeOfDay} weatherCode={weatherOne} />
                            <DailyForecastItems highTemp={hourlyHighTwo} lowTemp={hourlyLowTwo} index={2} timeOfDay={timeOfDay} weatherCode={weatherTwo} />
                            <DailyForecastItems highTemp={hourlyHighThree} lowTemp={hourlyLowThree} index={3} timeOfDay={timeOfDay} weatherCode={weatherThree} />
                        </>
                    ) : (
                        <>
                            <DailyForecastItems highTemp="" lowTemp="" index={1} timeOfDay="" weatherCode="" />
                            <DailyForecastItems highTemp="" lowTemp="" index={2} timeOfDay="" weatherCode="" />
                            <DailyForecastItems highTemp="" lowTemp="" index={3} timeOfDay="" weatherCode="" />
                        </>
                    )}
                </div>
            </Suspense >
        </>
    )
}

const DailyForecastItems = ({ highTemp, lowTemp, index, timeOfDay, weatherCode }: { highTemp: string, lowTemp: string, index: number, timeOfDay: string, weatherCode: string }) => {
    let indexStr = "";
    if (index === 1) {
        indexStr = "Today";
    } else if (index === 2) {
        indexStr = "Tomorrow";
    } else if (index === 3) {
        indexStr = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    }

    return (
        <div className="w-[98%] bg-accent dark:bg-neutral-500/50 p-4 rounded-xl px-4 select-none">
            <div className="flex w-full justify-between items-center gap-4">
                <div className="flex justify-center items-center gap-2">
                    {returnSVG(weatherCode, timeOfDay, window.innerWidth < 768 ? 48 : 64)}
                    <div className="relative">
                        <div>{indexStr}</div>
                        <div className="text-black/50 dark:text-white/50 text-ellipsis whitespace-nowrap -translate-y-1">{weatherCode}</div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-center whitespace-nowrap">{highTemp}</p>
                    <Dot />
                    <p className="text-center whitespace-nowrap">{lowTemp}</p>
                </div>
            </div>
        </div>
    )
}

