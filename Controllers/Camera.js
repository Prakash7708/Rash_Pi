const ffmpeg = require('fluent-ffmpeg');
const NodeMediaServer = require('node-media-server');

// Endpoint to stream live video from camera
exports.liveCam = async function (req, res) {
    try {
        // Set up ffmpeg to capture video from /dev/video0
        const ffmpegCommand = ffmpeg('/dev/video0')
            .inputOptions('-f v4l2')
            .inputFormat('v4l2')
            .outputOptions('-preset ultrafast')
            .outputFormat('flv')
            .on('start', function() {
                console.log('FFmpeg started');
            })
            .on('end', function() {
                console.log('FFmpeg ended');
            })
            .on('error', function(err) {
                console.error('FFmpeg error:', err);
            });

        // Create a NodeMediaServer instance to serve the stream over HTTP
        const config = {
            rtmp: {
                port: 1935,
                chunk_size: 60000,
                gop_cache: true,
                ping: 30,
                ping_timeout: 60
            },
            http: {
                port: 8000,
                mediaroot: './media',
                allow_origin: '*'
            }
        };

        const nms = new NodeMediaServer(config);
        nms.run();

        // Redirect ffmpeg output to NodeMediaServer
        ffmpegCommand.pipe(res, { end: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};













// // Import necessary modules
// var NodeWebcam = require("node-webcam");
// var fs = require("fs");
// var path = require("path");

// // Define the folder path
// var folderPath = '/var/app/Rash_Pi/photos';

// // Create the folder if it doesn't exist
// if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath);
// }

// // Default options for capturing image
// var opts = {
//     // Picture related
//     width: 1280,
//     height: 720,
//     quality: 100,
//     // Save shots in memory
//     saveShots: true,
//     // Output type
//     output: "jpeg",
//     // Which camera to use, false for default device
//     device: false,
//     // Logging
//     verbose: false,
//     // File path to save captured image
//     callbackReturn: "location" // Specify that you want the file location as callback return
// };

// // Create webcam instance
// var Webcam = NodeWebcam.create(opts);

// // Endpoint to stream live video from camera
// exports.liveCam = async function (req, res) {
//     // Set content type to image/jpeg
//     res.writeHead(200, { 'Content-Type': 'image/jpeg' });

//     // Print the folder path for debugging
//     console.log("Folder Path:", folderPath);
//      console.log(Webcam)
//     // Capture an image from webcam
//     Webcam.capture(path.join(folderPath, "./test_picture"), async function (err, data) {
//         if (err) {
//             console.error(err);
//             res.end();
//         } else {
//             // Read the captured image
//             fs.readFile(data, function (err, imageData) {
//                 if (err) {
//                     console.error(err);
//                     res.end();
//                 } else {
//                     // Send the image as response
//                     console.log(imageData)
//                     res.end(imageData);
//                 }
//             });
//         }
//     });
// };











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
