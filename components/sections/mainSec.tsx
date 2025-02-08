import { Skeleton } from "@/components/ui/skeleton"
import { returnSVG } from "./customFunctions/returnSVG"
import { DailyForecast } from "./dailyForecast"
import { HourlyForecast } from "./hourlyForecast"
import { SunriseStuff } from "./SunRiseAndSet"
import { Dot, ThermometerSnowflake, ThermometerSun } from "lucide-react"
import { useQueryState } from "nuqs"
import { useEffect, useState } from "react"

export function MainSec({ lastUpdated, weather, feelsLike, cityName, returnedSVG, high, low, timeOfDay, highs, lows, areaName, countryName }: { lastUpdated: string, weather: string, feelsLike: string, cityName: string, returnedSVG: string, high: string, low: string, timeOfDay: string, highs: string, lows: string, areaName: string, countryName: string }) {
    const [displayedCityName, setDisplayedCityName] = useState("");
    const [cityNameCool, setCityNameCool] = useQueryState("cityName", { defaultValue: "Esch-sur-Alzette" });
    useEffect(() => {
        if (cityNameCool !== null) {
            setDisplayedCityName(cityNameCool);
        }
    }, [cityNameCool])

    return (
        <>
            <main className="rounded-lg">
                <div className='flex flex-col md:flex-row md:gap-2'>
                    <div className='bg-background relative dark:bg-neutral-700 p-4 w-full md:w-[50vw] flex flex-col md:rounded-xl'>
                        <div className='ml-2 text-2xl font-bold inline-flex items-center gap-2'>Last updated: {showLastUpdated(lastUpdated)}</div>
                        {locationDiv(displayedCityName, areaName, countryName)}
                        <div className="flex gap-4 items-center h-full py-4">
                            {returnSVG(returnedSVG, timeOfDay, 135)}
                            <ShowMainWeather weather={weather} feelsLike={feelsLike} high={high} low={low} returnedSVG={returnedSVG} />
                        </div>
                    </div>

                    <div className='bg-background relative dark:bg-neutral-700 p-4 pb-6 w-full md:w-[50vw] pt-12 md:pt-4 md:rounded-xl'>
                        <DailyForecast highTemp={highs} lowTemp={lows} />
                    </div>
                </div>
                <div className='bg-background relative dark:bg-neutral-700 p-4 pb-6 w-full pt-12 md:pt-4 md:mt-2 md:rounded-xl'>
                    <HourlyForecast />
                </div>
                <div className='bg-background relative dark:bg-neutral-700 p-4 pb-6 w-full pt-12 md:pt-4 md:mt-2 md:rounded-xl'>
                    <div className="ml-1 text-2xl font-bold">Astronomy</div>
                    <SunriseStuff />
                </div>
            </main>
        </>
    )
}

const locationDiv = (displayedCityName: string, areaName: string, countryName: string) => {
    if (window.innerWidth < 768) {
        return (
            <>
                <div className='ml-2 text-lg font-bold text-primary/50'>{displayedCityName}</div>
                <div className='text-md text-primary/25'>{showCityCountryToo(areaName, countryName)}</div>
            </>
        )
    } else {
        return <div className='ml-2 text-lg font-bold text-primary/50 inline-flex items-center flex-wrap whitespace-pre-wrap'>{displayedCityName} <Dot className="-mr-2" /> {showCityCountryToo(areaName, countryName)}</div>
    }
}

const showCityCountryToo = (city: any, country: any) => {
    if (!city && !country) {
        return (
            <>
                <Skeleton className="ml-2 w-32 h-6" />
                <Skeleton className="ml-2 w-32 h6" />
            </>
        )
    } else {
        return (
            <>
                <div className="ml-2 text-lg font-bold text-primary/30 inline-flex items-center">{city},</div>
                <div className="ml-2 text-lg font-bold text-primary/30 inline-flex items-center">{country}</div>
            </>
        )
    }
}

const ShowMainWeather = ({ weather, feelsLike, high, low, returnedSVG }: { weather: string, feelsLike: string, high: string, low: string, returnedSVG: string }) => {
    return (
        <>
            <div className='flex flex-col mt-4'>
                {weather && feelsLike && high && low ?
                    <div>
                        <div className="flex flex-col md:flex-row gap-6 md:items-center">
                            <div className='text-6xl font-black'>{weather}</div>
                            <div>
                                <div className='text-2xl font-medium text-primary/50'>{feelsLike}</div>
                                <div className="text-lg text-primary/25">{returnedSVG}</div>
                            </div>
                        </div>
                        <div className="text-lg mt-4 inline-flex items-center gap-2"><ThermometerSun /> {high} <Dot className="-mx-2" /> <ThermometerSnowflake /> {low}</div>
                    </div>
                    :
                    <div className="flex gap-4 items-center -translate-y-5 my-12">
                        <Skeleton className='h-40 w-40 -translate-x-2' />
                        <div className="">
                            <div className="flex flex-col md:flex-row gap-6 md:items-center">
                                <Skeleton className='h-20 w-36' />
                                <div className="flex flex-col gap-2">
                                    <Skeleton className='h-8 w-48' />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-48 mt-8" />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

const showLastUpdated = (lastUpdated: any) => {
    if (!lastUpdated) {
        return <Skeleton className="w-32 h-6" />
    } else {
        return <div className='text-2xl font-bold'>{lastUpdated}</div>
    }
}