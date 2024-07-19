
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const authRoute = require("./routes/auth");
const database = require("./config/database");

database.connect();

require("./passport"); 

app.use(express.json());
app.use(cookieParser());

app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 1000,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});
