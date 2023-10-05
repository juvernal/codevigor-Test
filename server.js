const express = require("express");
const morgan = require("morgan");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

bodyParser = require("body-parser");
jsonwebtoken = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
// Middleware
app.use(express.json());

//jwt implementation

app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    if (req.url.includes("/api/auth")) {
      next();
    } else {
      res.json({
        message: " Unauthorized user!! please login and try again",
      });
    }
  }
});

app.use("/api/book/", bookRoutes);
app.use("/api/auth/", userRoutes);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
