const mysql=require('mysql');

const connection=mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"",
      database:"library_management"
});

const connect=connection.connect((err,result)=>{
    if(err) return console.log(err.message);
    console.log("DB: Connected successful");
    
})

module.exports=connection;