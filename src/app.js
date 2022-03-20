const path = require("path");
const express = require("express");
const hbs = require("hbs");
//require geoCode and frecast from the utils folder
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

const port = process.env.PORT || 3000;
//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather APP",
		name: "Brian Wu",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Brian Wu",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "Brian Wu",
		message: "Please Help me get a job",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address",
		});
	}
	console.log(req.query);

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}

			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}
				console.log(location);
				console.log("Data", forecastData);
				res.send({
					location,
					Data: forecastData,
					address: req.query.address,
				});
			});
		}
	);

	// res.send({
	// 	forecast: "It is snowing",
	// 	location: "Philadelphia",
	// 	address: req.query.address,
	// });
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}
	console.log(req.query);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "ERROR 404",
		message: "Help Article not Found",
		name: "Brian Wu",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "ERROR 404",
		message: "Page Not Found",
		name: "Brian Wu",
	});
});

app.listen(port, () => {
	console.log("Server is up on port 3000");
});
