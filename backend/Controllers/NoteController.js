const Note = require('./../Models/Note');
const asyncErrorHandler = require('./../utils/AsyncErrorHandler');

exports.getNotes = asyncErrorHandler(async (req,res)=>{
    const globalNotes = await Note.find({$or: [{"createdBy": {$exists: false}},{"visibility": 'Global'}]});
    // let i = 0,len = globalNotes.length;
    // for (i=0;i<len;i++){
    //     // console.log(globalNotes[i].createdBy==undefined);
    //     // if (globalNotes[i].createdBy!=undefined){
    //     //     console.log(globalNotes[i].createdBy);
    //     //     console.log(req.user._id);
    //     // }
    //     if (globalNotes[i].createdBy==req.user._id){
    //         console.log('nice');
    //     }
    //     if ((globalNotes[i].createdBy!=undefined)&&(globalNotes[i].createdBy==req.user._id)){
    //         console.log('hello');
    //         delete globalNotes[i];
    //     }
    // }
    const localNotes = await Note.find({"createdBy": req.user._id})
    // console.log(req.user.name);
    res.json({
        status: 'success',
        globalNotes,
        localNotes
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
        req.body.createdBy = req.user._id;
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
