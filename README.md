# Payment Request API Demo

This is a simple demo made to play with and demonstrate the Payment Request API in action.

It was made and tested with Chrome (Desktop) v61 which **does** support the API, and also tested with Firefox (Desktop) v.55.0.3 (which does **not** support the API).

## Installation

Clone the repo or download the zip file and uncompress it. Navigate into the root directory of the repo in the terminal or command line and run the `npm install` command to install app dependencies.

Then run the command `npm run build` to compile / transpile ES5 (browser-friendly) code.

## Running the app

Once you have run the installation steps, you can run the `npm start` command to serve the app at `http://localhost:2077`. This means you will be able to perform fetch requests to the node server that is serving the app.

**Alternatively** you can just open the HTML file in the browser, comment out the `fetch` code in `./src/js/app.js` and uncomment the `setTimeout` above it to simulate a server request, without actually doing one and needing a server.

## Using the app

Once you have the app in your browser using either of the methods above, you can click the two buttons in that page. Either way (if you have served the app or taken the second approach) the success button will act the same, as will the fail button. The only difference between the two in terms of user experience is the setTimeout shows the spinner for longer whilst waiting for the promise to resolve.