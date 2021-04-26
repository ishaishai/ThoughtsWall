const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const usersRoutes = require("./routes/users.routes");
const thoughtsRoutes = require("./routes/thoughts.routes");
const commentsRoutes = require("./routes/comments.routes");
const authRoutes = require("./routes/auth.routes");
const chatsRoutes = require("./routes/chats.routes");
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

const PORT = process.env.PORT || 5000;
app.use(express.static(__dirname + "/client/build"));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/thoughts", thoughtsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/chats", chatsRoutes);

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});
