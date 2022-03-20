console.log("Client Side Js is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
	//Prevent Default Event which is to refresh the page
	//We don't want to refresh the page after submitting the form
	e.preventDefault();
	//get the value from the input
	const location = search.value;

	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";

	fetch("http://localhost:3000/weather?address=" + location).then(
		(response) => {
			//This will run when the JSON Data Arrives
			response.json().then((data) => {
				//This will run when data is done parsed.
				if (data.error) {
					console.log(data.error);
					messageOne.textContent = data.error;
				} else {
					//console.log(data);
					console.log(data.location);
					console.log(data.Data);
					messageOne.textContent = data.location;
					messageTwo.textContent = data.Data;
				}
			});
		}
	);
});
