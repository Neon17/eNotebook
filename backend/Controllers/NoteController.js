const Note = require('./../Models/Note');
const fs = require('fs');

exports.getNotes = async (req,res)=>{
    const data = await Note.find({});
    res.json({
        status: 'success',
        data: data
    });   
}

exports.postNotes = async (req,res)=>{
    try {
        const note = await Note.create(req.body);
        res.status(200);
        res.json({
            status: 'success',
            note: note
        })
    }
    catch (error){
        res.json({
            status: 'error',
            message: error.message
        })
    }    
}
