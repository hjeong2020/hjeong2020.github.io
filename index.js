
const title = document.getElementById("Title");
const year = document.getElementById("Year");
const rated = document.getElementById("Rated");
const actors = document.getElementById("Actors");
const genre = document.getElementById("Genre");
const plot = document.getElementById("Plot");
const errorMessage = document.getElementById("errorMessage");
const pathToData = "chatTranscript.lines";

var updateCallback = function(data) {
  //var chatTranscript = data;
  //console.log(chatTranscript);
var value = data.newValue;
  console.log("value is" + JSON.stringify(value));
var updatedLine = value[value.length - 1];
  console.log(updatedLine);
  var customerMessage = updatedLine.text;
  console.log(customerMessage);
  console.log(updatedLine.source.toLowerCase());
  if (updatedLine.source.toLowerCase() === "visitor") {
    var url =
      "https://www.omdbapi.com?t=" + customerMessage + "&apikey=479949eb";
    console.log(url);
    fetch(url)
      .then(data => {
        return data.json(),
        console.log("fetch is called inside updatedLine")
      })
      .then(res => {
        console.log(res);
        console.log("res called");
        title.innerHTML = res.Title;
        year.innerHTML = res.Year;
        rated.innerHTML = res.Rated;
        actors.innerHTML = res.Actors;
        genre.innerHTML = res.Genre;
        plot.innerHTML = res.Plot;
      })
      .catch(function(error) {
        console("Error" + error);
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
