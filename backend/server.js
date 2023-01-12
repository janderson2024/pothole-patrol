const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Pothole Patrol");
    console.log("Get index successful");
});

const userRouter = require("./routes/user");
const apiRouter = require("./routes/api");

app.use("/user", userRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});