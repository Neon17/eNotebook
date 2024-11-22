const Note = require('./../Models/Note');
const asyncErrorHandler = require('./../utils/AsyncErrorHandler');

exports.getNotes = asyncErrorHandler(async (req,res)=>{
    const data = await Note.find({});
    res.json({
        status: 'success',
        data: data
    });   
})

exports.getNote = asyncErrorHandler(async (req,res)=>{
    const id = req.params.id
    const data = await Note.findById(id);
    if (!data)
        throw new Error("A movie with that ID doesn't exists");
    res.status(200);
    res.json({
        status: 'success',
        data: data
    })
})

exports.updateNote = async (req,res)=>{
    try {
        if (!req.params.id)
            throw new Error("Invalid URL");
        const id = req.params.id;
        let data = await Note.findById(id);
        if (!data)
            throw new Error("Invalid ID");
        let updatedData = await Note.findByIdAndUpdate(id,req.body,{new: true, runValidators: true});
        res.json({
            status: 'success',
            data: updatedData
        })
    }
    catch (error){
        res.json({
            status: 'error',
            message: error.message
        })
    }
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
        res.status(404);
        res.json({
            status: 'error',
            message: error.message
        })
    }    
}

exports.deleteNote = async(req,res)=>{
    try {
        if (!req.params.id)
            throw new Error("Invalid ID");
        const id = req.params.id;
        let data = await Note.findById(id);
        if (!data)
            throw new Error("No note of that ID found!");
        await Note.findByIdAndDelete(id);
        res.status(200);
        res.json({
            status: 'success',
            data: data
        })
    }
    catch (error){
        res.status(404); 
        res.json({
            status: 'error',
            message: error.message
        })
    }
}
