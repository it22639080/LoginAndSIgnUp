require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT | 3000;

app.use(express.json())
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect("mongodb+srv://kavindu:Kavindu2000@cluster0.g9sbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB connection successful"))
.catch((err) => console.log("MongoDB connection error:", err));


app.listen(PORT | 3000, ()=>{
    console.log(`server is started on port ${PORT}`);
    
 });
