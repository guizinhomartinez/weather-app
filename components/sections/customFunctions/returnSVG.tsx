import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"

export function returnSVG(e: string, t: string, size:number = 128) {
    var returnedVal;
    const timeOfDay = t === "day" ? "day" : "night";
    
    switch (e.trim().toLowerCase()) {
        case "light rain":
            returnedVal = <div className=""><Image src="/weather-icons/cloudy_with_rain_light.svg" alt={e} width={size} height={size} /></div>;
            break;
        case "rain":
        case "light rain shower":
            returnedVal = <div className=""><Image src="/weather-icons/showers_rain.svg" alt={e} width={size} height={size} /></div>;
            break;
        case "clear":
            returnedVal = <div className=""><Image src={`/weather-icons/clear_${timeOfDay}.svg`} alt={e} width={size} height={size} /></div>;
            break;
        case "partly cloudy":
            returnedVal = <div className=""><Image src={`/weather-icons/partly_cloudy_${timeOfDay}.svg`} alt={e} width={size} height={size} /></div>;
            break;
        case "sunny":
            returnedVal = <div className=""><Image src={`/weather-icons/clear_${timeOfDay}.svg`} alt={e} width={size} height={size} /></div>;
            break;
        case "mist":
            returnedVal = <div className=""><Image src={`/weather-icons/cloudy.svg`} alt={e} width={size} height={size} /></div>;
            break;
        case "overcast":
        case "cloudy":
            returnedVal = <div className=""><Image src={`/weather-icons/cloudy.svg`} alt={e} width={size} height={size} /></div>;
            break;
        case "patchy light rain":
        case "patchy rain nearby":
            returnedVal = <div className=""><Image src={`/weather-icons/rain_with_sunny_light.svg`} alt={e} width={size} height={size} /></div>;
            break;
        case "fog":
            returnedVal = <div className=""><Image src={`/weather-icons/haze_fog_dust_smoke.svg`} alt={e} width={size} height={size} /></div>;
            break;
        case "patchy light drizzle":
        case "light drizzle":
            returnedVal = <div className=""><Image src={`/weather-icons/drizzle.svg`} alt={e} width={size} height={size} /></div>;
            break;
        case "light snow":
            returnedVal = <div className=""><Image src={`/weather-icons/cloudy_with_snow_light.svg`} alt={e} width={size} height={size} /></div>;
            break;
        case "freezing fog":
            returnedVal = <div className=""><Image src={`/weather-icons/haze_fog_dust_smoke.svg`} alt={e} width={size} height={size} /></div>;
            break;
        case "moderate snow":
            returnedVal = <div className=""><Image src={`/weather-icons/showers_snow.svg`} alt={e} width={size} height={size} /></div>;
            break;
        default:
            returnedVal = (
                <div className="">
                    <Skeleton className={`h-${size/4} w-${size/4} rounded-xl`} />
                </div>
            );
            break;
    }
    return returnedVal;
}