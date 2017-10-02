# Payment Request API Demo

This is a simple demo made to play with and demonstrate the Payment Request API in action.

It was made and tested with Chrome (Desktop MacOS) v61 which **does** support the API, and also tested with Firefox (Desktop MacOS) v.55.0.3 (which does **not** support the API).

## Installation

No installation steps are needed, as compiled JavaScript is provided in the repository. All you need to do is clone the repo or download the zip file and uncompress it. **If you do this, the only way you can run the app is without a server**.

If you want to serve the app to gain **full app functionality**, clone the repo or download the zip file and uncompress it. Navigate into the root directory of the repo in the terminal or command line and run the `npm install --only=production` for the base essentials to serve the app.

If you want to serve the app to gain full app functionality, **and** be able to re-compile the code, say making your own changes to prepare to make a pull request, clone the repo or download the zip file and uncompress it. Navigate into the root directory of the repo in the terminal or command line and run the `npm install` command to install all app dependencies. Then run the command `npm run build` to compile / transpile ES5 (browser-friendly) code, or use the watcher for ongoing changes using `npm run watch`.

## Running the app

Once you have run the installation steps, you can just open the HTML file in the browser, and you should be able to use all the buttons in the top section if the Payment Request API is supported in your browser.

**Alternatively** you can run the `npm start` command to serve the app at `http://localhost:2077` if you ran the further steps above. This means you will be able to perform fetch requests to the node server that is serving the app using the buttons in the second section, but you will still be able to use the buttons in the top section if you wish, which simulate a request to the server.

## Using the app

Once you have the app in your browser using either of the methods above, you can click the buttons in that page. Either way (if you have served the app or taken the second approach) the success buttons will act the same in the way that they will call the Payment Request API.

The only difference between the two in terms of user experience is the speed; the setTimeout shows the spinner for longer whilst waiting for the promise to resolve, whereas the server response is almost instant.