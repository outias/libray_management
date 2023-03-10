require('dotenv').config();
const asyncHandler=require('express-async-handler');
//const jsonWebToken=require('jsonwebtoken');
//const bcrypt=require('bcrypt');
const path=require('path');
const md5=require('md5');
const connection=require('../../Database/MySQL');


// dashboard management
const dashboard=asyncHandler( async function(req,res){

      return res.sendFile(path.join(__dirname,'..','..','Frontend','views','react.html'));
});

// user management
const getUser=asyncHandler( async function(req,res){
        
           //table=users+country+role;
      var query="SELECT users.id,users.first_name,users.gender,users.phone,users.email,users.role_id,users.last_name,users.archive,users.created_by,users.attachment,country.name as country_name,role.name as role_name FROM users LEFT JOIN country ON users.country_id=country.id LEFT JOIN role ON users.role_id=role.id WHERE users.archive=0 ORDER BY users.id DESC"

      connection.query(query,function(error,result){
            if (error) return res.json({status:2,message:error.message});
            return res.status(200).json({status:1,message:"Succefull User Exists",data:result});
      })
});

const addUser= async function(req,res){

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
             }
       });
    
      //check image
      var path=""
      if(attachment_name !="" && attachment_name !=null && attachment_name != undefined){
            var {attachment}=req.files;
            path="uploads/user/"+attachment_name;
            await attachment.mv(__dirname+'/../../Frontend/public/'+path);
      }

      //insert or update
      if(hidden_unique_id=="" || hidden_unique_id==null){
            var input={country_id,'first_name':firstName,'gender':gender,'phone':phone,'email':email,'role_id':role,'last_name':lastName,'password':password,'mg_password':md5(password),'created_by':userId,'attachment':path};
            var query="INSERT INTO users SET ?"
            
            await connection.query(query,input,async(error,result)=>{
                  if (error)  return res.status(400).json({status:2,message:error.message})
                  console.log(result);

                  message="User registered successfull"
                 
                  return  res.status(200).json({status:1,message:message});
                  
            });

            
      }else{

            var input={country_id,'first_name':firstName,'gender':gender,'phone':phone,'email':email,'role_id':role,'last_name':lastName,'password':password,'mg_password':md5(password),'created_by':userId,'attachment':path}
            var query="UPDATE users SET ? WHERE id="+hidden_unique_id;
      
            await connection.query(query,input,async(error,result)=>{
                  if (error)  return res.status(400).json({status:2,message:error.message})
                  console.log(result);

                  message="User Updated successfull";
                  return  res.status(200).json({status:1,message:message});
            });
      }
      
};



const getOneUser=asyncHandler( async function(req,res){
      var {id}=req.body;
      var input=[id];
      var query="SELECT * FROM users WHERE id=?";
     
      connection.query(query,input,function(error,result){
            if (error) return res.status(400).json({status:2,message:error.message})
            console.log(result);
            return res.status(200).json({status:1,message:"Information Updated successfull",data:result});
      });
});


const deleteUser=asyncHandler( async function(req,res){
      var {id}=req.body;
      var input=[id];
      var query="UPDATE users SET archive=1 WHERE id=?";
     
      connection.query(query,input,function(error,result){
            if (error) return res.status(400).json({status:2,message:error.message})
          
            return res.status(200).json({status:1,message:"User deleted succesfull"});
      });
});



// books management
const getBooks=asyncHandler( async function(req,res){
      var query="SELECT books.* FROM books WHERE archive=0"
      connection.query(query,function(error,result){
            if (error) return res.status(400).json({status:2,message:error.message});
            return res.status(200).json({status:1,message:"Succefull books Exists",data:result});
      })
});

const addBooks= async function(req,res){

      var userId=1;
      var message=""
      var {hidden_unique_id,title,author,price,description}=req.body;
      

      //insert or update
      if(hidden_unique_id=="" || hidden_unique_id==null){
            var input={title,author,price,description};
            var query="INSERT INTO books SET ?";
            
            await connection.query(query,input,async(error,result)=>{
                  if (error)   res.status(400).json({status:2,message:error.message})

                  message="Book registered successfull"
                  res.json({status:1,message:message});
                  return
                  
            });

            
      }else{

            var input={title,author,price,description};
            var query="UPDATE books SET ? WHERE id="+hidden_unique_id;
      
            await connection.query(query,input,async(error,result)=>{
                  if (error)   res.status(400).json({status:2,message:error.message})

                  message="Book Updated successfull";
                   res.json({status:1,message:message});
                   return
                  
            });
      }
      
};




const getOneBooks=asyncHandler( async function(req,res){
      var {id}=req.body;
      var input=[id];
      var query="SELECT * FROM books WHERE id=?";
     
      connection.query(query,input,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message})

            return res.status(200).json({status:1,message:"Information Updated successfull",data:result});
      });
});


const deleteBooks=asyncHandler( async function(req,res){
      var {id}=req.body;
      var input=[id];
      var query="UPDATE books SET archive=1 WHERE id=?";
     
      connection.query(query,input,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message})
          
            return res.status(200).json({status:1,message:"Book deleted succesfull"});
      });
});

const addComment= async function(req,res){

      var message=""
      var {user_id,book_id,comment}=req.body;

      var input={user_id,book_id,comment};
      var query="INSERT INTO comment SET ?";
      
      await connection.query(query,input,async(error,result)=>{
            if (error)   res.status(400).json({status:2,message:error.message})

            message="Book comment added  successfull"
            res.json({status:1,message:message});
            return
            
      });
};

