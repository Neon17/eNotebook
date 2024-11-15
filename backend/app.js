const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: ["http://localhost:3000"]
}

app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    res.json({
        status: 'success',
        message: "concurrently loaded both express and react"
    });
})

let port = 5000;
app.listen((port),(conn)=>{
    console.log(`Successfully connected to http://localhost:${port}`);
})