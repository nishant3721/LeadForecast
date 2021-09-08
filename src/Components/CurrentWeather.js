import React from "react";
import { useEffect, useState } from "react";
import location from "./location.png";

export default function CurrentWeather() {
  const [state, setState] = useState({
    weather: null,
    weather_Update: null,
    weather_Feedback: null,
    weather_image: null,
    weather_Location_City: null,
    weather_Location_State: null,
    weather_Location_Country: null,
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
      weather_Location_City: parsedData.location.name,
      weather_Location_State: parsedData.location.region,
      weather_Location_Country: parsedData.location.country,
    });
  };

  useEffect(() => {
    updateWeather();
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: "60%",
      }}
      className="my-3"
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
      <div className="my-2 card bg-dark text-light">
        <img
          src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1557323760/weather.svg"
          className="card-img"
          alt="..."
        />
        <div className="card-img-overlay">
          <p className="card-title">
            <img src={location} alt="Something went wrong" />{" "}
            {state.weather_Location_City}, {state.weather_Location_State},{" "}
            {state.weather_Location_Country}
          </p>
          <h1 className="mt-5 card-title">
            {state.weather} °C{" "}
            <img src={state.weather_image} alt="Something went wrong" />
          </h1>
          <p className="card-text"> {state.weather_Feedback} </p>
          <p className="card-text">
            <small class="text-muted">
              Last updated {state.weather_Update}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}
