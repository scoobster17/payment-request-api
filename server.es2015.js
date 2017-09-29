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
    console.log('hit');
    /*const makePayment = () => {
        return new Promise((resolve, reject) => {
            console.log('inside');
            if (Object.keys(req.body).length) {
                console.log('if', resolve);
                resolve({success: true, promise: true});
            } else {
                console.log('else', reject);
                reject();
            }
        });
    }
    makePayment()
    .then(data => {
        console.log(data)
        next();
    )}*/
    //return Promise.resolve().catch(next);
    // res.status(200).send(res.Response());
    // console.log(res);
    res.status(200).send({success: true, final: true});
});