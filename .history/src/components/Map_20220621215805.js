import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import {
  getCoordinates,
  getAllAddresses,
  calculatePointsDistance,
  filterAddressesByDistance,
  getAllColumns,
} from "../helpers/locations";
import Tooltip from "./Tooltip";
import L from "leaflet";

// fix react-leaflet not showing marker assets
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import "../styles/Map.css";

function Map({ startCoordinates, targetCoordinates, distance }) {
  const [allAddresses, setAllAddresses] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const data = await getAllColumns();
      setAllData(data);
    };
    fetchAllData();

    const updateAddresses = async () => {
      const allAddresses = await getAllAddresses();

      const allAddressesCoordinates = await Promise.all(
        allAddresses.map((address) =>
          (async function () {
            // const data = await getCoordinates(address);
            // return data[0]?.lat && data[0]?.lon
            //   ? [data[0].lat, data[0].lon]
            //   : null;
          })()
        )
      );

      const filteredAddressesCoordinates = allAddressesCoordinates.filter(
        (coordinate) => {
          return coordinate !== undefined && coordinate !== null;
        }
      );

      setAllAddresses(filteredAddressesCoordinates);
    };

    updateAddresses();
  }, [startCoordinates]);

  useEffect(() => {
    const filteredAddresses = filterAddressesByDistance(
      allAddresses,
      distance,
      startCoordinates
    );
    setFilteredAddresses(filteredAddresses);
  }, [distance]);

  // fix react-leaflet not showing marker assets
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  let RedIcon = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
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
        pathOptions={{ fillColor: "blue" }}
        radius={distance}
      />

      <Marker position={startCoordinates}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={targetCoordinates}>
        <Popup>
          <Tooltip />
        </Popup>
      </Marker>
      {allData.map((item, index) => {
        if (item.coordinates) {
          return (
            <Marker
              key={`${item.location}-${index}`}
              position={item.location}
              icon={RedIcon}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                <br />
                {/* {item.coordinate}, {address[1]} */}
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
