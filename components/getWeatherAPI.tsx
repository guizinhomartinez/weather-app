/* eslint-disable */ 
'use client'

const fetchWeatherData = async (city: string) => {
    const apiURL = `https://en.wttr.in/${city}?format=j1`;
    const response = await fetch(apiURL)
        .then(response => response.json())
        .catch(err => console.error(err));

    return response;
}

export const getWeather = async (city: string) => {
    const response = await fetchWeatherData(city);
    if (!response) return null;

    const { current_condition, nearest_area, weather } = response;
    const weatherData = current_condition[0];
    const areaName = nearest_area[0].areaName[0].value;
    const countryName = nearest_area[0].country[0].value;

    const tempUnit = typeof window !== 'undefined' ? localStorage.getItem('tempUnit') || "C" : "C";
    const isCelsius = tempUnit === "C";

    const temp = isCelsius ? weatherData.temp_C : weatherData.temp_F;
    const feelsLike = isCelsius ? weatherData.FeelsLikeC : weatherData.FeelsLikeF;
    const high = isCelsius ? weather[0].maxtempC : weather[0].maxtempF;
    const low = isCelsius ? weather[0].mintempC : weather[0].mintempF;

    const observationTime = weatherData.observation_time;
    const timeFormatted = observationTime.charAt(0) === '0' ? observationTime.substring(1) : observationTime;
    const isDay = (["12", "1", "2", "3", "4", "5"].some(hour => timeFormatted.startsWith(hour)) && timeFormatted.endsWith("PM"))
        || (["5", "6", "7", "8", "9", "10", "11"].some(hour => timeFormatted.startsWith(hour)) && timeFormatted.endsWith("AM"));

    return {
        temp,
        feelsLike,
        emoji: weatherData.weatherDesc[0].value,
        highest: high,
        lowest: low,
        time: isDay ? "day" : "night",
        lastUpdate: observationTime,
        areaName,
        countryName
    };
}

export const getHourlyWeather = async (city: string) => {
    const response = await fetchWeatherData(city);
    const tempUnit = typeof window !== 'undefined' ? localStorage.getItem('tempUnit') || "C" : "C";

    const maxtempCs = tempUnit === "C"
        ? response.weather.map((day: { maxtempC: number }) => day.maxtempC)
        : response.weather.map((day: { maxtempF: number }) => day.maxtempF);

    const mintempCs = tempUnit === "C"
        ? response.weather.map((day: { mintempC: number }) => day.mintempC)
        : response.weather.map((day: { mintempF: number }) => day.mintempF);

    const weatherDescs = response.weather.map((day: any) => day.hourly[0].weatherDesc[0].value);

    const result = {
        highOne: maxtempCs[0],
        highTwo: maxtempCs[1],
        highThree: maxtempCs[2],
        lowOne: mintempCs[0],
        lowTwo: mintempCs[1],
        lowThree: mintempCs[2],
        weatherOne: weatherDescs[0],
        weatherTwo: weatherDescs[1],
        weatherThree: weatherDescs[2]
    }
    return result;
}

export const getDailyWeather = async (city: string) => {
    const response = await fetchWeatherData(city);
    const tempUnit = typeof window !== 'undefined' ? localStorage.getItem('tempUnit') || "C" : "C";

    const hourlyData = response.weather[0].hourly.map((hour: any) => {
        const temp = tempUnit === "C" ? hour.tempC : hour.tempF;
        const feelsLike = tempUnit === "C" ? hour.FeelsLikeC : hour.FeelsLikeF;
        const time = hour.time.padStart(4, '0');
        const formattedTime = `${time.slice(0, 2)}:${time.slice(2)}`;

        return {
            time: formattedTime,
            temp: temp,
            feelsLike: feelsLike,
            weatherDesc: hour.weatherDesc[0].value,
            chanceOfRain: hour.chanceofrain,
            humidity: hour.humidity
        };
    });

    return hourlyData;
}

export const getSunRiseSet = async (city: string) => {
    const response = await fetchWeatherData(city);
    const sunRise = response.weather[0].astronomy[0].sunrise;
    const sunSet = response.weather[0].astronomy[0].sunset;

    return {
        sunRise: sunRise,
        sunSet: sunSet
    }
}