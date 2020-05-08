const Teacher = require('../models/teacher.model.js');

// Create and Save a new Note
//async function createNote(req,res){
//    console.log("sonu");
//}
//module.exports={createNote}
//exports.createNote=createNote;
exports.create = (req, res) => {
    console.log("create")
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({"status":"400",
            message: "Note content can not be empty"
        });
    }

    // Create a teacher
    const teacher = new Teacher({
        mobile: req.body.mobile || "Untitled teacher",
        name: req.body.name, 
        subject: req.body.subject,
        teachCode: req.body.teachCode,
        classList: req.body.classList,
        status:req.body.status
    });

    // Save teacher in the database
    teacher.save()
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

// Retrieve and return all teacher from the database.
exports.findAll = (req, res) => {
    Teacher.find({status:true})
    .then(teachers => {
        var data ={"data":teachers}
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single teacher with a teacher
exports.findOne = (req, res) => {
    Teacher.findById(req.params.teachCode)
    .then(teacher => {
        if(!teacher) {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.teachCode
            });            
        }
        res.send(teacher);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.teachCode
            });                
        }
        return res.status(500).send({
            message: "Error retrieving teacher with id " + req.params.teachCode
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Teacher.findByIdAndUpdate(req.params.teachCode, {
        name: req.body.name || "Untitled teachCode",
        subject: req.body.subject
    }, {new: true})
    .then(teacher => {
        if(!teahcer) {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.noteId
            });
        }
        res.send(teacher);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating teahcer with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.teachCode)
    .then(teachers => {
        if(!teachers) {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.noteId
            });
        }
        res.send({message: "Teacher deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete teacher with id " + req.params.noteId
        });
    });
};
