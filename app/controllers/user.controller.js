const User = require('../models/user.model.js');
module.exports={create,forgotPassword,findUser,login}
async function create(req,res){
    // Validate request
    if(!req.body.mobile) {
        return res.status(400).send({"status":"400",
            message: "User mobile can not be empty"
        });
    }
    var user=await User.find({"mobile":req.body.mobile});
    //console.log("test",check);
if(user.length<=0){
 // Create a User
 const user = new User({
    mobile: req.body.mobile || "Untitled Note",
    name: req.body.name, 
    password: req.body.password,
    status:req.body.status
});

// Save Note in the database
user.save()
.then(data => {
    if(data){
        console.log("2");
        var resData={"status":"201",
            "message":"Registration sucessfully!"}
    res.status(201).send(resData);
    }else{
        console.log("3");
        var resData={"status":"409",
    "message":"Somthing went wrong!"}
        res.status(201).send(resData);
    }
   
}).catch(err => {
    res.status(500).send({"status":"500",
        message: err.message || "Some error occurred while creating the Note."
    });
});
}else{
    console.log("5");
    var resData={"status":"200",
    "message":"User already created!"}
    res.status(200).send(resData);
    }
   };
/**
 * 
 * @param {mobile} req 
 * @param {password} res 
 */
async function forgotPassword(req, res){
    // Validate Request
    if(!req.body.mobile) {
        return res.status(400).send({status:"404",
            message: "User mobile can not be empty"
        });
    }

    // Find note and update it with the request body
    try{

        var mobile=req.body.mobile;
        var password=req.body.password;
        console.log(password);
        console.log(mobile);
        var user= await User.updateOne({"mobile":mobile},{"password":password} )
       
        if(user){
            var resData={"status":"200",
            "message":"Password update sucessfully!"}
    res.status(200).send(resData);
        }else{
            var resData={"status":"404",
            "message":"User not found!"}
    res.status(404).send(resData);
        }
    }catch(e){
        var resData={"status":"409",
            "message":"Somthing went wrong!"}
    res.status(409).send(resData);

    }
    
};

async function login(req,res){
    if(!req.body.mobile) {
        return res.status(400).send({"status":"400",
            message: "User mobile can not be empty"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({"status":"400",
            message: "User password can not be empty"
        });
    }
    try{

      var  user=await User.find({"mobile":req.body.mobile,"password":req.body.password});
        if(user.length>0){
            var resData={"status":"200",
            "data":user}
    res.status(200).send(resData);
        }else{
            var resData={"status":"404",
            "message":"User not find"}
    res.status(404).send(resData);
        }
    }catch (e){
        var resData={"status":"409",
        "message":"Somthin went wrong!"}
res.status(409).send(resData);
    }
    
};
async function findUser(req,res){
    var type=req.body.type;
    
    try{
        var user;
        if(type=="All"){
            user=await User.find({});
        }else if(type=="Mobile"){
            user=await User.find({"mobile":req.body.mobile});
        }else if(type=="Today"){
            console.log(type);
            var startDate=req.body.startDate+"T00:00:00.000+00:00";
            var endDate=req.body.endDate+"T23:59:59.000+00:00";
            user =await User.find({"createdAt":{$gte:startDate,$lte:endDate}});  
              //user=await User.find({"createdAt":req.body.time});
        }else{
            
            user=await User.find({});
        }
        
        if(user.length>0){
            var resData={"status":"200",
            "data":user}
    res.status(200).send(resData);
        }else{
            var resData={"status":"404",
            "message":"User not found!"}
    res.status(409).send(resData);
        }
    }catch (e){
        var resData={"status":"409",
        "message":e}
res.status(409).send(resData);
    }
    


}
