import React, { useEffect, useState } from "react";

function weather() {
  const [city, setCity] = useState("tokyo");
  const [fetchWeather, setFetchWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      if (!city) {
        throw new Error("City name is required");
      }

      const response = await fetch(`/api/weather?city=${city}`);
      if (!response.ok) {
        console.log("fetch miss error");
        throw new Error("error fetching");
      }

      const weatherData = await response.json();
      setFetchWeather(weatherData);
    } catch (err) {
      setError(err.message);
    }
  };

  //console.log(city);
  //console.log(JSON.stringify(fetchWeather, null, 2));
  //console.log(fetchWeather?.data.weather[0].icon);

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      <div className="h-9xl">
        <div className="w-full bg-gradient-to-br from-[#62b8f5] to-[#4475ef] ">
          <div className="pt-6 bg-white bg-opacity-10 w-full backdrop-blur-md p-12 px-7 border-2-white rounded-lg shadow-lg text-center border-gray-400 shadow-[0_1.8em_3.7em_rgba(3,46,87,0.2)]">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="text-gray-600 w-1/2 leading-8 rounded-xl pl-3 my-break-point:rounded-xl my-break-point:pl-3 my-break-point:leading-9 my-break-point:text-gray-600"
              placeholder="city name"
            />
            <button
              className="inline bg-white ml-3 py-1 text-gray-600"
              onClick={getWeather}
            >
              Search
            </button>

            {error && <p>Error: {error}</p>}

            <div className="w-full ">
              <h2 className="text-5xl text-white opacity-100 mt-6 tracking-wider font-bold">
                {fetchWeather?.data.name}
              </h2>
              <h4 className="m-4 text-white text-3xl opacity-80">
                {fetchWeather?.data.weather[0].main}
              </h4>
              <h4 className="m-1 text-white text-3xl opacity-80">
                {fetchWeather?.data.weather[0].description}
              </h4>
              <img
                className="m-auto w-2/5 aspect-auto"
                src={`https://openweathermap.org/img/w/${fetchWeather?.data.weather[0].icon}.png`}
              />
              <h4 className="text-white font-bold text-3xl">
                {fetchWeather?.data.main.temp}&#176;C
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default weather;
