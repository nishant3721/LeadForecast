import React from "react";
import { useEffect, useState } from "react";
import location from "./location.png";
import wind from "./wind.png";
import visibility from "./visibility.png";
import humidity from "./humidity.png";

export default function CurrentWeather() {
  const [newdata, setnewdata] = useState("");
  const [lati, setlati] = useState("30");
  const [long, setlong] = useState("75");
  const [inputData, setinputData] = useState("");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setlati(position.coords.latitude);
        setlong(position.coords.longitude);

        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=b368c2d17b8026e7fb04daa9f5a049cf`
        )
          .then((res) => res.json())

          .then((res) => {
            let allData = {
              weather: Math.floor(res.main.temp - 273),

              weather_Feedback: res.weather[0].description,

              weather_image: res.weather[0].icon,

              weather_Location_City: res.name,

              weather_Location_Country: res.sys.country,
              weather_FeelsLike: Math.floor(res.main.feels_like - 273),
              weather_Humidity: res.main.humidity,
              weather_Wind: res.wind.speed,
              weather_Visibility: res.visibility,
            };
            setnewdata(allData);
          });
      });
    }
  }, [lati, long]);
  const changeLocation = (value) => {
    setinputData(value);
  };
  const changeWeather = (event) => {
    event.preventDefault();
    console.log(`hello`);

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${inputData}&appid=b368c2d17b8026e7fb04daa9f5a049cf`
    )
      .then((res) => res.json())
      .then((res) => {
        let allData = {
          weather: Math.floor(res.main.temp - 273),

          weather_Feedback: res.weather[0].description,

          weather_image: res.weather[0].icon,
          weather_Location_City: res.name,

          weather_Location_Country: res.sys.country,
          weather_FeelsLike: Math.floor(res.main.feels_like - 273),
          weather_Humidity: res.main.humidity,
          weather_Wind: res.wind.speed,
          weather_Visibility: res.visibility,
        };
        setnewdata(allData);
      });
  };

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
          onChange={(e) => {
            changeLocation(e.target.value);
          }}
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          onClick={(e) => changeWeather(e)}
        >
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
            <img src={location} alt="{weat}" /> {newdata.weather_Location_City},
            {newdata.weather_Location_Country}
          </p>
          <h1 className="card-title">
            {newdata.weather} °C{" "}
            <img
              src={`http://openweathermap.org/img/w/${newdata.weather_image}.png`}
              alt="icon"
            />
          </h1>
          <h5 className="card-text"> {newdata.weather_Feedback} </h5>
          <p className="card-text">Feels Like {newdata.weather_FeelsLike} °C</p>
          <p className="card-text">
            <small className="text-muted">Last updated</small>
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
              <img src={visibility} alt="..." /> {newdata.weather_Visibility} m
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
