require('dotenv').config();
const express=require('express');
const path=require('path');
const router=express.Router();

// get files
const HomeController=require('../Controller/HomeController');
const LoginController=require('../Controller/LoginController');

    //Dashboard
router.get('/libray_management',HomeController.dashboard);
router.get('/countAuthenticateUser',HomeController.countAuthenticateUser);
router.get('/countBooks',HomeController.countBooks);
router.get('/countComment',HomeController.countComment);
 
      //user
router.get('/user',HomeController.getUser);      
router.post('/user/addUser',HomeController.addUser);      
router.post('/user/getOneUser',HomeController.getOneUser);      
router.post('/user/deleteUser',HomeController.deleteUser);      

     //books
router.get('/books',HomeController.getBooks);      
router.post('/books/addBooks',HomeController.addBooks);      
router.post('/books/getOneBooks',HomeController.getOneBooks);      
router.post('/books/deleteBooks',HomeController.deleteBooks);   
router.post('/books/addComment',HomeController.addComment);   
router.post('/books/addLike',HomeController.addLike);   
router.post('/books/addFavorite',HomeController.addFavorite);   
router.post('/books/getComments',HomeController.getComments);   
router.get('/books/getMostLike',HomeController.getMostLike);   
router.post('/books/getLike',HomeController.getLike);   
router.post('/books/getFavorite',HomeController.getFavorite);   

      //role
router.get('/role',HomeController.getRole);           
router.post('/settings/saveSettings',HomeController.saveSettings);           
router.get('/logout',LoginController.logout);           


      //country
router.get('/country',HomeController.getCountry);      
router.get('/region',HomeController.getRegion);      
router.get('/district',HomeController.getDistrict);      

module.exports=router;