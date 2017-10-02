// server dependencies
import { Server as InsecureServer } from 'http';

// framework dependencies
import Express from 'express';
const bodyParser = require('body-parser');


const PORTS = {
    INSECURE: 2077
}

const app = Express();

app.use( Express.static('dist') );
app.use( bodyParser.json() );

const insecureServer = InsecureServer(app).listen(PORTS.INSECURE, () => {
    const host = insecureServer.address().address || 'localhost';
    const port = insecureServer.address().port || PORTS.INSECURE;
    console.log('PRD app (insecure - HTTP) listening @ http://%s:%s', host, port);
});

app.post('/check-payment', (req, res) => {
    if (typeof req.headers.fail != 'undefined') {
        res.status(400).send({success:false});
    } else {
        res.status(200).send({success: true});
    }
});

app.post('/get-payment-options', (req, res) => {
    if (typeof req.headers.fail != 'undefined') {
        res.status(200).send([]);
    } else {
        res.status(200).send([
            {
                id: 'standard',
                label: 'Standard Shipping (3-5 Days)',
                amount: {
                    currency: 'GBP',
                    value: 3.59
                }
            },
            {
                id: 'express',
                label: 'Express Shipping (1 Day)',
                amount: {
                    currency: 'GBP',
                    value: 5.59
                }
            },
            {
                id: 'saturday-1500-1700',
                label: 'Saturday Fixed Timeslot (15:00 - 17:00 slot)',
                amount: {
                    currency: 'GBP',
                    value: 7.59
                }
            }
        ]);
    }
});