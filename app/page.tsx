"use client"
import { Suspense, useEffect, useState } from "react";
import * as React from "react";
import { useQueryState } from "nuqs";
import { MainSec } from "@/components/sections/mainSec";
import SearchBar from "@/components/searchBar";
import { getWeather } from "@/components/getWeatherAPI";

interface SearchWrapperProps {
  onCityChange: (city: string) => void;
  initialCity: string;
  onCityNameDisplayChange: (cityName: string) => void;
}

function SearchWrapper({ 
  onCityChange, 
  initialCity, 
  onCityNameDisplayChange 
}: SearchWrapperProps) {
  const [cityNameFake, setCityNameFake] = useState<string>("");
  const [cityNameFake2, setCityNameFake2] = useState<string>(initialCity);
  const [cityName, setCityName] = useQueryState("cityName", { defaultValue: initialCity });

  useEffect(() => {
    if (cityName === "") {
      setCityName(initialCity);
    } else {
      onCityChange(cityName);
    }
  }, [cityName, setCityName, initialCity, onCityChange]);

  return (
    <SearchBar
      cityNameFake={cityName}
      setCityNameFake={setCityNameFake}
      setCityName={setCityName}
      setCityNameFake2={setCityNameFake2}
      onCityNameDisplayChange={onCityNameDisplayChange}
    />
  );
}

interface WeatherData {
  temp: string;
  feelsLike: string;
  emoji: string;
  highest: string;
  lowest: string;
  time?: string;
  lastUpdate: string;
  areaName: string;
  countryName: string;
}

export default function Home() {
  const [latestUpdate, setLatestUpdate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [feelsLike, setFeelsLike] = useState<string>("");
  const [cityNameDisplay, setCityNameDisplay] = useState<string>("Esch-sur-Alzette");
  const [currentCity, setCurrentCity] = useState<string>("Esch-sur-Alzette");
  const [returnSVG, setReturnSVG] = useState<string>("");
  const [high, setHigh] = useState<string>("");
  const [low, setLow] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [tempsArray, setTempsArray] = useState<[string, string]>(["", ""]);
  const [areaName, setAreaName] = useState<string>("");
  const [countryName, setCountryName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleTempUnitChange = async () => {
      setIsLoading(true);
      try {
        const result = await getWeather(currentCity) as WeatherData | undefined;
        if (result) {
          const unit = localStorage.getItem('tempUnit') === "F" ? "°F" : "°C";
          setWeather(result.temp + unit);
          setFeelsLike("Feels like " + result.feelsLike + unit);
          setReturnSVG(result.emoji);
          setHigh(result.highest + unit);
          setLow(result.lowest + unit);
          setTime(result.time ?? "");
          setLatestUpdate(result.lastUpdate);
          setTempsArray([result.highest, result.lowest]);
          setAreaName(result.areaName);
          setCountryName(result.countryName);
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
  }, [currentCity]);

  return (
    <div className="flex flex-col m-0 md:m-2 transition-all duration-300 md:gap-2">
      <div className="flex justify-between items-center">
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchWrapper 
            initialCity="Esch-sur-Alzette"
            onCityChange={setCurrentCity}
            onCityNameDisplayChange={setCityNameDisplay}
          />
        </Suspense>
      </div>
      <MainSec
        lastUpdated={isLoading ? "" : latestUpdate}
        weather={isLoading ? "" : weather}
        feelsLike={isLoading ? "" : feelsLike}
        cityName={cityNameDisplay}
        returnedSVG={isLoading ? "" : returnSVG}
        high={isLoading ? "" : high}
        low={isLoading ? "" : low}
        timeOfDay={time}
        highs={isLoading ? "" : tempsArray[0]}
        lows={isLoading ? "" : tempsArray[1]}
        areaName={isLoading ? "" : areaName}
        countryName={isLoading ? "" : countryName}
      />
    </div>
  );
}