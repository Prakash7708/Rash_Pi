const { Gpio } = require('onoff'); // Include onoff to interact with the GPIO
const LED = new Gpio(17, 'out'); // Use GPIO pin 17 and specify that it is output

exports.testReq = async function (req, res) {
    try {
        // Turn the pin on to supply power to the LED
        LED.writeSync(1); // Set pin state to 1 (turn LED on)
        console.log('Pin 17 is supplying power to the LED');
        res.status(200).json({ status: "success" });

        // Wait for 3 seconds (you can adjust this time as needed)
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Turn the pin off to stop supplying power to the LED
        LED.writeSync(0); // Set pin state to 0 (turn LED off)
        console.log('Pin 17 is turned off');
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failure", message: "Failed to control GPIO pin" });
    }
};
