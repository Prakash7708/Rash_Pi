// const { Gpio } = require('onoff'); // Include onoff to interact with the GPIO
// const LED = new Gpio(17, 'out'); // Use GPIO pin 17 and specify that it is output
// let isLedOn = false; // Variable to track the LED state

// exports.testReq= async function (req, res) {
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


const { Gpio } = require('onoff');

// Define GPIO pins for Motor 1
const in1 = new Gpio(22, 'out'); // IN1 on L298N for Motor 1
const in2 = new Gpio(27, 'out'); // IN2 on L298N for Motor 1

// Define GPIO pins for Motor 2
const in3 = new Gpio(23, 'out'); // IN3 for Motor 2
const in4 = new Gpio(24, 'out'); // IN4 for Motor 2

// Variables to track motor states
let isMotor1On = false;
let isMotor2On = false;

// Function to drive Motor 1 forward
function motor1Forward() {
    console.log('Motor 1 forward');
    in1.writeSync(1);
    in2.writeSync(0);
}

// Function to stop Motor 1
function motor1Stop() {
    in1.writeSync(0);
    in2.writeSync(0);
}

// Function to drive Motor 2 forward
function motor2Forward() {
    console.log('Motor 2 forward');
    in3.writeSync(1);
    in4.writeSync(0);
}

// Function to stop Motor 2
function motor2Stop() {
    in3.writeSync(0);
    in4.writeSync(0);
}

exports.testReq = async function (req, res) {
    try {
        const { motor } = req.query; // Check which motor to control from query parameter

        if (motor === '1') {
            // Toggle Motor 1 state
            isMotor1On = !isMotor1On;
            if (isMotor1On) {
                motor1Forward();
                console.log("Motor 1 on");
            } else {
                motor1Stop();
                console.log("Motor 1 off");
            }
        } else if (motor === '2') {
            // Toggle Motor 2 state
            isMotor2On = !isMotor2On;
            if (isMotor2On) {
                motor2Forward();
                console.log("Motor 2 on");
            } else {
                motor2Stop();
                console.log("Motor 2 off");
            }
        }

        // Send response with both motor statuses
        res.status(200).json({
            status: "success",
            motorStatus: { isMotor1On, isMotor2On }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failure", message: "Failed to control GPIO pins" });
    }
};

// Cleanup GPIO on exit
process.on('SIGINT', () => {
    in1.unexport();
    in2.unexport();
    in3.unexport();
    in4.unexport();
    process.exit();
});



// // Define GPIO pins for motor control
// const { Gpio } = require('onoff');
// const in1 = new Gpio(22, 'out'); // Use GPIO 22 for IN1 on L298N
// const in2 = new Gpio(27, 'out'); // Use GPIO 27 for IN2 on L298N

// // Variable to track motor state
// let isMotorOn = false;

// // Function to drive motor forward
// function motorForward() {
//     console.log('forward')
//     in1.writeSync(1);
//     in2.writeSync(0);
// }

// // Function to stop the motor
// function motorStop() {
//     in1.writeSync(0);
//     in2.writeSync(0);
// }

// exports.testReq = async function (req, res) {
//     try {
//         // Toggle motor state
//         isMotorOn = !isMotorOn;

//         // Set the motor state based on the isMotorOn value
//         if (isMotorOn) {
//             motorForward();
         
//             console.log("motor on")
//         } else {
//             motorStop();
//             console.log("motor off")
//         }

//         res.status(200).json({ status: "success", isMotorOn });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: "failure", message: "Failed to control GPIO pin" });
//     }
// };

// // Cleanup GPIO on exit
// process.on('SIGINT', () => {
//     in1.unexport();
//     in2.unexport();
//     process.exit();
// });














// const { Gpio } = require('onoff');

// // Define GPIO pins for motor control
// const in1 = new Gpio(22, 'out'); // IN1 on L298N connected to GPIO 22
// const in2 = new Gpio(27, 'out'); // IN2 on L298N connected to GPIO 27

// // Variable to track motor state
// let isMotorOn = false;

// // Function to drive motor forward
// function motorForward() {
//     console.log('Driving motor forward');
//     in1.writeSync(1); // Set IN1 high
//     in2.writeSync(0); // Set IN2 low
// }

// // Function to stop the motor
// function motorStop() {
//     console.log('Stopping motor');
//     in1.writeSync(0); // Set IN1 low
//     in2.writeSync(0); // Set IN2 low
// }

// // Function to handle incoming requests
// exports.testReq = async function (req, res) {
//     try {
//         // Toggle motor state
//         isMotorOn = !isMotorOn;

//         // Set the motor state based on the isMotorOn value
//         if (isMotorOn) {
//             motorForward();
//             console.log("Motor is ON");
//         } else {
//             motorStop();
//             console.log("Motor is OFF");
//         }

//         res.status(200).json({ status: "success", isMotorOn });
//     } catch (error) {
//         console.error('Failed to control GPIO pin:', error);
//         res.status(500).json({ status: "failure", message: "Failed to control GPIO pin" });
//     }
// };

// // Cleanup GPIO on exit
// process.on('SIGINT', () => {
//     in1.writeSync(0); // Ensure motor is stopped
//     in2.writeSync(0); // Ensure motor is stopped
//     in1.unexport();   // Free resources
//     in2.unexport();   // Free resources
//     process.exit();   // Exit the process
// });


