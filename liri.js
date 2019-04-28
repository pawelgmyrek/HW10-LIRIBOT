require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var nodeArgs = process.argv;

var input = "";

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    input = input + "+" + nodeArgs[i];
  }
  else {
    input += nodeArgs[i];

  }
}

if (command === "concert-this") {
  concertThis();
}

else if (command === "spotify-this-song") {
  spotifyThisSong();
}

else if (command === "movie-this") {
  movieThis();
}

else if (command === "do-what-it-says") {
  doWhatItSays();
}

else {
  console.log("Not a command. \nPlease enter one of the following commands followed by what you would like to search: concert-this, spotify-this-song, movie-this, or do-what-it-says")
}

function concertThis() {
  if (!input) {
    input = "cher"
  }
  var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
  axios.get(queryUrl).then(
    function(response) {
      var datetime = response.data[0].datetime;
      var randomFormat = "MM/DD/YYYY";
      var convertedDate = moment(datetime).format(randomFormat);
      console.log("Name of the Venue: " + response.data[0].venue.name);
      console.log("Venue Location: " + response.data[0].venue.city);
      console.log("Date of the Event: " + convertedDate);
    },

    function(error) {
      console.log(error)
    }
  );
}

function spotifyThisSong() {
  if (!input) {
    input = "the sign by ace of base"
  }

  spotify.search(
    {
      type: "track",
      query: input
    }).then(
      function(response) {
        console.log("Artist: " + response.tracks.items[i].artists[0].name);
        console.log("Song: " + response.tracks.items[i].name);
        console.log("Preview URL: " + response.tracks.items[i].preview_url);
        console.log("Album: " + response.tracks.items[i].album.name);
    },
    function(error) {
      console.log(error);
    }
  );
}

function movieThis() {
  if (!input) {
    input = "Mr. Nobody";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("Rated: " + response.data.Rated);
      console.log("Released: " + response.data.Released);
      console.log("Runtime: " + response.data.Runtime);
      console.log("Rotten Tomatoes Rating: " + JSON.stringify(response.data.Ratings[1].Value));
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    },

    function(error) {
      console.log(error)
    }
  );
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var output = data.split(",");
    for (var i = 0; i < output.length; i++) {
      console.log(output[i]);
    }
  });
}
