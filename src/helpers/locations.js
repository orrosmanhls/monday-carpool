export const getCoordinates = async (query) => {
	const url = encodeURI(
		`https://nominatim.openstreetmap.org/search?format=json&q=${query}`
	);
	return await fetch(url).then((response) => response.json());
};
