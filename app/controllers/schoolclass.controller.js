const SchoolClass = require('../models/schoolclass.model.js');

// Create and Save a new Note
//async function createNote(req,res){
//    console.log("sonu");
//}
//module.exports={createNote}
//exports.createNote=createNote;
exports.create = (req, res) => {
    console.log("create")
    // Validate request
    if(!req.body.className) {
        return res.status(400).send({"status":"400",
            message: "Note content can not be empty"
        });
    }

    // Create a teacher
    const schoolclass = new SchoolClass({
        className: req.body.className || "Untitled teacher",
        classCode: req.body.classCode, 
        subject: req.body.subject,
        subjectList: req.body.subjectList,
        techList: req.body.techList,
        status:req.body.status
    });

    // Save teacher in the database
    schoolclass.save()
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
    SchoolClass.find({status:true})
    .then(schoolclass => {
        var data ={"data":schoolclass}
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single teacher with a teacher
exports.findOne = (req, res) => {
    var classCode=req.body.classCode;
    SchoolClass.find({classCode:classCode})
    .then(schoolclass => {
        if(!schoolclass) {
            return res.status(404).send({
                message: "Teacher not found with id " + req.body.classCode
            });            
        }
        if(schoolclass.length>0){
            var data={status:"200",
        data:schoolclass[0]}
        res.send(data);
        }else{
            var data={status:"404",
            data:schoolclass[0]}
            res.send(data);
        }
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Teacher not found with id " + req.body.classCode
            });                
        }
        return res.status(500).send({
            message: "Error retrieving teacher with id " + req.body.classCode
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.classCode) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Teacher.findByIdAndUpdate(req.params.classCode, {
        classCode: req.body.classCode || "Untitled teachCode",
        className: req.body.className
    }, {new: true})
    .then(schoolclass => {
        if(!schoolclass) {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.classCode
            });
        }
        res.send(schoolclass);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.classCode
            });                
        }
        return res.status(500).send({
            message: "Error updating teahcer with id " + req.params.classCode
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.teachCode)
    .then(schoolclass => {
        if(!schoolclass) {
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
