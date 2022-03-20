const request = require("request");

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=3eaf7c6f854886df97757087aeb1f9c9&query=" +
		latitude +
		"," +
		longitude +
		"";
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather service", undefined);
		} else if (body.error) {
			callback("Unable to find location", und·efined);
		} else {
			callback(
				undefined,
				"Today's weather is " +
					body.current.weather_descriptions +
					". The temperature is " +
					body.current.temperature +
					" degrees, and it feels like " +
					body.current.feelslike +
					" degrees."
			);
		}
	});
};

module.exports = forecast;
