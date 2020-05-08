const Comment = require('../models/comment.model.js');

// Create and Save a new Note
//async function createNote(req,res){
//    console.log("sonu");
//}
//module.exports={createNote}
//exports.createNote=createNote;
exports.create = (req, res) => {
    // Validate request
    if(!req.body.senderCode) {
        return res.status(400).send({"status":"400",
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const comment = new Comment({
        senderCode: req.body.senderCode || "Untitled Note",
        senderName: req.body.senderName, 
        reciverCode: req.body.reciverCode,
        reciverName: req.body.reciverName, 
        chapter: req.body.chapter,
        message:req.body.message,
        workId:req.body.workId,
        type:req.body.type,
        status:req.body.status
    });

    // Save Note in the database
    comment.save()
    .then(data => {
        if(data){
            var resData={"status":"201",
        "message":"Order cretae sucessfully!"}
        }
        res.status(201).send(resData);
    }).catch(err => {
        res.status(500).send({"status":"500",
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Comment.find({$and:[{$or:[ {'senderCode':req.body.senderCode}, {'reciverCode':req.body.senderCode},{'senderCode':req.body.teacher} ]},{'workId':req.body.workId}]})
    .then(comments => {
        var data ={"data":comments,"status":"200"}
        res.send(data);
    }).catch(err => {
        res.status(500).send({"status":"500",
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
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
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
