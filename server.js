/**
 * @file server file to run the ports
 */

const express = require("express");
const app = express();

app.get("/hello", (req, res) => res.send("Hello World!"));

const PORT = 5000;
app.listen(PORT);
