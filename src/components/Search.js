import React from 'react';

import "../styles/Search.css";
import TimePicker from "./TimePicker";

const Search = ({
  setStartAddress,
  setTargetAddress,
  distance,
  setDistance,
  officeDepartureStart,
  setOfficeDepartureStart,
  officeDepartureEnd,
  setOfficeDepartureEnd,
  homeDepartureStart,
  setHomeDepartureStart,
  homeDepartureEnd,
  setHomeDepartureEnd,
}) => {
  const handleSearch = (event) => {
    setStartAddress(
      event.target.parentNode.querySelector(".search-from").value
    );
    setTargetAddress(event.target.parentNode.querySelector(".search-to").value);
  };

  const handleRangeChange = (e) => {
    e.preventDefault();
    setDistance(e.target.value);
  };
  return (
    <form className="container">
      <label htmlFor="from">From: </label>
      <input
        type="text"
        name="from"
        className="search-from"
        placeholder="Search for address"
      />
      <br />
      <label htmlFor="to">To: </label>
      <input
        type="text"
        name="to"
        className="search-to"
        placeholder="Search for address"
      />
      <br />

      <input
        type="range"
        name="distance"
        max="10000"
        min="500"
        step="100"
        value={distance}
        onChange={handleRangeChange}
      />

      <span>Distance radius: {distance / 1000} km</span>
      <br />
      <TimePicker
        officeDepartureStart={officeDepartureStart}
        officeDepartureEnd={officeDepartureEnd}
        setOfficeDepartureStart={setOfficeDepartureStart}
        setOfficeDepartureEnd={setOfficeDepartureEnd}
        homeDepartureStart={homeDepartureStart}
        homeDepartureEnd={homeDepartureEnd}
        setHomeDepartureStart={setHomeDepartureStart}
        setHomeDepartureEnd={setHomeDepartureEnd}
      />
      <input type="button" value="Search" onClick={handleSearch} />
    </form>
  );
};
export default Search;
