const asyncErrorHandler = (func)=>{
    return (req,res,next)=>{
        (func(req,res,next)).catch((err)=>{
            res.status(200);
            res.json({
                status: 'error',
                message: err.message
            })   
        })
    }
}

module.exports = asyncErrorHandler;