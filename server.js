const http = require("http");
const express = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
// build an express app
const app = express()
  // serve static files from static folder
  .use("/", express.static("static"))

  .post("/test", upload.single("profile-image"), (_, res) => {
    res.writeHead(204);
    res.end();
  });
const server = http.createServer(app);
server.listen(8800);
