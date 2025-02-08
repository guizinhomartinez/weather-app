"use client"

import { useEffect, useState } from "react";
import * as React from "react"
import { useQueryState } from "nuqs";
import { MainSec } from "@/components/sections/mainSec";
import SearchBar from "@/components/searchBar"
import { getWeather } from "@/components/getWeatherAPI";

export default function Home() {
  const [latestUpdate, setLatestUpdate] = useState("");
  const [weather, setWeather] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [cityName, setCityName] = useQueryState("cityName", { defaultValue: "Esch-sur-Alzette" });
  const [cityNameFake, setCityNameFake] = useState("");
  const [cityNameDisplay, setCityNameDisplay] = useState("Esch-sur-Alzette");
  const [cityNameFake2, setCityNameFake2] = useState("Esch-sur-Alzette");
  const [returnSVG, setReturnSVG] = useState("");
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [time, setTime] = useState("");
  const [tempsArray, setTempsArray] = useState(["", ""]);
  const [areaName, setAreaName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cityName === "") {
      setCityName(`Esch-sur-Alzette`);
    }
  }, [cityName, setCityName]);

  useEffect(() => {
    const handleTempUnitChange = async () => {
      setIsLoading(true);
      try {
        const result = await getWeather(cityName);
        if (result) {
          const unit = localStorage.getItem('tempUnit') === "F" ? "°F" : "°C";
          setWeather(result.temp + unit);
          setFeelsLike("Feels like " + result.feelsLike + unit);
          setReturnSVG(result.emoji);
          setHigh(result.highest + unit);
          setLow(result.lowest + unit);
          setTime(result.time ?? "");
          setLatestUpdate(result.lastUpdate);
          setTempsArray([...tempsArray.slice(0, 0), result.highest, result.lowest]);
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
  }, [cityName]);

  return (
    <>
      <div className="flex flex-col m-0 md:m-2 transition-all duration-300 md:gap-2">
        <div className="flex justify-between items-center">
          <SearchBar
            cityNameFake={cityName}
            setCityNameFake={setCityNameFake}
            setCityName={setCityName}
            setCityNameFake2={setCityNameFake2}
            onCityNameDisplayChange={setCityNameDisplay}
          />
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
    </>
  );
}