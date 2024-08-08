const { Gpio } = require('onoff'); // Include onoff to interact with the GPIO
// const LED = new Gpio(17, 'out'); // Use GPIO pin 17 and specify that it is output
// let isLedOn = false; // Variable to track the LED state

// exports.testReq_0 = async function (req, res) {
//     try {
//         // Toggle the LED state
//         isLedOn = !isLedOn;

//         res.status(200).json({ status: "success", isLedOn });

//         // Set the pin state based on the LED state
//         LED.writeSync(isLedOn ? 1 : 0);

//         // Log the LED state
//         console.log(`Pin 17 is ${isLedOn ? 'supplying power to' : 'turned off' } the LED`);

//         // Send response
//         // res.status(200).json({ status: "success", isLedOn });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: "failure", message: "Failed to control GPIO pin" });
//     }
// };



// Define GPIO pins for motor control
const in1 = new Gpio(22, 'out'); // Use GPIO 22 for IN1 on L298N
const in2 = new Gpio(27, 'out'); // Use GPIO 27 for IN2 on L298N

// Variable to track motor state
let isMotorOn = false;

// Function to drive motor forward
function motorForward() {
    in1.writeSync(1);
    in2.writeSync(0);
}

// Function to stop the motor
function motorStop() {
    in1.writeSync(0);
    in2.writeSync(0);
}

exports.testReq = async function (req, res) {
    try {
        // Toggle motor state
        isMotorOn = !isMotorOn;

        // Set the motor state based on the isMotorOn value
        if (isMotorOn) {
            motorForward();
        } else {
            motorStop();
        }

        res.status(200).json({ status: "success", isMotorOn });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failure", message: "Failed to control GPIO pin" });
    }
};

// Cleanup GPIO on exit
// process.on('SIGINT', () => {
//     in1.unexport();
//     in2.unexport();
//     process.exit();
// });