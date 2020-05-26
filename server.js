const express = require("express");
const path = require("path");
const expressStaticGzip = require("express-static-gzip");

const port = 80;
const app = express();

app.use("/", expressStaticGzip("dist/", {
    index: "index.html",
    enableBrotli: true,
    orderPreference: ["br", "gz"],
}));
// the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, "dist")));
app.get("/ping", function (req, res) {
    return res.send("pong");
});
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port);
