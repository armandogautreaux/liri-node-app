# liri-node-app
node liri.js my-tweets

To run this app you should download the repository and run node in the command line:
How it works? You should type the next commands to see the result enclosed in parenthesi: (i) node liri.js my-tweets (This will show your last 20 tweets and when they were created at in your terminal/bash window.node), (ii) liri.js spotify-this-song '<song name here>' (This will show the following information about the song in your terminal/bash window), (iii) If no song is provided then your program will default to "The Sign" by Ace of Base.
Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
Step One: Visit https://developer.spotify.com/my-applications/#!/
Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.



