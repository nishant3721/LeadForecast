import React from "react";
import "./App.css";
import CurrentWeather from "./Components/CurrentWeather";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <>
      <Navbar title="LeadForecast" />
      <CurrentWeather />
    </>
  );
}

export default App;
