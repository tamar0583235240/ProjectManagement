require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require('mongoose');
// const cookieParser = require("cookie-parser");

const projectsRoutes = require('./routes/projectsRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const statusesRoutes = require('./routes/statusesRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const usersRoutes = require('./routes/usersRoutes');
const organizationsRoutes = require('./routes/organizationsRoutes');
const authRoutes = require('./routes/authRoutes');


const PORT = process.env.PORT || 7001;
const app = express();


connectDB();

// Middlewares
// app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/projects", projectsRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/statuses", statusesRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/organizations", organizationsRoutes);
app.use("/api/auth",authRoutes )



// Home route
app.get("/", (req, res) => {
    res.send("this is the home page");
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err);
});