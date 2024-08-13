import express, { response } from "express";
import { PORT } from "./config.js";
import mongoose, { mongo } from "mongoose";
import { MONGO_URI } from "./config.js";
import { Book } from "./models/bookModal.js";
import booksRoute from "./routes/booksRoute.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
app.use(express.json());
app.use(
    cors({
        origin: "https://bookstore-sigma-two.vercel.app/",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.get("/", (req, res) => {
    return res.status(200).send("Hello World");
});

app.use("/books", booksRoute);

mongoose
    .connect(MONGO_URI)
    .then((result) => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${process.env.MONGO_URI}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
