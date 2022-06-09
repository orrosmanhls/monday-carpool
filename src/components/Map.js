import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import {
	getCoordinates,
	getAllAddresses,
	calculatePointsDistance,
} from '../helpers/locations';
import L from 'leaflet';

// fix react-leaflet not showing marker assets
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import '../styles/Map.css';

function Map({ startCoordinates, targetCoordinates, distance }) {
	const [addresses, setAddresses] = useState([]);

	useEffect(() => {
		const updateAddresses = async () => {
			const allAddresses = await getAllAddresses();

			const allAddressesCoordinates = await Promise.all(
				allAddresses.map((address) =>
					(async function () {
						const data = await getCoordinates(address);
						if (data[0]?.lat && data[0]?.lon) {
							const addressCoordinates = [data[0].lat, data[0].lon];
							const distanceFromStartAddress = calculatePointsDistance(
								addressCoordinates,
								startCoordinates
							);

							return distanceFromStartAddress < distance / 1000 // convert radius from meters to kilometers
								? addressCoordinates
								: null;
						}
					})()
				)
			);

			const filteredAddressesCoordinates = allAddressesCoordinates.filter(
				(coordinate) => {
					return coordinate !== undefined && coordinate !== null;
				}
			);

			setAddresses(filteredAddressesCoordinates);
		};

		updateAddresses();
	}, [startCoordinates]);

	// fix react-leaflet not showing marker assets
	let DefaultIcon = L.icon({
		iconUrl: icon,
		shadowUrl: iconShadow,
	});

	L.Marker.prototype.options.icon = DefaultIcon;
	return (
		// TODO: map 'center' attribute not changing (update is visible in marker and circle)
		<MapContainer center={startCoordinates} zoom={12}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{/* distance radius of possible drives */}
			<Circle
				center={startCoordinates}
				pathOptions={{ fillColor: 'blue' }}
				radius={distance}
			/>

			<Marker position={startCoordinates}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
			<Marker position={targetCoordinates}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
			{addresses.map((address) => {
				if (address) {
					return (
						<Marker key={address} position={address}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
								<br />
								{address[0]}, {address[1]}
							</Popup>
						</Marker>
					);
				} else {
					return null;
				}
			})}
		</MapContainer>
	);
}

export default Map;
