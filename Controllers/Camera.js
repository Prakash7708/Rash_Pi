
const RaspiCam = require("raspicam");


// Endpoint to stream live video from camera
exports.liveCam = async function (req, res) {
  // Set content type to video/mp4
  res.setHeader("Content-Type", "video/mp4");

  // Configure RaspiCam options
  const cameraOpts = {
    mode: "video", // Specify mode as "video"
    output: "-", // To write to stdout, use '-'
    // Add your additional options here
    w: 640, // Image width
    h: 480, // Image height
    bitrate: "1000000", // Bitrate in bits per second
    t: 5000, // Time (in ms) to capture for (5 seconds in this case)
    fps: 30 // Frames per second
    // Add more options as needed
  };

  // Initialize RaspiCam with options
  const camera = new RaspiCam(cameraOpts);

  // Start the camera
  camera.start();

  // Pipe camera output to response stream
  camera.on("read", function (err, timestamp, filename) {
    // Assuming 'filename' contains the path to the captured video file, you can stream it to the response
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
