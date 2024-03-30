const { Gpio } = require('onoff'); // Include onoff to interact with the GPIO
const LED = new Gpio(17, 'out'); // Use GPIO pin 17 and specify that it is output
let isLedOn = false; // Variable to track the LED state

exports.testReq = async function (req, res) {
    try {
        // Toggle the LED state
        isLedOn = !isLedOn;

        // Set the pin state based on the LED state
        LED.writeSync(isLedOn ? 1 : 0);

        // Log the LED state
        console.log(`Pin 17 is ${isLedOn ? 'supplying power to' : 'turned off' } the LED`);

        // Send response
        res.status(200).json({ status: "success", isLedOn });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failure", message: "Failed to control GPIO pin" });
    }
};
