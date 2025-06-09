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

app.use(cors({
  origin: [
    'https://projectmanagement-1-d01r.onrender.com', 
    'http://localhost:5173' 
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.static("public"));

app.use("/api/projects", projectsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/organizations", organizationsRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/invite', inviteRoutes);

app.get("/app", (req, res) => {
  res.json({ message: "Backend API is running!" });
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err);
});