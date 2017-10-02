/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

;window.prd = window.prd || function () {

    let supportsPaymentRequestAPI = false;
    let startPaymentBtns;
    const currency = 'GBP';
    let customShippingOptions;

    /**
     * PRIVATE METHODS
     */
    const init = () => {

        // check for API support
        supportsPaymentRequestAPI = !!window.PaymentRequest;

        // get all the buttons in the HTML for the demo
        startPaymentBtns = document.querySelectorAll('button');

        // bind event to all buttons to handle the payment request API differently
        if (startPaymentBtns.length) Array.prototype.forEach.call(startPaymentBtns, btn => {
            btn.addEventListener('click', event => {
                if (supportsPaymentRequestAPI) {

                    // first of all, for demo purposes, check whether the user is trying to use the server when it is not running
                    if (location.protocol === 'file:' && btn.getAttribute('data-server') === 'true') {
                        alert('If you want to test this button please serve the site using the README document and try again.');
                        return;
                    }

                    // define the supported payment methods. This demo only deals with card payments currently
                    var supportedPaymentMethods = [{
                        supportedMethods: ['basic-card'],
                        data: {
                            supportedNetworks: ['visa', 'mastercard'] // omit this to see all supported card types
                        }
                    }];

                    // define the initial payment details object. This example shows the breakdown of display items you can also have
                    // all logic needs to be done by BE / JS, not the API.
                    var paymentDetails = {
                        total: {
                            label: 'Your label here e.g. Total',
                            amount: {
                                currency,
                                value: 125
                            }
                        },
                        displayItems: [{
                            label: 'Your label here e.g. Subtotal',
                            amount: {
                                currency,
                                value: 110
                            }
                        }, {
                            label: 'Your label here e.g. Discount (£10)',
                            amount: {
                                currency,
                                value: -10
                            }
                        }, {
                            label: 'Your label here e.g. Tax',
                            amount: {
                                currency,
                                value: 25
                            }
                        }]

                        // define the details we want to ask the user for
                    };var options = {
                        requestPayerName: true,
                        requestPayerPhone: true,
                        requestPayerEmail: true
                    };

                    // for some buttons, we also request shipping details
                    if (event.target.getAttribute('data-shipping') !== 'false') options['requestShipping'] = true;

                    // create the payment request instance with above options
                    var paymentRequest = new PaymentRequest(supportedPaymentMethods, paymentDetails, options);

                    // when applicable, this event updates the UI with shipping options provided
                    paymentRequest.addEventListener('shippingaddresschange', event => {

                        // choose for the demo if we want to use the server or not
                        if (btn.getAttribute('data-server') === 'false') {

                            let newPaymentDetails;

                            customShippingOptions = [{
                                id: 'standard',
                                label: 'Standard Shipping (3-5 Days)',
                                amount: {
                                    currency,
                                    value: 3.99
                                }
                            }, {
                                id: 'express',
                                label: 'Express Shipping (1 Day)',
                                amount: {
                                    currency,
                                    value: 5.99
                                }
                            }, {
                                id: 'saturday-1300-1500',
                                label: 'Saturday Fixed Timeslot (13:00 - 15:00 slot)',
                                amount: {
                                    currency,
                                    value: 7.99
                                }
                            }];

                            // as an example, here we are triggering an error by not providing any shipping options
                            if (btn.getAttribute('data-shipping') === 'empty') {
                                newPaymentDetails = {
                                    total: {
                                        label: 'Shipping cost',
                                        amount: {
                                            currency,
                                            value: 125
                                        }
                                    },
                                    error: 'This is my custom error. Comment this line to see the default message!',
                                    shippingOptions: []
                                };
                            }

                            // here we are updating the UI with valid shipping options. These can be provided in the page
                            // or we can fetch them from a back end endpoint
                            if (btn.getAttribute('data-shipping') === 'true') {
                                newPaymentDetails = {
                                    total: {
                                        label: 'Total',
                                        amount: {
                                            currency,
                                            value: 125
                                        }
                                    },
                                    shippingOptions: customShippingOptions
                                };
                            }

                            // update the UI with the new details calculated
                            event.updateWith(newPaymentDetails);

                            // if for demo purposes we are using the server
                        } else {

                            // we can get the shipping address from the event
                            const paymentRequestInstance = event.target;

                            // for demo purposes adjust the request
                            const headers = new Headers();
                            if (btn.getAttribute('data-shipping') !== "true") headers.append("fail", "");

                            // create a promise to fetch the payment options from the server
                            const fetchShippingOptions = fetch('/get-payment-options', { method: 'POST', body: JSON.stringify(paymentRequestInstance.shippingAddress), headers }).then(response => {
                                if (!response.ok) {
                                    throw new Error();
                                } else {
                                    return response.json();
                                };
                            }).then(response => {

                                // make the options accessible and therefore selectable
                                customShippingOptions = response;

                                // return the unadjusted amount with the payment options provided by the server
                                return {
                                    total: {
                                        label: 'Total',
                                        amount: {
                                            currency: 'GBP',
                                            value: 125
                                        }
                                    },
                                    error: 'This is my custom error. Comment this line to see the default message!',
                                    shippingOptions: response
                                };
                            });

                            // update the UI with shipping options after a spinner is shown and removed whilst the request is made to the server
                            event.updateWith(fetchShippingOptions);
                        }
                    });

                    // this event listens to the user selecting a shipping option
                    paymentRequest.addEventListener('shippingoptionchange', event => {
                        const paymentRequestInstance = event.target;
                        const selectedShippingId = paymentRequestInstance.shippingOption;

                        // mark the selected option as selected so the UI will update
                        customShippingOptions.forEach(option => {
                            option.selected = option.id === selectedShippingId;
                        });

                        // update the UI with an adjusted total etc.
                        event.updateWith({
                            total: {
                                label: 'Total',
                                amount: {
                                    currency,
                                    value: 132.99
                                }
                            },
                            shippingOptions: customShippingOptions
                        });
                    });

                    // this calls the Payment Request API UI in the first place, and defines what should happen when details are submitted
                    paymentRequest.show().then(function (paymentResponse) {

                        // this is a handler for the demo to differentiate between hitting the server or not
                        if (event.target.getAttribute('data-server') === 'false') {

                            setTimeout(function () {

                                // mimic checking the status (success) in the BE response
                                if (event.target.getAttribute('data-succeed') === 'true') {
                                    return paymentResponse.complete().then(() => {
                                        alert('The payment was verified by the Back End so the Payment Request API UI is closed. This is where we can navigate to an order confirmation page.');
                                    });

                                    // mimic failure status returned by BE
                                } else {
                                    return paymentResponse.complete('fail').catch(() => {
                                        alert('The payment was not verified by the Back End so the Payment Request API UI stays open and shows an error. There is no page transition.');
                                    });
                                }
                            }, 1500);

                            // if we want to use the demo's server instead
                        } else {

                            // for demo purposes, fail the request
                            const headers = new Headers();
                            if (event.target.getAttribute('data-succeed') === "false") headers.append("fail", "");

                            // get the server to check the payment details provided
                            fetch('/check-payment', { method: 'POST', body: JSON.stringify(paymentResponse), headers }).then(response => {
                                if (!response.ok) {
                                    throw new Error();
                                } else {
                                    return response.json();
                                };
                            }).then(response => {
                                // successfully complete the payment
                                return paymentResponse.complete().then(() => {
                                    alert('The payment was verified by the Back End so the Payment Request API UI is closed. This is where we can navigate to an order confirmation page.');
                                });
                            }).catch(() => {
                                // fail the payment
                                return paymentResponse.complete('fail').catch(() => {
                                    alert('The payment was not verified by the Back End so the Payment Request API UI stays open and shows an error. There is no page transition.');
                                });
                            });
                        }
                    }).catch(err => {
                        alert('Nothing would happen now as the user closed the Payment Request API UI, as if to cancel the checkout process.');
                    });
                } else {
                    // because the API is not supported we need to default back to existing checkout
                    alert('You would now be re-directed to checkout flow as Payment Request API not supported.');
                }
            });
        });
    };

    /**
     * PUBLIC METHODS
     */
    return {
        init
    };
}();

// initialise the payment request demo code
if (prd && typeof prd.init === 'function') prd.init();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map