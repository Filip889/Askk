const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "local";

app.use(express.static("public"));

app.get("/api/info", (req, res) => {
  const now = new Date();

  const polishTime = now.toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
    dateStyle: "full",
    timeStyle: "medium"
  });

  res.json({
    environment: APP_ENV,
    time: polishTime
  });
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
