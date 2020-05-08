const Student = require('../models/student.model.js');
const Teacher = require('../models/teacher.model.js');
const SchoolClass = require('../models/schoolclass.model.js');

// Create and Save a new Student
//async function createStudent(req,res){
//    console.log("sonu");
//}
//module.exports={createStudent}
//exports.createStudent=createStudent;
async function getsubjectList(classCode){
    console.log("classCode",classCode);
    SchoolClass.find({classCode:classCode})
    .then(schoolclass => {
        if(!schoolclass) {
            return res.status(404).send({
                message: "Teacher not found with id " + classCode

            });            
        }
        var data=[];
        console.log(schoolclass)
        data=schoolclass;
        return schoolclass;
    }).catch(err => {
        console.log(err)
        var data=[];
        return data;
    });
}
exports.create = (req, res) => {
    // Validate request
    if(!req.body.stuName) {
        return res.status(400).send({"status":"400",
            message: "Student content can not be empty"
        });
    }

    // Create a Student
    const student = new Student({
        stuName:req.body.stuName || "Untitled Student",
        mobile:req.body.mobile,
        className:req.body.className,
         classCode:req.body.classCode,
        stuCode:req.body.stuCode,
    fatherName:req.body.fatherName,
    motherName:req.body.motherName,
    address:req.body.address,
    aadharNumber:req.body.aadharNumber,
    status:req.body.status,
    });

    // Save Student in the database
    student.save()
    .then(data => {
        if(data){
            var resData={"status":"201",
        "message":"Order cretae sucessfully!"}
        }
        res.status(201).send(resData);
    }).catch(err => {
        res.status(500).send({"status":"500",
            message: err.message || "Some error occurred while creating the Student."
        });
    });
};

// Retrieve and return all Students from the database.
exports.findAll = (req, res) => {
    Student.find({status:true})
    .then(students => {
        var data ={"data":students}
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Students."
        });
    });
};

// Find a single Student with a stuCode
exports.findOne = (req, res) => {
    console.log("code",req.body.stuCode);
    console.log("type",req.body.type);
    var type=req.body.type;
    var code=req.body.stuCode;
    if(req.body.type=="Student"){
        Student.find({stuCode:code})
        .then(student => {
            if(!student) {
                return res.status(404).send({
                    status:"404",
                    message: "Student not found with code " + code
                });            
            }
            if(student.length>0){
                //console.log("ssdsdsdsdsdsdsdsdsdssdsd", getsubjectList(student[0].classCode))
                //var subjectList= getsubjectList(student[0].classCode);
                var data={data:student[0],
                    
                status:"200"}
                res.send(data)
            }else{
                res.status(404).send({
                    status:"404",
                    message: "Student not found with code " + code
                });  
            }
            //res.send(student);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    errr:err,
                    status:"4045",
                    message: "Student not found with code " + code
                });                
            }
            return res.status(500).send({
                status:"500",
                message: "Error retrieving Student with code " +code
            });
        });
    }else{
        Teacher.find({teachCode:code})
    .then(teacher => {
        if(!teacher) {
            return res.status(404).send({
                status:"404",
                message: "Teacher not found with code " + req.params.teachCode
            });            
        }
        if(teacher.length>0){

            var data={status:"200",
            data:teacher[0]};
                res.send(data);
        }else{
            res.status(404).send({
                status:"404",
                message: "Teacher not found with code " + req.params.teachCode
            });      
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error:err,
                status:"404",
                message: "Teacher not found with code " + req.params.teachCode
            });                
        }
        return res.status(500).send({
            status:"500",
            message: "Error retrieving teacher with code " + req.params.teachCode
        });
    });
    }
   
};


// Update a Student identified by the stuCode in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.stuCode) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Find Student and update it with the request body
    Student.findByIdAndUpdate(req.params.stuCode, {
        stuCode: req.body.stuCode || "Untitled Student",
        name: req.body.name
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.stuCode
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.stuCode
            });                
        }
        return res.status(500).send({
            message: "Error updating Student with id " + req.params.stuCode
        });
    });
};

// Delete a Student with the specified stuCode in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.stuCode)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.stuCode
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.stuCode
            });                
        }
        return res.status(500).send({
            message: "Could not delete Student with id " + req.params.stuCode
        });
    });
};
