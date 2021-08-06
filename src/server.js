const express = require("express");
const cors = require("cors");
const botRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(botRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
    },
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`port ${PORT}`));

module.exports = app;
