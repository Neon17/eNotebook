const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({path: './backend/config.env'});

let connStr = process.env.DB_CONN_STR;
mongoose.connect(connStr)
.then((conn)=>{
    console.log('Successfully Connected to Database');
})
.catch((err)=>{
    console.log('Error! '+err);
});

let port = process.env.PORT || 5000;
app.listen((port),(conn)=>{
    console.log(`Successfully connected to http://localhost:${port}`);
})
