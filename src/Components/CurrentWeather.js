import React from "react";

export default function CurrentWeather() {
  return (
    <div className="my-5 container">
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Another location"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Check!
        </button>
      </form>
    </div>
  );
}
