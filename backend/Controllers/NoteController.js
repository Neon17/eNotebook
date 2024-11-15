const Note = require('./../Models/Note');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./backend/sampleData.json','utf8'));

exports.getNotes = (req,res)=>{
    res.json({
        status: 'success',
        data: data
    });   
}
