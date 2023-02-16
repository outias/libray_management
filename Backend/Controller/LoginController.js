require('dotenv').config();
const asyncHandler=require('express-async-handler');
const jsonWebToken=require('jsonwebtoken');
const path=require('path');
const md5=require('md5');
const connection=require('../../Database/MySQL');

//file
const PackageJson=require('../../package.json');

function generateToken(email) {
      var secretKey=process.env.SECRET;
      var token=jsonWebToken.sign({email},secretKey,{expiresIn:'1d',algorithm:'HS256'});

      return token;
}



//login
const login=asyncHandler(  function(req,res){
      const {email,password}=req.body;

      //check existance
      var encripted_password=md5(password);
      var input=[email,encripted_password];
      var query="SELECT COUNT(id) as total,first_name,email,last_name,phone,role_id,id FROM users WHERE email=? AND mg_password=? AND archive=0";

      //check
       connection.query(query,input,function(err,result){
            if(err) return res.status(400).json({status:2,message:err.message});

            if(result[0].total > 0){
                 // var token=generateToken(email)

                 //generate cookie
                 res.status(200)
                 res.cookie("Authorization", "token", {expire: 86400 + Date.now()})
                 res.json({status:1,message:"Welcome Back "+result[0].first_name,data:result[0]});

                  

            }else{
                  return res.status(200).json({status:2,message:"User not Exist"});
            }
      })

});

const settings=asyncHandler(function(req,res){
      $querry="SELECT * FROM settings";
      connection.query($querry,function(err,result){
            if(err) res.status(400).json({status:2,message:err.message});

            return res.status(200).json({status:1,message:"success Data Exist",data:result});
      })
})

const logout=asyncHandler( function(req,res){
      //generate cookie ""
      // res.cookie("Authorization", "", {maxAge:0}); 
       res.clearCookie('Authorization');
     
      // destroy session data
      req.session = null;
      
      return res.json({status:1,message:"User Logout Complete "});

      
})


const registerUser= async function(req,res){

      var userId=1;
      var message=""
      var {hidden_unique_id,firstName,lastName,email,phone,country_id,role,password,gender,attachment_name}=req.body;
      

       //check email exist
       let email_value=[email];
       var email_query="SELECT COUNT(email) as total FROM users WHERE email=?";
       connection.query(email_query,email_value, async(error,result)=>{

             if(result[0].total > 0 && hidden_unique_id==""  ){
                  message="User email exist";
                  
                  return  res.status(400).json({status:2,message:message});
             }else{
                  //check image
                  var path=""
                  if(attachment_name !="" && attachment_name !=null && attachment_name != undefined){
                        var {attachment}=req.files;
                        path="uploads/user/"+attachment_name;
                        await attachment.mv(__dirname+'/../../Frontend/public/'+path);
                  }
                  
                  var input={country_id,'first_name':firstName,'gender':gender,'phone':phone,'email':email,'role_id':role,'last_name':lastName,'password':password,'mg_password':md5(password),'created_by':userId,'attachment':path};
                  var query="INSERT INTO users SET ?"
                  
                  await connection.query(query,input,async(error,result)=>{
                        if (error)  return res.status(400).json({status:2,message:error.message})
                        console.log(result);

                        message="User registered successfull"
                        
                        return  res.status(200).json({status:1,message:message});
                        
                  });

             }
       });
    
      
            
      
};



module.exports={login,settings,logout,registerUser}