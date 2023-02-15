require('dotenv').config();

//include modules
const express=require('express');
const path=require('path');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload');

//file
const AuthMiddleware=require('./Backend/Middleware/AuthMiddleware');

//innitialize
const app=express();
const PORT=process.env.PORT || 5555;

// express setting
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(fileUpload({limits:{fileSize:10000000},abortOnLimit:true}));
app.use(cookieParser());


  // initial router
app.use('/',express.static(path.join(__dirname,'Frontend','public')));
app.use('/',require('./Backend/Router/Router'));
app.use('/authentication',AuthMiddleware.isLogin,require('./Backend/Router/AuthRouter'));
app.use('/authentication',express.static(path.join(__dirname,'Frontend','public')));

   //Error Request
app.all('*',function(req,res){
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'Frontend','views','404.html'))
    } 
    else if(req.accepts('json')){
        res.json({status:404,message:"Server can not find the requested resource "});
    }else{
        res.type('text').send("Server can not find the requested resource");
    }
});

app.listen(PORT,function(req,res){
      console.log("Response : "+ req)
      console.log("Server run on : http://localhost:"+PORT)
})