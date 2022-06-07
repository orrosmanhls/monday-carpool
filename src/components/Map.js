import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

// fix react-leaflet not showing marker assets
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import '../styles/Map.css';

function Map({ startCoordinates, targetCoordinates, distance }) {
	// console.log({ start: startCoordinates }, { target: targetCoordinates });
	useEffect(() => {}, [startCoordinates]);
	// fix react-leaflet not showing marker assets
	let DefaultIcon = L.icon({
		iconUrl: icon,
		shadowUrl: iconShadow,
	});

	L.Marker.prototype.options.icon = DefaultIcon;
	return (
		// TODO: map 'center' attribute not changing (update is visible in marker and circle)
		<MapContainer center={startCoordinates} zoom={12} scrollWheelZoom={false}>
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
		</MapContainer>
	);
}

export default Map;
