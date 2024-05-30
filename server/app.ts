import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express, { Express } from "express";
import morgan from "morgan";
import { Server } from "socket.io";
// extra security
// const helmet = require('helmet');
// const xss = require('xss-clean');
import cors from "cors";
import rateLimiter from "express-rate-limit";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(morgan("dev"));

// connectDB
import connectDB from "./db/connect";
// const authenticateUser = require("./middleware/authentication");

// // routers
import authRouter from "./routes/auth";
import eventRouter from "./routes/server";
import subEventRouter from "./routes/subEvent";
import channelRouter from "./routes/channel";

import inviteRouter from "./routes/invite";

import meetingRouter from "./routes/meeting";

import groupRouter from "./routes/group";

import calenderRouter from "./routes/calender";

import messageRouter from "./routes/message";

// // error handler
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import { Socket } from "dgram";

app.set("trust proxy", 1);

app.use(
  rateLimiter({
    windowMs: 5 * 60 * 1000, //5 minutes
    max: 300,
  }),
);

const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin: string | undefined, callback: any) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    optionsSuccessStatus: 204,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
// extra packages
// app.use(helmet());
// app.use(cors());
// app.use(xss());

// routes
app.use("/", express.static("../client/dist"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/subEvent", subEventRouter);
app.use("/api/v1/channel", channelRouter);
app.use("/api/v1/invite", inviteRouter);
app.use("/api/v1/meeting", meetingRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/calender", calenderRouter);
app.use("/api/v1/message", messageRouter);


app.use("*", express.static("../client/dist/index.html"));
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (typeof mongoUri === "undefined") {
      console.log("MONGO_URI not provided");
      console.log("exiting");
      return;
    }
    await connectDB(mongoUri);
    const server = app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );

    // sockets-

    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:3000",
      },
    });

    io.on("connection", (socket: any) => {
      console.log("socket connection established", socket.id);
      socket.on("setup", (userData: any) => {
        socket.join(userData._id);
        socket.emit("connected");
      });

      socket.on("join-chat", (room: any) => {
        socket.join(room);
        console.log("user joined room", room);
      });

      socket.on("new-message", (newMessageRecieved: any) => {
        var chat = newMessageRecieved.chat;
        chat.users.forEach((user: any) => {
          if (user._id == newMessageRecieved.sender._id) {
            return;
          }
          socket.in(user._id).emit("message-received", newMessageRecieved);
        });
      });

      socket.on("typing", (room: any) => {
        socket.in(room).emit("typing");
      });

      socket.on("stop-typing", (room: any) => {
        socket.in("room").emit("stop-typing");
      });

      socket.off("setup", (userData: any) => {
        console.log("user disconnected");
        socket.leave(userData._id);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();
