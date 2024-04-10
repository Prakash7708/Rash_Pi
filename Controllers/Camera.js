// Import necessary modules
var NodeWebcam = require("node-webcam");
var fs = require("fs");

// Default options for capturing image
var opts = {
    // Picture related
    width: 1280,
    height: 720,
    quality: 100,
    // Save shots in memory
    saveShots: true,
    // Output type
    output: "jpeg",
    // Which camera to use, false for default device
    device: false,
    // Logging
    verbose: false
};

// Create webcam instance
var Webcam = NodeWebcam.create(opts);

// Endpoint to stream live video from camera
exports.liveCam = async function (req, res) {
    // Set content type to image/jpeg
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });

    // Capture an image from webcam
    Webcam.capture("test_picture", async function (err, data) {
        if (err) {
            console.error(err);
            res.end();
        } else {
            // Read the captured image
            fs.readFile(data, function (err, imageData) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    // Send the image as response
                    res.end(imageData);
                }
            });
        }
    });
};












// const { exec } = require('child_process');

// // Endpoint to stream live video from camera

// exports.liveCam = async function (req, res) {
//     // Set content type to video/mp4
//     res.writeHead(200, {
//         'Content-Type': 'video/mp4',
//         'Connection': 'keep-alive',
//         'Transfer-Encoding': 'chunked'
//     });

//     // Execute raspivid command to stream video
//     const raspividProcess = exec('raspivid -t 0 -hf -vf -fps 30 -b 1000000 -o -');

//     // Pipe video stream to HTTP response
//     raspividProcess.stdout.pipe(res);

//     // Handle process exit
//     raspividProcess.on('exit', (code) => {
//         console.log(`raspivid process exited with code ${code}`);
//     });

//     // Handle client disconnect
//     req.on('close', () => {
//         console.log('Client disconnected');
//         raspividProcess.kill(); // Stop streaming when client disconnects
//     });
// };
