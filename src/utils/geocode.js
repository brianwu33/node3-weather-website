const request = require("request");

//Geocoding
const geocode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1IjoiYnJpYW53dTMzIiwiYSI6ImNsMGZ4cWwxbDB4aXIzYm11Z2Q3MTJiOXgifQ.SGD7ElL3NHMEut1B7I3y9g&limit=1";
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to location services!", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to find location. Try another search", undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
