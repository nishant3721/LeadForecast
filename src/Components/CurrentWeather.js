import React from "react";
import { useEffect, useState } from "react";
import location from "./location.png";
import wind from "./wind.png";
import visibility from "./visibility.png";
import humidity from "./humidity.png";

export default function CurrentWeather() {
  // const [state, setState] = useState({
  //   weather: null,
  //   weather_Update: null,
  //   weather_Feedback: null,
  //   weather_image: null,
  //   weather_Location_City: null,
  //   weather_Location_State: null,
  //   weather_Location_Country: null,
  //   weather_FeelsLike: null,
  //   weather_Humidity: null,
  //   weather_Wind: null,
  //   weather_Visibility: null,
  //   long: 40,
  //   lat: 30,
  // });

  const [newdata, setnewdata] = useState("bathinda");
  const [lati, setlati] = useState(20);
  const [long, setlong] = useState(50);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setlati(position.coords.latitude);
        setlong(position.coords.longitude);

        fetch(
          `http://api.weatherstack.com/current?access_key=53f4ed0ce41f387bef450f839f69ec9b&query=${lati},${long}`
        )
          .then((res) => res.json())

          .then((res) => {
            let allData = {
              weather: res.current.temperature,
              weather_Update: res.current.observation_time,
              weather_Feedback: res.current.weather_descriptions,
              weather_image: res.current.weather_icons,
              weather_Location_City: res.location.name,
              weather_Location_State: res.location.region,
              weather_Location_Country: res.location.country,
              weather_FeelsLike: res.current.feelslike,
              weather_Humidity: res.current.humidity,
              weather_Wind: res.current.wind_speed,
              weather_Visibility: res.current.visibility,
            };
            setnewdata(allData);
          });
      });
    }
  }, [long, lati]);

  // const updateWeather = async () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setState({
  //       lat: position.coords.latitude,
  //       long: position.coords.longitude,
  //     });
  //   });
  //   const url = `https://api.weatherapi.com/v1/current.json?key=2bd5b807986a48c8b8d132658210809&q=${lat},${long}&aqi=no`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  // setState({
  //   weather: parsedData.current.temp_c,
  //   weather_Update: parsedData.current.last_updated,
  //   weather_Feedback: parsedData.current.condition.text,
  //   weather_image: parsedData.current.condition.icon,
  //   weather_Location_City: parsedData.location.name,
  //   weather_Location_State: parsedData.location.region,
  //   weather_Location_Country: parsedData.location.country,
  //   weather_FeelsLike: parsedData.current.feelslike_c,
  //   weather_Humidity: parsedData.current.humidity,
  //   weather_Wind: parsedData.current.wind_kph,
  //   weather_Visibility: parsedData.current.vis_km,
  // });

  // useEffect(() => {
  //   updateWeather();
  // }, []);

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
            <img src={location} alt="..." /> {newdata.weather_Location_City},{" "}
            {newdata.weather_Location_State}, {newdata.weather_Location_Country}
          </p>
          <h1 className="card-title">
            {newdata.weather} °C <img src={newdata.weather_image} alt="..." />
          </h1>
          <h5 className="card-text"> {newdata.weather_Feedback} </h5>
          <p className="card-text">Feels Like {newdata.weather_FeelsLike} °C</p>
          <p className="card-text">
            <small className="text-muted">
              Last updated {newdata.weather_Update}
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
              <img src={humidity} alt="..." /> {newdata.weather_Humidity} %
            </p>
            <p className="my-4 card-text">
              <img src={wind} alt="..." /> {newdata.weather_Wind} Kph
            </p>
            <p className="card-text">
              <img src={visibility} alt="..." /> {newdata.weather_Visibility} Km
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
