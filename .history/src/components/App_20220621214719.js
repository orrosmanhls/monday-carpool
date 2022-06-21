import React, { useState, useEffect } from "react";
// import '../styles/App.css';
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import Map from "./Map";
import Search from "./Search";

import { getCoordinates } from "../helpers/locations";

const App = () => {
  const [startCoordinates, setStartCoordinates] = useState([32.07, 34.8]);
  const [targetCoordinates, setTargetCoordinates] = useState([32.07, 34.8]);
  const [startAddress, setStartAddress] = useState("yael rom 4, petah tikva");
  const [officeDepartureStart, setOfficeDepartureStart] = useState("07:30");
  const [officeDepartureEnd, setOfficeDepartureEnd] = useState("10:00");
  const [homeDepartureStart, setHomeDepartureStart] = useState("17:00");
  const [homeDepartureEnd, setHomeDepartureEnd] = useState("19:00");

  //TODO: Extract the address of the office as part of the on boarding
  const [targetAddress, setTargetAddress] = useState("Har Sinai 1,Tel Aviv"); // The address of the office
  const [distance, setDistance] = useState(1500);

  useEffect(() => {
    const updateCoordinates = async (address, setCoordinates) => {
      const tempCoordinates = await getCoordinates(address);
      console.log("url", tempCoordinates);
      setCoordinates([tempCoordinates[0]?.lat, tempCoordinates[0]?.lon]);
    };

    updateCoordinates(startAddress, setStartCoordinates);
    updateCoordinates(targetAddress, setTargetCoordinates);
  }, [startAddress, targetAddress]);

  return (
    <>
      <Search
        setStartAddress={setStartAddress}
        setTargetAddress={setTargetAddress}
        distance={distance}
        setDistance={setDistance}
        officeDepartureStart={officeDepartureStart}
        setOfficeDepartureStart={setOfficeDepartureStart}
        officeDepartureEnd={officeDepartureEnd}
        setOfficeDepartureEnd={setOfficeDepartureEnd}
        homeDepartureStart={homeDepartureStart}
        setHomeDepartureStart={setHomeDepartureStart}
        homeDepartureEnd={homeDepartureEnd}
        setHomeDepartureEnd={setHomeDepartureEnd}
      />
      <Map
        startCoordinates={startCoordinates}
        targetCoordinates={targetCoordinates}
        distance={distance}
      />
    </>
  );
};

export default App;
