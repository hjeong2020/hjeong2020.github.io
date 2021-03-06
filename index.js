
const title = document.getElementById("Title");
const year = document.getElementById("Year");
const rated = document.getElementById("Rated");
const actors = document.getElementById("Actors");
const genre = document.getElementById("Genre");
const plot = document.getElementById("Plot");
const errorMessage = document.getElementById("errorMessage");
const pathToData = "chatTranscript.lines";

var updateCallback = function(data) {
	var value = data.newValue;
	//console.log("value is" + JSON.stringify(value));
	var updatedLine = value[value.length - 1];
	console.log(updatedLine);
	var customerMessage = updatedLine.text;
	console.log(customerMessage);
	console.log(updatedLine.source.toLowerCase());
	if (updatedLine.source.toLowerCase() === "visitor") {
		var url ="https://www.omdbapi.com?t=" + customerMessage + "&apikey=479949eb";
		console.log(url);
		fetch(url)
			.then(function (response) {
			return response.json();
		}).then(function (res) {
			console.log(res);
			document.getElementById("Title").innerHTML = res.Title;
			document.getElementById("Year").innerHTML = res.Year;
			document.getElementById("Rated").innerHTML = res.Rated;
			document.getElementById("Actors").innerHTML = res.Actors;
			document.getElementById("Genre").innerHTML = res.Genre;
			document.getElementById("Plot").innerHTML = res.Plot;
		}).catch(function (error) {
			console.log("Error: " + error);
		});
	}
};

var notifyWhenDone = function(err) {
  if (err) {
    // Do something with the error
    console.log("notifyWhenDone is called: " + err);
  }
  var pathToData = "chatTranscript.lines";
  errorMessage.innerHTML = "Data is not fetched due to errors"
};

lpTag.agentSDK.init({});
lpTag.agentSDK.bind(pathToData, updateCallback, notifyWhenDone);
