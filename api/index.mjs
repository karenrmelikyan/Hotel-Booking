import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.mjs";
import usersRoute from "./routes/users.mjs";
import hotelsRoute from "./routes/hotels.mjs";
import roomsRoute from "./routes/rooms.mjs";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// Middlewares
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

// Routes errors handler
// app.use((err, req, res) => {
//     const errorStatus = err.statusCode || 500;
//     const errMessage = err.statusMessage || 'Something went wrong';
//     return res.status(errorStatus).json({
//         success: false,
//         status: errorStatus,
//         message: errMessage,
//         stack: err.stack,
//     })
// })

// Server and mongo db connects
app.listen(process.env.PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to Mongo DB.');
        console.log(`Server listen PORT: ${process.env.PORT}`);
    } catch (error) {
        console.log(error.message);
    }
});