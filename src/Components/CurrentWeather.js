import React from "react";

export default function CurrentWeather() {
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
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
  );
}
