const Gamenumber = require('../models/gamenumber.model.js');

module.exports={create,findNumber}

async function create(req,res){
    // Validate request
    if(!req.body.numberMorning) {
        return res.status(200).send({"status":"400",
            message: "Morning Number can not be empty"
        });
    }
    if(!req.body.numberEvening) {
        return res.status(200).send({"status":"400",
            message: "Evening Number can not be empty"
        });
    }
    var todayDate=req.body.todayDate;
    var startDate=todayDate+"T00:00:00.000+00:00";
    var endDate=todayDate+"T23:59:59.000+00:00";
    var createNumberModule =await Gamenumber.find({"createdAt":{$gte:startDate,$lte:endDate}});
    
    //console.log("test",check);
if(createNumberModule<=0){
 // Create a User
 const createNumberModule = new Gamenumber({
    numberEvening: req.body.numberEvening,
    numberMorning: req.body.numberMorning, 
    createdBy: req.body.createdBy,

});

// Save Note in the database
createNumberModule.save()
.then(data => {
    if(data){
        console.log("2");
        var resData={"status":"201",
            "message":"Number create sucessfully!"}
    res.status(200).send(resData);
    }else{
        console.log("3");
        var resData={"status":"409",
    "message":"Somthing went wrong!"}
        res.status(200).send(resData);
    }
   
}).catch(err => {
    res.status(200).send({"status":"500",
        message: err.message || "Some error occurred while creating the Note."
    });
});
}else{
    console.log("id",createNumberModule[0]._id);
var id=createNumberModule[0]._id;
    var updateNumber=Gamenumber.updateOne({"_id":id},{"numberMorning":req.body.numberMorning})
    console.log(updateNumber);
    if(updateNumber){
    var resData={"status":"200",
    "message":"Number  created!"}
    res.status(200).send(resData);
    }
   else{
    var resData={"status":"404",
    "message":"Number already created!"}
    res.status(200).send(resData);
    }
   }
    
   };

async function findNumber(req,res){
    if(!req.body.todayDate) {
        return res.status(400).send({"status":"400",
            message: "Date can not be empty"
        });
    }
try {
    var todayDate=req.body.todayDate;
    var startDate=todayDate+"T00:00:00.000+00:00";
    var endDate=todayDate+"T23:59:59.000+00:00";
    var createNumberModule =await Gamenumber.find({"createdAt":{$gte:startDate,$lte:endDate}});
   if(createNumberModule.length>0){
    var resData={"status":"200",
    "data":createNumberModule}
    res.status(200).send(resData);
   }else{
    var resData={"status":"404",
    "message":"Data not found!"}
    res.status(200).send(resData);
   }

} catch (error) {
    var resData={"status":"409",
    "message":"Somthing went wrong!"}
    res.status(200).send(resData);
}
}   