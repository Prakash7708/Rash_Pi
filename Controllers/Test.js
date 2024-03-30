const gpio = require('rpi-gpio');

exports.testReq = async function (req, res) {
    try {
        // Set up GPIO pin 17 as an output for powering the LED
        gpio.setup(17, gpio.DIR_OUT, async function(err) {
            if (err) {
                throw err;
            }

            // Turn the pin on to supply power to the LED
            gpio.write(17, true, function(err) {
                if (err) {
                    throw err;
                }
                console.log('Pin 17 is supplying power to the LED');
                res.status(200).json({ status: "success" });
            });

            // Wait for 3 seconds (you can adjust this time as needed)
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Turn the pin off to stop supplying power to the LED
            gpio.write(17, false, function(err) {
                if (err) {
                    throw err;
                }
                console.log('Pin 17 is turned off');
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failure", message: "Failed to control GPIO pin" });
    }
};
