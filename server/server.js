// // const express = require("express");
// // const cors = require("cors");
// // const path = require("path");
// // const { Server } = require("socket.io");
// // require("dotenv").config();
// // require("./db/conn");
// // require("./controllers/socket");
// // const userRouter = require("./routes/userRoutes");
// // const doctorRouter = require("./routes/doctorRoutes");
// // const appointRouter = require("./routes/appointRoutes");
// // const notificationRouter = require("./routes/notificationRouter");

// // const app = express();
// // const port = process.env.PORT || 5015;

// // app.use(cors());
// // app.use(express.json());
// // app.use("/api/user", userRouter);
// // app.use("/api/doctor", doctorRouter);
// // app.use("/api/appointment", appointRouter);
// // app.use("/api/notification", notificationRouter);
// // app.use(express.static(path.join(__dirname, "./client/build")));


// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// // });

// // app.get("/ss",(req, res)=>{
// //   return "Hii";
// // })

// // const server = app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });

// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");
// require("dotenv").config();
// require("./db/conn"); // MongoDB connection
// require("./controllers/socket"); // Optional: socket setup if used

// const userRouter = require("./routes/userRoutes");
// const doctorRouter = require("./routes/doctorRoutes");
// const appointRouter = require("./routes/appointRoutes");
// const notificationRouter = require("./routes/notificationRouter");

// const app = express();
// const port = process.env.PORT || 5015;

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // API Routes
// app.use("/api/user", userRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/appointment", appointRouter);
// app.use("/api/notification", notificationRouter);

// // Serve frontend build if exists
// const buildPath = path.join(__dirname, "client", "build");

// if (fs.existsSync(buildPath)) {
//   app.use(express.static(buildPath));

//   app.get("*", (req, res) => {
//     const indexPath = path.join(buildPath, "index.html");
//     if (fs.existsSync(indexPath)) {
//       res.sendFile(indexPath);
//     } else {
//       res.status(404).send("index.html not found");
//     }
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API running — no frontend build found");
//   });
// }

// // Test route
// app.get("/ss", (req, res) => {
//   res.send("Hi");
// });

// // Start server
// const server = app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// const connectDB = require("./db/conn"); // Fixed here
const connectDB = require("./db/conn.js");
const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const appointRouter = require("./routes/appointRoutes");
const notificationRouter = require("./routes/notificationRouter");

const app = express();
const port = process.env.PORT || 5015;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);

// Serve frontend build if it exists
const buildPath = path.join(__dirname, "client", "build");

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    const indexPath = path.join(buildPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("index.html not found");
    }
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running — no frontend build found");
  });
}

// Test route
app.get("/ss", (req, res) => {
  res.send("Hi from /ss route");
});

// Start server
const server = app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
