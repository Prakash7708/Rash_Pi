

const gpio = require('rpi-gpio');

exports.testReq = async function (req, res) {
    try {
        // Set up GPIO pin 1 as an output for powering the LED
        gpio.setup(1, gpio.DIR_OUT, async function(err) {
            if (err) {
                throw err;
            }

            // Turn the pin on to supply power to the LED
            gpio.write(1, true, function(err) {
                if (err) {
                    throw err;
                }
                console.log('Pin 1 (3.3V) is supplying power to the LED');
                res.status(200).json({ status: "success" });
            });

            // Wait for 1 second (you can adjust this time as needed)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Turn the pin off to stop supplying power to the LED
            gpio.write(1, false, function(err) {
                if (err) {
                    throw err;
                }
                console.log('Pin 1 (3.3V) is turned off');
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failure", message: "Failed to control GPIO pin" });
    }
};
