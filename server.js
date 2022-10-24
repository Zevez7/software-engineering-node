const express = require("express");
const app = express();

/**
 * @file server file to run the ports
 */
app.get("/hello", (req, res) => res.send("Hello World!"));

const PORT = 4000;
app.listen(PORT);
