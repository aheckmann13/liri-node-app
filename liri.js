
require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
// var bands = new Bands(keys.bands);
var omdb = new OMDB(keys.omdb);

var nodeArgs = process.argv;
var movieName = "";

for (var i = 3; i< nodeArgs.length; i++){
    if (i > 3 && i < nodeArgs.length){
        movieName = movieName + "+" + nodeArgs[i];
    }
    else {
        movieName += nodeArgs[i];
    }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);


axios.get(queryUrl).then(function(response){
    console.log('*' + response.data.Title);
    console.log('*' + response.data.Year);
    console.log('*' + response.data.imdbRating);

    console.log('*' + response.data.Country);
    console.log('*' + response.data.Language);
    console.log('*' + response.data.Plot);
    console.log('*' + response.data.Actors);
});