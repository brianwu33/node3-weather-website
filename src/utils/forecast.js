const request = require("request");

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
					" degrees." +
					"The humidity is " +
					body.current.humidity +
					"%."
			);
		}
	});
};

module.exports = forecast;
