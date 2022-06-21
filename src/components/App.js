import React, { useState, useEffect } from 'react';
// import '../styles/App.css';
import mondaySdk from 'monday-sdk-js';
import 'monday-ui-react-core/dist/main.css';
//Explore more Monday React Components here: https://style.monday.com/
import Map from './Map';
import Search from './Search';

import { getCoordinates } from '../helpers/locations';

const monday = mondaySdk();

const App = () => {
	const [startCoordinates, setStartCoordinates] = useState([32.07, 34.8]);
	const [targetCoordinates, setTargetCoordinates] = useState([32.07, 34.8]);
	const [startAddress, setStartAddress] = useState('yael rom 4, petah tikva');
	const [targetAddress, setTargetAddress] = useState('Har Sinai 1,Tel Aviv');
	const [distance, setDistance] = useState(1500);
	const [officeDepartureStart, setOfficeDepartureStart] = useState("07:30");
  const [officeDepartureEnd, setOfficeDepartureEnd] = useState("10:00");
  const [homeDepartureStart, setHomeDepartureStart] = useState("17:00");
  const [homeDepartureEnd, setHomeDepartureEnd] = useState("19:00");

	useEffect(() => {
		const updateCoordinates = async (address, setCoordinates) => {
			const tempCoordinates = await getCoordinates(address);
			setCoordinates([tempCoordinates[0].lat, tempCoordinates[0].lon]);
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
