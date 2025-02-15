const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const productRoute = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes.js")
const cors = require("cors");
const dotenv = require("dotenv")

app.use("/api/product", productRoute);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Victor, welcome to whoba Ogo foundation");
});

app.listen(6000, () => {
  console.log("server is running in port 6000");
});

mongoose
  .connect(
    
  )
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("database not connected");
  });
