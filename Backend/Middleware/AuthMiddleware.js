require('dotenv').config();
const asyncHandler=require('express-async-handler');
const path=require('path');
const jsonWebToken=require('jsonwebtoken');

//file
const PackageJson=require('../../package.json');

//check is login
const isLogin=asyncHandler( function(req,res,next){

      const token = req.cookies.Authorization;

      if(token==="" || token===null){
          return res.status(400).redirect(PackageJson.proxy);
      }

      next();
    //   var secretKey=process.env.SECRET;
    //   jsonWebToken.verify(token,secretKey,function(err,data){
    //       if(err) return res.redirect(PackageJson.proxy);
           
    //       next();
    //   });
})


module.exports={isLogin}