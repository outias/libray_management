const express=require('express');
const path=require('path');
const router=express.Router();

const LoginController=require('../Controller/LoginController');

router.get('^/$|/index(.html)?',function (req,res){
      res.sendFile(path.join(__dirname,'..','..','Frontend','views','index.html'))
});

//login and authentication process
router.post('/login',LoginController.login);


// settings
router.get('/settings',LoginController.settings);


module.exports=router;