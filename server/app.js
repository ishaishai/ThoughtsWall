const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const usersRoutes = require("./routes/users.routes");
const thoughtsRoutes = require("./routes/thoughts.routes");
const commentsRoutes = require("./routes/comments.routes");
const authRoutes = require("./routes/auth.routes");
const logRoutes = require("./routes/log.routes");
const morgan = require("morgan");
const cors = require("cors");
//mongoose set
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const dbInstance = mongoose.connection;

dbInstance.on("error", (error) => console.error(error));
dbInstance.once("open", () => console.log("Connected to database"));
//////////////////////////////

const PORT = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/log", logRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/thoughts", thoughtsRoutes);
app.use("/api/comments", commentsRoutes);

app.listen(5000, () => {
  console.log(`Server listening on port ${PORT}`);
});
