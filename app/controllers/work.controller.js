const Work = require('../models/work.model.js');
var multer = require('multer');



exports.saveMedia = (req, res) => {
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "./public/images");
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + '-' + file.originalname);
            }
        });

        const upload = multer({storage: storage}).any('file');

        upload(req, res, (err) => {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            }
            let results = req.files.map((file) => {
                return {


                    mediaName: file.filename,
                    image:req.body.image,
                    origMediaName: file.originalname,
                    mediaSource: 'https://raashan123.herokuapp.com/images/' + file.filename
                }
            });
            var image=results[0].mediaSource
            console.log("image",image)
            const work = new Work({
                code: req.body.code || "Untitled Note",
                name: req.body.name, 
                classCode: req.body.classCode,
                subCode: req.body.subCode, 
                subName: req.body.subName,
                chapterName:req.body.chapterName,
                remark: req.body.remark, 
                work:results[0].mediaSource,
                workAt:req.body.workAt,
                status:req.body.status
            });
        
            // Save Note in the database
            work.save()
            .then(data => {
                if(data){
                    upload(req, res, function(err) {
                        if (err) {
                            return res.end("Something went wrong!");
                        }else{
                            var resData={"status":"201",
                            "message":"work cretae sucessfully!"}
                            res.send(resData);
                        }
                        
                    });
        
                   
                }else{
                    var resData={"status":"409",
                    "message":"work cretae sucessfully!"}
                    res.send(resData);
                }
                //res.status(201).send(resData);
            }).catch(err => {
                res.status(500).send({"status":"500",
                    message: err.message || "Some error occurred while creating the Note."
                });
            });
            //res.status(200).json(results);
        });
}
exports.create = (req, res) => {
    // Validate request
    

    // Create a Note
    const work = new Work({
        code: req.body.code || "Untitled Note",
        name: req.body.name, 
        classCode: req.body.classCode,
        subCode: req.body.subCode, 
        subName: req.body.subName,
        chapterName:req.body.chapterName,
        remark: req.body.remark, 
        work: req.body.work,
        workAt:req.body.workAt,
        status:req.body.status
    });

    // Save Note in the database
    work.save()
    .then(data => {
        if(data){
            upload(req, res, function(err) {
                if (err) {
                    return res.end("Something went wrong!");
                }else{
                    var resData={"status":"201",
                    "message":"work cretae sucessfully!"}
                    res.send(resData);
                }
                
            });

           
        }else{
            var resData={"status":"409",
            "message":"work cretae sucessfully!"}
            res.send(resData);
        }
        //res.status(201).send(resData);
    }).catch(err => {
        res.status(500).send({"status":"500",
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Work.find({status:true})
    .then(work => {
        var data ={"data":work}
        res.send({data:data});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    var id=req.body.id;
    Work.find({_id:id})
    .then(work => {
        if(!work) {
            return res.status(404).send({
                status:"404",
                message: "Note not found with id " + req.params.noteId
            });            
        }
        if(work.length>0){
            res.send({data:work[0]});
        }else{
            res.send({data:work[0],status:"404"});
        }
       
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                status:"404",
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            status:"500",
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};
exports.findWork = (req, res) => {
    var subCode=req.body.subCode;
    var classCode=req.body.classCode;
    var workAt=req.body.workAt;
    //
    Work.find({subCode:subCode,classCode:classCode,workAt})
    .then(work => {
        if(!work) {
            return res.status(404).send({
                status:"404",
                message: "Note not found with id " + req.params.noteId
            });            
        }
        if(work.length>0){
            res.send({data:work,status:"200"});
        }else{
            res.send({data:work[0],status:"404"});
        }
       
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                status:"404",
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            status:"500",
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Work.findByIdAndRemove(req.body.id)
    .then(work => {
        if(!work) {
            return res.status(404).send({
                status:"404",
                message: "work not found with id " + req.params.noteId
            });
        }
        res.send({status:"201",message: "work deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                status:"404",
                message: "work not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            status:"500",
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
