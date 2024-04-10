const PiCam = require('picam');

// Endpoint to stream live video from camera
exports.liveCam = async function (req, res) {
    // Set content type to video/mp4
    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Connection': 'keep-alive',
        'Transfer-Encoding': 'chunked'
    });

    // Create a new instance of PiCam
    const camera = new PiCam({
        mode: 'video',
        output: res, // Pipe video stream to HTTP response
        width: 1280,
        height: 720,
        fps: 30,
        timeout: 0, // Continuous recording
        rotation: 0 // Optional: set camera rotation (0, 90, 180, 270)
    });

    // Start the camera
    camera.start();

    // Handle client disconnect
    req.on('close', () => {
        console.log('Client disconnected');
        camera.stop(); // Stop the camera when client disconnects
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
