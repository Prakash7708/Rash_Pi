const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv").config();
const URL = process.env.DB2;
const users_mail = require("./Routes/UsersMail");
const startupIO = require("./app-socket"); // Update the path to your app-socket.js file
const fs = require('fs');

// Import the http module
const http = require('http');

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({ msg: "Api Working" });
});
app.use(
  cors({
    origin: "*",
  })
);

// Create HTTP server
const server = http.createServer(app);

// Use the startupSocketIO function to initialize Socket.io
startupIO(server);

// Define endpoint to stream live video from camera
app.get('/liveStream', function (req, res) {
    // Set content type to video/mp4
    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Connection': 'keep-alive',
        'Transfer-Encoding': 'chunked'
    });

    // Read video file asynchronously and stream it to response
    const videoFilePath = '/path/to/your/live/stream/file.mp4'; // Replace with the actual path to your live stream file
    const videoStream = fs.createReadStream(videoFilePath);
    videoStream.pipe(res);
});

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//app.use("/api",login)
app.use("/api", users_mail);


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

// Use the server variable to listen to the port
server.listen(process.env.PORT || 5001, () => {
    console.log("api Running in 5001");
});





















// const express = require("express");
// const app = express();
// const cors = require("cors");
// const path = require('path');
// const dotenv = require("dotenv").config();
// const URL = process.env.DB2;
// const users_mail=require("./Routes/UsersMail")

// app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).json({ msg: "Api Working" });
// });
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// //app.use("/api",login)
// app.use("/api",users_mail)


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

// app.listen(process.env.PORT || 5001,()=>{
// console.log("api Running in 5001")
// });

   

  