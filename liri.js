
require("dotenv").config();

var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;

switch (nodeArgs[2]) {
    case 'concert-this':
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

function concertThis() {

    let artist = "";

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            artist = artist + "+" + nodeArgs[i];
        }
        else {
            artist += nodeArgs[i];
        }
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bands.id;

    console.log(queryUrl);

    axios.get(queryUrl).then(function (response) {
        for (i = 0; i < 4; i++) {
            var output = ('* Venue Name: ' + response.data[i].venue.name +
                '\n* Venue Location: ' + response.data[i].venue.city + ", " +
                response.data[i].venue.country +
                '\n* Date of Concert: ' + response.data[i].venue.datetime + '\n\n');

            console.log(output);
        }
    });

};


function spotifyThis() {

    let songName = "";

    if (nodeArgs.length < 4) {
        songName = "The Sign";
    }
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        }
        else {
            songName += nodeArgs[i];
        }
    }
    console.log(songName)

    spotify.search({ type: 'track', query: songName }).then(function (response) {
        console.log(response);
    })
        .catch(function (err) {
            console.log(err);
        });

    // var output = ('* Artist(s): ' + response.data.artist +
    // '\n* Song Name: ' + songName+
    // '\n* Preview Link: ' + response.data.preview + 
    // '\n* Album:' + response.data.album +'\n\n');

    // console.log(output);
}


function movieThis() {

    let movieName = "";

    if (nodeArgs.length < 4) {
        movieName = "Mr. Nobody";
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
            '\n* Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value
    /*need to figure out how to pull this rating */ +
            '\n* Country: ' + response.data.Country +
            '\n* Language: ' + response.data.Language +
            '\n* Plot: ' + response.data.Plot + '\n* Actors' + response.data.Actors);
        console.log(output);
    });
};

function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        //Print the contents of data
        console.log(data);
        //Split data into array and log array
        var dataArr = data.split(',');
        console.log(dataArr);

        //use index of array values to run switch
        switch (dataArr[0]) {
            case 'concert-this':
                concertThis();
                break;
            case 'spotify-this-song':
                songName = dataArr[1]; 
                spotifyThis();
                break;
            case 'movie-this':
                movieThis(dataArr[1]);
                break;
            case 'do-what-it-says':
                doIt(dataArr[1]);
                break;
            default:
                console.log('Try again');
                break;
        }

    });
}

    // fs.appendFile('log.txt', output + '\n\n', function (err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log('Content Added');
    //     }
    // });
