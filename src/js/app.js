;window.prd = window.prd || (function() {

    let supportsPaymentRequestAPI = false;
    let startPaymentBtns;
    const currency = 'GBP';
    let customShippingOptions;

    /**
     * PRIVATE METHODS
     */ 
    const init = () => {

        supportsPaymentRequestAPI = !!window.PaymentRequest;

        startPaymentBtns = document.querySelectorAll('button');

        if (startPaymentBtns.length) Array.prototype.forEach.call(startPaymentBtns, (btn) => {
            btn.addEventListener('click', (event) => {
                if (supportsPaymentRequestAPI) {
                    
                    var supportedPaymentMethods = [
                        {
                            supportedMethods: ['basic-card'],
                            supportedNetworks: ['visa', 'mastercard']
                        }
                    ];
                    
                    var paymentDetails = {
                        total: {
                            label: 'Your label here e.g. Total',
                            amount: {
                                currency,
                                value: 125
                            }
                        },
                        displayItems: [
                            {
                                label: 'Your label here e.g. Subtotal',
                                amount: {
                                    currency,
                                    value: 110
                                }
                            },
                            {
                                label: 'Your label here e.g. Discount (£10)',
                                amount: {
                                    currency,
                                    value: -10
                                }
                            },
                            {
                                label: 'Your label here e.g. Tax',
                                amount: {
                                    currency,
                                    value: 25
                                }
                            }
                        ]
                    }

                    var options = {
                        requestPayerName: true,
                        requestPayerPhone: true,
                        requestPayerEmail: true,
                        requestShipping: true
                    };

                    var paymentRequest = new PaymentRequest(
                        supportedPaymentMethods,
                        paymentDetails,
                        options
                    );

                    paymentRequest.addEventListener('shippingaddresschange', event => {

                        customShippingOptions = [
                            {
                                id: 'standard',
                                label: 'Standard Shipping (3-5 Days)',
                                amount: {
                                    currency,
                                    value: 3.99
                                }
                            },
                            {
                                id: 'express',
                                label: 'Express Shipping (1 Day)',
                                amount: {
                                    currency,
                                    value: 5.99
                                }
                            },
                            {
                                id: 'saturday-1300-1500',
                                label: 'Saturday Fixed Timeslot (13:00 - 15:00 slot)',
                                amount: {
                                    currency,
                                    value: 7.99
                                }
                            }
                        ];

                        /*
                        const newPaymentDetails = {
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
                        */
                        
                        const newPaymentDetails = {
                            total: {
                                label: 'Total',
                                amount: {
                                    currency,
                                    value: 125
                                }
                            },
                            shippingOptions: customShippingOptions
                        };

                        event.updateWith(newPaymentDetails);

                    });

                    paymentRequest.addEventListener('shippingoptionchange', (event) => {  
                        const paymentRequestInstance = event.target;
                        const selectedShippingId = paymentRequestInstance.shippingOption;

                        customShippingOptions.forEach(option => {
                            option.selected = option.id === selectedShippingId;
                        });

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
                    
                    paymentRequest.show()
                    .then(function(paymentResponse) {

                        /*
                        setTimeout(function() {

                            // mimic checking the status (success) in the BE response
                            if (event.target.getAttribute('id') === 'success') {
                                return paymentResponse.complete()
                                    .then(() => {
                                        alert('The payment was verified by the Back End so the Payment Request API UI is closed. This is where we can navigate to an order confirmation page.');
                                    });
                                
                                // mimic failure status returned by BE
                            } else {
                                return paymentResponse.complete('fail');
                                alert('The payment was not verified by the Back End so the Payment Request API UI stays open and shows an error. There is no page transition.');
                            }
                            
                        }, 1500);
                        */

                        const headers = new Headers();
                        if (event.target.id === "failure") headers.append("fail", "");

                        fetch('/check-payment', { method: 'POST', body: JSON.stringify(paymentResponse), headers })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error();
                            } else {
                                return response.json()
                            };
                        })
                        .then(response => {
                            return paymentResponse.complete()
                                .then(() => {
                                    alert('The payment was verified by the Back End so the Payment Request API UI is closed. This is where we can navigate to an order confirmation page.');
                                });
                        })
                        .catch(() => {
                            return paymentResponse.complete('fail')
                                .catch(() => {
                                    alert('The payment was not verified by the Back End so the Payment Request API UI stays open and shows an error. There is no page transition.');
                                });
                        });
                    })
                    .catch((err) => {
                        alert('Nothing would happen now as the user closed the Payment Request API UI, as if to cancel the checkout process.');
                    });

                } else {
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
    }

})();

if (prd && typeof prd.init === 'function') prd.init();