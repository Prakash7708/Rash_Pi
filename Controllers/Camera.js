
const RaspiCam = require("raspicam");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Endpoint to stream live video from camera
exports.liveCam = async function (req, res) {
  // Set content type to video/mp4
  res.setHeader("Content-Type", "video/mp4");

  // Specify the output folder path
  const outputFolder = path.join(__dirname, "photos");

  // Ensure the output folder exists
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  // Configure RaspiCam options
  const cameraOpts = {
    mode: "photo", // Specify mode as "photo" for capturing single photos
    output: path.join(outputFolder, "photo_%d.jpg"), // Output path and filename with sprintf-style variables
    // Add other optional options as needed
    // For example:
    // width: 640, // Image width
    // height: 480, // Image height
    // quality: 85, // Image quality (0 to 100)
    // timeout: 5000 // Time (in ms) before takes picture and shuts down (if not specified, set to 5s)
  };

  // Initialize RaspiCam with options
  const camera = new RaspiCam(cameraOpts);

  // Start the camera
  camera.start();

  // Listen for the "read" event triggered when each new photo is saved
  camera.on("read", function (err, timestamp, filename) {
    // Assuming 'filename' contains the path to the captured photo file, you can stream it to the response
    const stream = fs.createReadStream(filename);
    stream.pipe(res);
  });

  // Error handling
  camera.on("error", function (err) {
    console.error("Camera error:", err);
    res.status(500).send("Camera error occurred");
  });

  // Cleanup on connection close
  req.on("close", () => {
    camera.stop();
    console.log("Connection closed. Camera stopped.");
  });
};

// Define route for liveCam endpoint
app.get("/livecam", exports.liveCam);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});








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
