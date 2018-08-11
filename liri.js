//----------------------
//Require Packages and Files
//----------------------
require('dotenv').config();
var keys = require('./keys');
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

//----------------------
//Command Line inputs
//----------------------
var nodeArgs = process.argv;
var operator = process.argv[2];
var input = '';

//----------------------
//Switch for every case through if, else statement
//----------------------
if (operator === 'my-tweets') {
  runTwitter();
} else if (operator === 'spotify-this-song') {
  runSpotify();
} else if (operator === 'movie-this') {
  runOmdb();
} else if (operator === 'do-what-it-says') {
  runTxt();
}

//----------------------
//Twitter function
//----------------------
function runTwitter() {
  //Grab keys from keys.js
  var tKeys = keys.twitter;

  //Next variables and functions come from Twitter API
  var client = new Twitter(tKeys);
  var params = { screen_name: 'BillGates', count: 20 };

  client.get('statuses/user_timeline', params, function(
    error,
    tweets,
    response
  ) {
    if (error) {
      console.log(error);
    } else {
      var myTweets =
        '\n------------------------\n' +
        'User tweet and retweets:' +
        '\n------------------------\n';

      //First, we run the next for loop that will go through the twitter data and will get every tweet and date
      for (var i = 0; i < tweets.length; i++) {
        myTweets +=
          'Tweet: ' +
          tweets[i].text +
          '\n' +
          'Date: ' +
          tweets[i].created_at +
          '\n' +
          '------------------------\n';
        //After, we log our information
        console.log(myTweets);

        //Finally, we append every element inside of our log.txt
        fs.appendFile('log.txt', '\n' + myTweets + '\n', function(err) {
          if (err) {
            return console.log(err);
          }
        });
      }
    }
  });
}

//----------------------
//Spotify function
//----------------------
function runSpotify() {
  //We start by getting the data from the user input
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
      input = input + '+' + nodeArgs[i];
    } else {
      input += nodeArgs[i];
    }
  }

  //Next, we grab the keys from keys.js
  var sKeys = keys.spotify;

  //After that, we get the variables and functions that come from Spotify API
  var spotify = new Spotify(sKeys);
  spotify.search({ type: 'track', query: input }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var data = data;
    var aboutThisSong =
      '\n' +
      'Artist Name: ' +
      data.tracks.items[0].artists[0].name +
      '\n' +
      'Song Name: ' +
      data.tracks.items[0].name +
      '\n' +
      'Spotify URL: ' +
      data.tracks.items[0].external_urls.spotify +
      '\n' +
      'Album Name: ' +
      data.tracks.items[0].album.name +
      '\n';

    //We log our information
    console.log(aboutThisSong);

    //Finally, we append every element inside of our log.txt
    fs.appendFile('log.txt', '\n' + aboutThisSong + '\n', function(err) {
      if (err) {
        return console.log(err);
      }
    });
  });
}

//----------------------
//OMBD function
//----------------------
function runOmdb() {
  //We start by getting the data from the user input
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
      input = input + '+' + nodeArgs[i];
    } else {
      input += nodeArgs[i];
    }
  }

  //If we don't receive any input we assign the next variable to our input
  if (input === '') {
    input = 'Mr. Nobody';
  }
  //The next step is concatenate our queryURL and get the data using request
  var queryUrl =
    'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&apikey=trilogy';

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      //In some cases, rotten tomatoes is not in the same position or doesn't exist, so we stablish the cases of its uses.
      var rottenTomatoes = '';

      var rottenTomatoesData = JSON.parse(body).Ratings.find(
        ratt => ratt.Source === 'Rotten Tomatoes'
      );

      if (rottenTomatoesData) {
        rottenTomatoes += 'Rotten Tomatoes: ' + rottenTomatoesData.Value + '\n';
      }

      var aboutThisMovie =
        '\n' +
        'Title: ' +
        JSON.parse(body).Title +
        '\n' +
        'Release Year: ' +
        JSON.parse(body).Year +
        '\n' +
        'IMDB Rating: ' +
        JSON.parse(body).imdbRating +
        '\n' +
        rottenTomatoes +
        'Country: ' +
        JSON.parse(body).Country +
        '\n' +
        'Language: ' +
        JSON.parse(body).Language +
        '\n' +
        'Plot: ' +
        JSON.parse(body).Plot +
        '\n' +
        'Actors: ' +
        JSON.parse(body).Actors +
        '\n';

      //We log our information
      console.log(aboutThisMovie);

      //Finally, we append every element inside of our log.txt
      fs.appendFile('log.txt', '\n' + aboutThisMovie + '\n', function(err) {
        if (err) {
          return console.log(err);
        }
      });
    }
  });
}

//----------------------
//RunTxt Function
//----------------------
function runTxt() {
  //This function is complement other functions.
  fs.readFile('random.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var output = data.split(',');

    //In case that our random.txt have 2 parameters, we use them to run another function, in this case spotify.
    input = output[1];
    if (output[0] === 'spotify-this-song') {
      runSpotify(input);
    } else if (output[0] === 'movie-this') {
      runOmdb(input);
    } else if (output[0] === 'my-tweets') {
      runTwitter();
    }
  });
}
