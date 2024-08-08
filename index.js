

const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv").config();
const URL = process.env.DB2;
const users_mail=require("./Routes/UsersMail")

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({ msg: "Api Working" });
});
app.use(
  cors({
    origin: "*",
  })
);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//app.use("/api",login)
app.use("/api",users_mail)

// const { Gpio } = require('onoff');
// const in1 = new Gpio(22, 'out');
// const in2 = new Gpio(27, 'out');

// // Test motor forward
// in1.writeSync(1);
// in2.writeSync(0);

// // Wait for 5 seconds
// setTimeout(() => {
//     in1.writeSync(0);
//     in2.writeSync(0);
//     in1.unexport();
//     in2.unexport();
//     console.log("motor off")
// }, 5000);

const Gpio = require('onoff').Gpio;
const readline = require('readline');

// Define GPIO pins
const in1 = new Gpio(22, 'out'); // Use GPIO 22 for IN1 on L298N
const in2 = new Gpio(27, 'out'); // Use GPIO 27 for IN2 on L298N
const en = new Gpio(25, 'out');  // Use GPIO 25 for EN on L298N

// Set initial state
let temp1 = 1; // Motor direction (1 for forward, 0 for backward)

// Create an interface for reading input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to set motor speed
function setSpeed(dutyCycle) {
    // PWM is not natively supported in 'onoff', you need another library like 'pigpio' for PWM control
    console.log(`Speed set to ${dutyCycle}%`);
}

// Function to control motor direction and state
function controlMotor(command) {
    switch(command) {
        case 'r':
            console.log('Run');
            if(temp1 === 1) {
                in1.writeSync(1);
                in2.writeSync(0);
                console.log('Forward');
            } else {
                in1.writeSync(0);
                in2.writeSync(1);
                console.log('Backward');
            }
            break;
        case 's':
            console.log('Stop');
            in1.writeSync(0);
            in2.writeSync(0);
            break;
        case 'f':
            console.log('Forward');
            in1.writeSync(1);
            in2.writeSync(0);
            temp1 = 1;
            break;
        case 'b':
            console.log('Backward');
            in1.writeSync(0);
            in2.writeSync(1);
            temp1 = 0;
            break;
        case 'l':
            console.log('Low');
            setSpeed(25);
            break;
        case 'm':
            console.log('Medium');
            setSpeed(50);
            break;
        case 'h':
            console.log('High');
            setSpeed(75);
            break;
        case 'e':
            console.log('Exiting and cleaning up GPIO');
            in1.unexport();
            in2.unexport();
            en.unexport();
            process.exit();
        default:
            console.log('<<< Wrong data >>>');
            console.log('Please enter the defined data to continue...');
    }
}

// Prompt user for input and control the motor
function promptUser() {
    rl.question('Enter command (r-run, s-stop, f-forward, b-backward, l-low, m-medium, h-high, e-exit): ', (input) => {
        controlMotor(input.toLowerCase().trim());
        promptUser();
    });
}

promptUser();




















app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
});

app.listen(process.env.PORT || 5001,()=>{
console.log("api Running in 5001")
});

   

  



// const express = require("express");
// const app = express();
// const cors = require("cors");
// const path = require('path');
// const dotenv = require("dotenv").config();
// const URL = process.env.DB2;
// const users_mail = require("./Routes/UsersMail");
// const startupIO = require("./app-socket"); // Update the path to your app-socket.js file
// const fs = require('fs');

// // Import the http module
// const http = require('http');

// app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).json({ msg: "Api Working" });
// });
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// // Create HTTP server
// const server = http.createServer(app);

// // Use the startupSocketIO function to initialize Socket.io
// startupIO(server);

// // Define endpoint to stream live video from camera
// app.get('/liveStream', function (req, res) {
//     // Set content type to video/mp4
//     res.writeHead(200, {
//         'Content-Type': 'video/mp4',
//         'Connection': 'keep-alive',
//         'Transfer-Encoding': 'chunked'
//     });

//     // Read video file asynchronously and stream it to response
//     const videoFilePath = path.join(__dirname, 'stream.mp4');

//     // Replace with the actual path to your live stream file
//     const videoStream = fs.createReadStream(videoFilePath);
//     videoStream.pipe(res);
// });

// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// //app.use("/api",login)
// app.use("/api", users_mail);


// app.use((err, req, res, next) => {
//     const errorStatus = err.status || 500;
//     const errorMessage = err.message || "Something went wrong!";
//     return res.status(errorStatus).json({
//       success: false,
//       status: errorStatus,
//       message: errorMessage,
//       stack: err.stack,
//     });
// });

// // Use the server variable to listen to the port
// server.listen(process.env.PORT || 5001, () => {
//     console.log("api Running in 5001");
// });


