Post Hook Relay
===============

A quick and dirty way to use websockets to communicate POST requests from the Internet to a second server the poster can't see.

Usage
-----

1. Place one copy of this in the wild. Procfile is provided for your Heroku convenience.
2. Have your service POST to `http://somepublicapp.herokuapp.com/hook`
3. Place a second copy of this in a place in your network that can see the server to which you want to relay the POST request.
4. Set environment variables for the private instance of this app:

     REMOTE_HOST=somepublicapp.herokuapp.com
     LOCAL_HOST=someprivateapp.yournetwork.local
     LOCAL_PORT=8080
     LOCAL_PATH=/path/on/your/app/that/should/receive/posts

Caveats
-------

This is a proof of concept. Take a look at `app.js` and see that it's extremely basic and offers you little in the way of security. That's on you, bub. If you'd like to add some security measures (simplistic, please), feel free to open a pull request.