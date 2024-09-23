const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const { connectDb } = require("./db");

connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
    res.send("hello there");
    console.log("hello");
})

app.listen(3000, (req, res) => {
    console.log("server listening")
})


