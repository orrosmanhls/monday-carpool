import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

monday.setToken(process.env.REACT_APP_MONDAY_API_TOKEN);

const getCoordinates = async (query) => {
  const url = encodeURI(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
  );
  return await fetch(url).then((response) => response.json());
};

const getColumnIdByName = async (name) => {
  //TODO: Change board ID to be dynamic
  const response = await monday.api(`query {
	    boards (ids: 2773941457) {
	        columns {
	            title
	            id
	        }
	    }
	}`);

  const columns = response.data.boards[0].columns;

  for (const column of columns) {
    if (column.title.toLowerCase().includes(name.toLocaleLowerCase())) {
      return column.id;
    }
  }

  return "";
};

const getAllAddresses = async () => {
  const addressColumnId = await getColumnIdByName("location");

  const response = await monday.api(`query {
      boards(ids: 2773941457) {
		items {
			column_values (ids: ["${addressColumnId}"]) {
				text
			}
    	}
  	}
}`);

  const addresses = response.data.boards[0].items.map(
    (item) => item.column_values[0].text
  );
  return addresses;
};

const calculatePointsDistance = (pointA, pointB) => {
  const earthRadius = 6373; // Radius of the earth in km
  const dLat = degToRad(pointA[0] - pointB[0]);
  const dLon = degToRad(pointA[1] - pointB[1]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(pointA[0])) *
      Math.cos(degToRad(pointB[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = earthRadius * c; // Distance in km
  return d;
};

const degToRad = (deg) => {
  return deg * (Math.PI / 180);
};

const filterAddressesByDistance = (addresses, distance, startAddress) => {
  const tempFilteredAddresses = addresses.filter((address) => {
    const distanceFromStartAddress = calculatePointsDistance(
      address,
      startAddress
    );

    return distanceFromStartAddress < distance / 1000 // convert radius from meters to kilometers
      ? address
      : null;
  });

  const filteredAddressesCoordinates = tempFilteredAddresses.filter(
    (coordinate) => {
      return coordinate !== undefined && coordinate !== null;
    }
  );

  return filteredAddressesCoordinates;
};

export {
  getCoordinates,
  getAllAddresses,
  calculatePointsDistance,
  filterAddressesByDistance,
};
