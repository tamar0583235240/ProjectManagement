require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require('mongoose');

const projectsRoutes = require('./routes/projectsRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const usersRoutes = require('./routes/usersRoutes');
const organizationsRoutes = require('./routes/organizationsRoutes');
const authRoutes = require('./routes/authRoutes');
const inviteRoutes = require('./routes/inviteRoutes');



const PORT = process.env.PORT || 7001;
const app = express();


connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/projects", projectsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/organizations", organizationsRoutes);
app.use("/api/auth",authRoutes )
app.use('/api/invite', inviteRoutes);


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