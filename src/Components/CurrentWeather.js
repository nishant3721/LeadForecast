import React from "react";
import { useEffect, useState } from "react";
import location from "./location.png";
import wind from "./wind.png";
import visibility from "./visibility.png";
import humidity from "./humidity.png";

export default function CurrentWeather() {
  const [state, setState] = useState({
    weather: null,
    weather_Update: null,
    weather_Feedback: null,
    weather_image: null,
    weather_Location_City: null,
    weather_Location_State: null,
    weather_Location_Country: null,
    weather_FeelsLike: null,
    weather_Humidity: null,
    weather_Wind: null,
    weather_Visibility: null,
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
      weather_FeelsLike: parsedData.current.feelslike_c,
      weather_Humidity: parsedData.current.humidity,
      weather_Wind: parsedData.current.wind_kph,
      weather_Visibility: parsedData.current.vis_km,
    });
  };

  useEffect(() => {
    updateWeather();
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
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
          <p className="text-end card-title">
            <img src={location} alt="..." /> {state.weather_Location_City},{" "}
            {state.weather_Location_State}, {state.weather_Location_Country}
          </p>
          <h1 className="card-title">
            {state.weather} °C <img src={state.weather_image} alt="..." />
          </h1>
          <h5 className="card-text"> {state.weather_Feedback} </h5>
          <p className="card-text">Feels Like {state.weather_FeelsLike} °C</p>
          <p className="card-text">
            <small className="text-muted">
              Last updated {state.weather_Update}
            </small>
          </p>
          <div
            style={{
              position: "absolute",
              left: "37%",
              top: "15%",
            }}
          >
            <p className="card-text">
              <img src={humidity} alt="..." /> {state.weather_Humidity} %
            </p>
            <p className="my-4 card-text">
              <img src={wind} alt="..." /> {state.weather_Wind} Kph
            </p>
            <p className="card-text">
              <img src={visibility} alt="..." /> {state.weather_Visibility} Km
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
