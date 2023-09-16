// import express
const express = require("express")(); // create an instance of the express application.
const PORT = 8000;

const app = express();
app.use(express.json());

// Routing

// middleware
app.use((req, res) => {
  console.log(`404: ${req.url}`);
  req.status(404).json({
    msg: "Not Found Broo",
  });
});

app.use((err, req, res, next) => {
  console.log(`500: ${req.url}`);
  console.log(error);
  req.status(500).json({
    msg: "Internal Server Error Broo",
    error,
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT} Gilee`);
});
