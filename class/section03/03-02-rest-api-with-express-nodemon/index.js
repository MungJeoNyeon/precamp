// const express = require("express");  // 옛날 방식 => commonjs
import express from "express"; // module

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
