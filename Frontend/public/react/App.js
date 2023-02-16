import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';

   //import file
import User from './User';   
import Dashboard from "./Dashboard";
import Books from "./Books";
import Settings from "./Settings";
import BooksDetails from "./BooksDetails";

  ///package jason
import packageJson from '../../../package.json';  

  //get id from navigation
const logout=document.getElementById('logout');
const setting=document.getElementById('setting');
const books=document.getElementById('books');
const dashboard=document.getElementById('dashboard');
const user=document.getElementById('user');
const id=document.getElementById('root');

   //on document ready
document.addEventListener('DOMContentLoaded',function(e){
      setClass('dashboard');
      setView(<Dashboard />);

      checkSession();
})
  
   //render our item
dashboard.addEventListener('click',function(e){
      setClass('dashboard');
      setView(<Dashboard />)
})  

user.addEventListener('click',function(e){
      setClass('user');
      setView(<User />)
}) 

books.addEventListener('click',function(e){
      setClass('books');
      setView(<Books />)
})  

setting.addEventListener('click',function(e){
      setClass('setting');
      setView(<Settings />)
})  


logout.addEventListener('click',function(e){
      setClass('logout');
      logoutRequest();
})  

function setView(view){
      const root=ReactDOM.createRoot(id);
      root.render(
            <React.StrictMode>
                  {view}
            </React.StrictMode>
      )
}

function setClass(navId){
       // remove all class
       $('#dashboard').removeClass(" active bg-gradient-primary");
       $('#user').removeClass(" active bg-gradient-primary");
       $('#books').removeClass(" active bg-gradient-primary");
       $('#setting').removeClass(" active bg-gradient-primary");
       $('#logout').removeClass(" active bg-gradient-primary");

       //add class
       $('#'+navId).addClass(" active bg-gradient-primary");
      
    
}

function logoutRequest(){
      fetch(packageJson.proxy+'/authentication/logout',{
            method:"GET"
      })
      .then(response =>response.json())
      .then(data =>{
            if(data.status==1){
                  swal("Good job!",data.message, "success");

                  sessionStorage.clear();
                  location.replace(packageJson.proxy);
            }else{
                  swal("Warning!",data.message, "warning")
            }
      })
      .catch(error=>{
            swal("Error", error.message, "error")
      })
}

function checkSession(){
      var user_access=sessionStorage.getItem('user_access');
      var role_id=sessionStorage.getItem('role_id');

      if(!user_access){
            alert("Session Has expired, You have to login ");
            logoutRequest();
      }
}