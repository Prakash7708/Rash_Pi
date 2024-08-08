const express = require('express')
const app = express();
const fs = require('fs')
const port = 3000;

// start capture
const videoStream = require('./videoStream');
videoStream.acceptConnections(app, {
        width: 1280,
        height: 720,
        fps: 16,
        encoding: 'JPEG',
        quality: 7 // lower is faster, less quality
    }, 
    '/stream.mjpg', true);

    
const { Gpio } = require('onoff');
const in1 = new Gpio(22, 'out');
const in2 = new Gpio(27, 'out');

// Test motor forward
in1.writeSync(1);
in2.writeSync(0);

// Wait for 5 seconds
setTimeout(() => {
    in1.writeSync(0);
    in2.writeSync(0);
    in1.unexport();
    in2.unexport();
    console.log("motor off")
}, 5000);

app.use(express.static(__dirname+'/public'));
app.listen(port, () => console.log(`Example app listening on port ${port}! In your web browser, navigate to http://<IP_ADDRESS_OF_THIS_SERVER>:3000`));