const addLike= async function(req,res){

      var message=""
      var {user_id,book_id,status}=req.body;
      
       let email_value=[user_id,book_id];
       var email_query="SELECT COUNT(id) as total FROM like WHERE user_id=? AND book_id=?";
       connection.query(email_query,email_value, async(error,result)=>{

            var input={user_id,book_id,status}
             if(result[0].total == 0   ){
                  var query="INSERT INTO like SET ? "
                  await connection.query(query,input,async(error,result)=>{
                        if (error)  return res.status(400).json({status:2,message:error.message})
                        console.log(result);
      
                        message="done"
                       
                        return  res.status(200).json({status:1,message:message});
                        
                  });
             }else{
                  var query="UPDATE like SET ? "
                  await connection.query(query,input,async(error,result)=>{
                        if (error)  return res.status(400).json({status:2,message:error.message})
                        console.log(result);
      
                        message="Done";
                        return  res.status(200).json({status:1,message:message});
                  });
             }
       });
    
};

const addFavorite= async function(req,res){

      var message=""
      var {user_id,book_id,status}=req.body;
      
       let email_value=[user_id,book_id];
       var email_query="SELECT COUNT(id) as total FROM favorite WHERE user_id=? AND book_id=?";
       connection.query(email_query,email_value, async(error,result)=>{

            var input={user_id,book_id,status}
             if(result[0].total == 0   ){
                  var query="INSERT INTO favorite SET ? "
                  await connection.query(query,input,async(error,result)=>{
                        if (error)  return res.status(400).json({status:2,message:error.message})
                        console.log(result);
      
                        message="done"
                       
                        return  res.status(200).json({status:1,message:message});
                        
                  });
             }else{
                  var query="UPDATE favorite SET ? "
                  await connection.query(query,input,async(error,result)=>{
                        if (error)  return res.status(400).json({status:2,message:error.message})
                        console.log(result);
      
                        message="Done";
                        return  res.status(200).json({status:1,message:message});
                  });
             }
       });
    
};

const getComments=asyncHandler( async function(req,res){
      var {book_id}=req.body;
      var input=[book_id];
      var query="SELECT comment.*,users.first_name,users.last_name,users.email,users.phone FROM comment LEFT JOIN users ON comment.user_id=users.id WHERE comment.book_id=?";
     
      connection.query(query,input,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message})

            return res.status(200).json({status:1,message:"Information exist ",data:result});
      });
});

const getLike=asyncHandler( async function(req,res){
      var {book_id,user_id}=req.body;
      var input=[book_id,user_id];
      var query="SELECT * FROM like WHERE book_id=? AND user_id=?";
     
      connection.query(query,input,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message})

            return res.status(200).json({status:1,message:"Information exist ",data:result});
      });
});

const getMostLike=asyncHandler( async function(req,res){

      var query="SELECT book_id FROM like WHERE MAX(book_id)";
     
      connection.query(query,input,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message})

            return res.status(200).json({status:1,message:"Information exist ",data:result});
      });
});

const getFavorite=asyncHandler( async function(req,res){
      var {book_id,user_id}=req.body;
      var input=[book_id,user_id];
      var query="SELECT * FROM favorite WHERE book_id=? AND user_id=?";
     
      connection.query(query,input,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message})

            return res.status(200).json({status:1,message:"Information exist "});
      });
});










     // role management
const getRole=asyncHandler( async function(req,res){
      var query="SELECT * FROM role WHERE archive=0"
      connection.query(query,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message});

            return res.status(200).json({status:1,message:"Succefull Role Exists",data:result});
      })
});

const saveSettings=asyncHandler( async function(req,res){
      const {system_name,system_info}=req.body;

      var input={'system_name':system_name,'system_info':system_info};
      var query="UPDATE settings SET ? "
      connection.query(query,input,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message});

            return res.status(200).json({status:1,message:"Succefull Data Updated ",data:result});
      })
});

     // location management
const getCountry=asyncHandler( async function(req,res){
      var query="SELECT * FROM country WHERE archive=0"
      connection.query(query,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message});

            return res.status(200).json({status:1,message:"Succefull Country Exists",data:result});
      })
});

const getRegion=asyncHandler( async function(req,res){
      var query="SELECT * FROM region WHERE archive=0"
      connection.query(query,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message});

            return res.status(200).json({status:1,message:"Succefull Region Exists",data:result});
      })
});

const getDistrict=asyncHandler( async function(req,res){
      var query="SELECT * FROM district WHERE archive=0"
      connection.query(query,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message});

            return res.status(200).json({status:1,message:"Succefull District Exists",data:result});
      })
});

const countAuthenticateUser=asyncHandler( async function(req,res){

      var query="SELECT COUNT(id) as total FROM users WHERE archive=0"
      connection.query(query,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message});

            return res.status(200).json({status:1,message:"Succefull  Exists",data:result[0].total});
      })
});

const countBooks=asyncHandler( async function(req,res){

      var query="SELECT COUNT(id) as total FROM books WHERE archive=0"
      connection.query(query,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message});

            return res.status(200).json({status:1,message:"Succefull  Exists",data:result[0].total});
      })
});

const countComment=asyncHandler( async function(req,res){

      var query="SELECT COUNT(id) as total FROM comment WHERE archive=0"
      connection.query(query,function(error,result){
            if (error) return  res.status(400).json({status:2,message:error.message});

            return res.status(200).json({status:1,message:"Succefull  Exists",data:result[0].total});
      })
});


    


module.exports={getUser,addUser,deleteUser,getOneUser,getBooks,addBooks,getOneBooks,deleteBooks,getRole,getCountry,dashboard,getDistrict,getRegion,saveSettings,addComment,addLike,getComments,getLike,getFavorite,addFavorite,countAuthenticateUser,countBooks,countComment,getMostLike}