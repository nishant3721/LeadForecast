import React from "react";
import { useEffect, useState } from "react";

export default function CurrentWeather() {
  const [state, setState] = useState({
    weather: null,
    weather_Update: null,
    weather_Feedback: null,
    weather_image: null,
  });

  const updateWeather = async () => {
    const url =
      "https://api.weatherapi.com/v1/current.json?key=2bd5b807986a48c8b8d132658210809&q=Bijnor&aqi=no";
    let data = await fetch(url);
    let parsedData = await data.json();
    setState({
      weather: parsedData.current.temp_c,
      weather_Update: parsedData.current.last_updated,
      weather_Feedback: parsedData.current.condition.text,
      weather_image: parsedData.current.condition.icon,
    });
  };

  useEffect(() => {
    updateWeather();
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: "40%",
      }}
      className="my-5"
    >
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Find Location"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Check!
        </button>
      </form>

      <div class="my-3 card bg-light text-dark">
        <img
          src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1557323760/weather.svg"
          class="card-img"
          alt="..."
        />
        <div class="card-img-overlay">
          <h1 class="card-title">
            <img src={state.weather_image} alt="Something went wrong" />{" "}
            {state.weather} °C{" "}
          </h1>
          <p class="card-text"> {state.weather_Feedback} </p>
          <p class="card-text">Last updated {state.weather_Update} </p>
        </div>
      </div>
    </div>
  );
}
