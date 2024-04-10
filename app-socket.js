// app-socket.js

module.exports = startupSocketIO = server => {
    const io = require('socket.io')(server);

    /**
     * Listening on io.
     */
    io.of("iot").on("connection", socket => {
        // Your socket connection handling logic
    });

    io.sockets.on("error", e => console.log(e));

    return io;
}
