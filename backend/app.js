const express = require('express');
const app = express();

const cors = require('cors');
//selected website to be allowed to fetch data from this site
const corsOptions = {
    origin: [
        "http://localhost:3000/notes",
        "http://localhost:3000"
    ]
}

app.use(cors(corsOptions));

const noteRouter = require('./routes/NoteRouter');

app.get('/',(req,res)=>{
    res.json({
        status: 'success',
        message: "concurrently loaded both express and react"
    });
})

app.use('/api/v1/notes',noteRouter);

module.exports = app;
