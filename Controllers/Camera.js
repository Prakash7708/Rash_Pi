const cv = require('opencv4nodejs');

// Endpoint to stream live video from camera
exports.liveCam = async function (req, res) {
    // Set content type to video/mp4
    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Connection': 'keep-alive',
        'Transfer-Encoding': 'chunked'
    });

    // Create VideoWriter object to write frames to HTTP response
    const fps = 30;
    const width = 1280;
    const height = 720;
    const writer = new cv.VideoWriter('output.mp4', cv.VideoWriter.fourcc('MP4V'), fps, new cv.Size(width, height));

    // Create VideoCapture object to capture video from camera
    const cap = new cv.VideoCapture(0); // Adjust device index if necessary

    // Start capturing frames
    let frame;
    while (true) {
        frame = cap.read(); // Read frame from camera
        if (frame.empty) break; // Break loop if frame is empty

        // Write frame to VideoWriter object
        writer.write(frame);

        // Convert frame to base64-encoded string
        const frameBuffer = cv.imencode('.jpg', frame).toString('base64');

        // Send frame to client
        res.write(Buffer.from(frameBuffer, 'base64'));

        // Wait for a short delay to maintain FPS
        await new Promise(resolve => setTimeout(resolve, 1000 / fps));
    }

    // Release VideoCapture and VideoWriter objects
    cap.release();
    writer.release();

    // End HTTP response
    res.end();
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
