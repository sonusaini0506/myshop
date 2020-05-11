const GameModel = require('../models/game.model.js');
const Gamenumber = require('../models/gamenumber.model.js');
var moment = require('moment');
module.exports={create,gameupdate,findGame,dashboard,findUserGame,findGameListAll,findGameListToday}
async function create(req,res){
    // Validate request
    if(!req.body.mobile) {
        return res.status(400).send({"status":"400",
            message: "User mobile can not be empty"
        });
    }
    if(!req.body.playAmount) {
        return res.status(400).send({"status":"400",
            message: "User amount can not be empty"
        });
    }
    if(!req.body.gameNumber) {
        return res.status(400).send({"status":"400",
            message: "Gamenumbe can not be empty"
        });
    }
    
 // Create a User
 const game = new GameModel(req.body);

// Save Note in the database
game.save()
.then(data => {
    if(data){
        console.log("2");
        var resData={"status":"201",
            "message":"Registration game sucessfully!"}
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

   };
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */   

async function dashboard(req,res){
    if(!req.body.yesturdayDate) {
        return res.status(400).send({"status":"400",
            message: "Yesturday Date can not be empty"
        });
    }
    if(!req.body.todayDate) {
        return res.status(400).send({"status":"400",
            message: "Today Date can not be empty"
        });
    }
    var yesturday=req.body.yesturdayDate;
    var todayDate=req.body.todayDate;
    var totalUser=0;
    var todayMorningCountUser=0;
    var todayEveningCountUser=0;
    var totalMorningPlayAmount=0;
    var totalEveningPLayAmount=0;
    try{
        var userToday;
        console.log("todayDate",todayDate)
        var startDate=todayDate+"T00:00:00.000+00:00";
            var endDate=todayDate+"T23:59:59.000+00:00";
            userToday =await GameModel.find({"createdAt":{$gte:startDate,$lte:endDate}});
            totalUser= await userToday.length;
            var resData;
            if(userToday.length>0){
                console.log("typeAt",userToday[0].typeAt)
                for(var i=0;i<userToday.length;i++){
                if(userToday[i].typeAt=="Morning"){
                    todayMorningCountUser =await todayMorningCountUser+1;
                    totalMorningPlayAmount +=await Number(userToday[i].playAmount);
                }
                if(userToday[i].typeAt=="Evening"){
                    todayEveningCountUser =await todayEveningCountUser+1;
                    totalEveningPLayAmount +=await Number(userToday[i].playAmount);
                }
                
                
                }
                 
                 resData={
                    "todayEveningCountUser":todayEveningCountUser,
                "todayMorningCountUser":todayMorningCountUser,
                "totalUser":totalUser,
                "totalEveningPLayAmount":totalEveningPLayAmount,
                "totalMorningPlayAmount":totalMorningPlayAmount};
            }else{
                resData={
                "todayEveningCountUser":0,
            "todayMorningCountUser":0,
            "totalUser":0,
            "totalEveningPLayAmount":0,
            "totalMorningPlayAmount":0};
            }
            var yesstartDate=yesturday+"T00:00:00.000+00:00";
            var yesendDate=yesturday+"T23:59:59.000+00:00";
            var createNumberModule =await Gamenumber.find({"createdAt":{$gte:yesstartDate,$lte:yesendDate}});
if(createNumberModule.length>0){
    resData.MonrningNumber=createNumberModule[0].numberMorning;
    resData.numberEvening=createNumberModule[0].numberEvening;
}else{
    resData.MonrningNumber=0;
    resData.numberEvening=0;
}
            getYesturdayData(resData,res,yesturday);
    }catch (e){
        res.status(200).send({"status":"409",
    "message":"Somthing went wrong in today data"});
    }
}

async function getYesturdayData(resData,res,yesturday){
    var yesturday=await yesturday;;
    console.log("yes",yesturday);
 
try {
    var data=await resData;
    console.log("todaydata",data);
    var yestotalUser=0;
    var yesturdayMorningCountUser=0;
    var yesturdayEveningCountUser=0;
    var yestotalMorningPlayAmount=0;
    var yestotalEveningPLayAmount=0;
    
        var userYesturday;
        console.log("todayyesturDate",yesturday)
        var startDate=yesturday+"T00:00:00.000+00:00";
            var endDate=yesturday+"T23:59:59.000+00:00";
            userYesturday =await GameModel.find({"createdAt":{$gte:startDate,$lte:endDate}});
            yestotalUser= await userYesturday.length;
            console.log("yesdata",yestotalUser)
            if(userYesturday.length>0){
                console.log("typeAt",userYesturday[0].typeAt)
                for(var i=0;i<userYesturday.length;i++){
                if(userYesturday[i].typeAt=="Morning"){
                    yesturdayMorningCountUser =await yesturdayMorningCountUser+1;
                    yestotalMorningPlayAmount +=await Number(userYesturday[i].playAmount);
                }
                if(userYesturday[i].typeAt=="Evening"){
                    yesturdayEveningCountUser =await yesturdayEveningCountUser+1;
                    yestotalEveningPLayAmount +=await Number(userYesturday[i].playAmount);
                }
                
                }
                data.yesturdayMorningCountUser=await yesturdayMorningCountUser;
                data.yestotalMorningPlayAmount= await yestotalMorningPlayAmount;
                data.yesturdayEveningCountUser= await yesturdayEveningCountUser;
                data.yestotalEveningPLayAmount=await yestotalEveningPLayAmount;
                data.yesturdayUser=await yestotalUser;
            }else{
                
                data.yesturdayMorningCountUser=0;
                data.yestotalMorningPlayAmount=0;
                data.yesturdayEveningCountUser=0;
                data.yestotalEveningPLayAmount=0;
                data.yesturdayUser=0;
            }
          
res.status(200).send({"status":"200",
"data":data})

} catch (error) {
    res.status(200).send({"status":"409"})
}
}


async function todayTotalUser(date){
    var totao
    try{
        var game;
        game=await GameModel.find({});
        return game.length;
    }catch (e){

    }
    
}



/**
 * 
 * @param {mobile} req 
 * @param {password} res 
 */
async function gameupdate(req, res){
    // Validate Request
    

    // Find note and update it with the request body
    try{

        var id=req.body.id;
        
        var game= await GameModel.updateOne({"_id":id},req.body )
       
        if(game){
            var resData={"status":"200",
            "message":"Game data update sucessfully!"}
    res.status(200).send(resData);
        }else{
            var resData={"status":"404",
            "message":"Game not found!"}
    res.status(404).send(resData);
        }
    }catch(e){
        var resData={"status":"409",
            "message":"Somthing went wrong!"}
    res.status(409).send(resData);

    }
    
};

async function findUserGame(req,res){
   

       try{
        var game;
        var totalWingAmount=0;
        var object=req.body;
        //console.log(JSON.parse(object));
        //var searchData=JSON.parse(object);
        var startDate=req.body.todayDate+"T00:00:00.000+00:00";
            var endDate=req.body.todayDate+"T23:59:59.000+00:00";
            game =await GameModel.find({"createdAt":{$gte:startDate,$lte:endDate},"mobile":req.body.mobile}); 
           
            if(game.length>0){
                totalWingAmount=await gettotalwiningAmount(req.body.mobile);
                var resData={"status":"200",
                "data":game,
            "totalWingAmount":totalWingAmount}

                var yesstartDate=req.body.yesturdayDate+"T00:00:00.000+00:00";
            var yesendDate=req.body.yesturdayDate+"T23:59:59.000+00:00";
                var createNumberModule =await Gamenumber.find({"createdAt":{$gte:yesstartDate,$lte:yesendDate}});
if(createNumberModule.length>0){
    resData.MonrningNumber=createNumberModule[0].numberMorning;
    resData.numberEvening=createNumberModule[0].numberEvening;
}else{
    resData.MonrningNumber=0;
    resData.numberEvening=0;
}
           
    res.status(200).send(resData);
        }else{
            totalWingAmount=await gettotalwiningAmount(req.body.mobile);
            var resData={"status":"200",
            "data":game,
        "totalWingAmount":totalWingAmount}

            var yesstartDate=req.body.yesturdayDate+"T00:00:00.000+00:00";
        var yesendDate=req.body.yesturdayDate+"T23:59:59.000+00:00";
            var createNumberModule =await Gamenumber.find({"createdAt":{$gte:yesstartDate,$lte:yesendDate}});
if(createNumberModule.length>0){
resData.MonrningNumber=createNumberModule[0].numberMorning;
resData.numberEvening=createNumberModule[0].numberEvening;
}else{
resData.MonrningNumber=0;
resData.numberEvening=0;
}
res.status(200).send(resData);
        }
    }catch (e){
        var resData={"status":"409"}
res.status(409).send(resData);
    }
    }
async function gettotalwiningAmount(mobile){
    var totalWinAmount=0;
   var  game =await GameModel.find({"mobile":mobile}); 
     if(game.length>0){
        for(var i=0;i<game.length;i++){
            if(game[i].gameResult=="WIN"){
                totalWinAmount +=await Number(game[i].winAmount);
            }
        }
return await totalWinAmount
     }else{
         return 0
     }   
}
async function findGame(req,res){
   try{
        var game;
        var object=req.body;
        //console.log(JSON.parse(object));
        //var searchData=JSON.parse(object);
            game=await GameModel.find(object);
             if(game.length>0){
            var resData={"status":"200",
            "data":game}
    res.status(200).send(resData);
        }else{
            var resData={"status":"404",
            "data":[]}
    res.status(409).send(resData);
        }
    }catch (e){
        var resData={"status":"409",
        "message":e}
res.status(409).send(resData);
    }
    }

    async function findGameListToday(req,res){
    try{

         var game;
         var startDate=req.body.todayDate+"T00:00:00.000+00:00";
         var endDate=req.body.todayDate+"T23:59:59.000+00:00";
         game =await GameModel.find({"createdAt":{$gte:startDate,$lte:endDate}}); 
        
              if(game.length>0){
             var resData={"status":"200",
             "data":game}
     res.status(200).send(resData);
         }else{
             var resData={"status":"404",
             "data":[]}
     res.status(404).send(resData);
         }
     }catch (e){
         var resData={"status":"409",
         "data":[]}
 res.status(409).send(resData);
     }
     }
     async function findGameListAll(req,res){
        try{
    
             var game;
             game =await GameModel.find({}); 
            
                  if(game.length>0){
                 var resData={"status":"200",
                 "data":game}
         res.status(200).send(resData);
             }else{
                 var resData={"status":"404",
                 "data":[]}
         res.status(404).send(resData);
             }
         }catch (e){
             var resData={"status":"409",
             "data":[]}
     res.status(409).send(resData);
         }
         }