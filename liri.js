
require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;

switch (nodeArgs[2]) {
    case 'concer-this':
        concertThis();
        break;
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doIt();
        break;
    default:
        console.log('Try again');
        break;
}

function movieThis() {

    let movieName = "";

    if(nodeArgs.length<4){
        movieName="Mr. Nobody";
    }
    for (var i = 3; i < nodeArgs.length; i++) {

       if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName += nodeArgs[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb.id;

    console.log(queryUrl);

    axios.get(queryUrl).then(function (response) {
        
        var output = ('* Title: ' + response.data.Title +
            '\n* Year: ' + response.data.Year +
            '\n* IMDB Rating: ' + response.data.imdbRating +
            '\n* Rotten Tomatoes Rating: ' + response.data.Ratings[1]
    /*need to figure out how to pull this rating */ +
            '\n* Country: ' + response.data.Country +
            '\n* Language: ' + response.data.Language +
            '\n* Plot: ' + response.data.Plot + '\n* Actors' + response.data.Actors);
            
            console.log(output);
            fs.appendFile('log.txt', output + '\n\n', function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log('Content Added');
                }
            });
    });

};





