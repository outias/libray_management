import React, { useEffect, useState } from 'react';
 //Datatable Modules
 import "jquery/dist/jquery.min.js";
 import "datatables.net-dt/js/dataTables.dataTables";
 import "datatables.net-buttons/js/buttons.print";
 import "datatables.net-buttons/js/buttons.html5";
 import "datatables.net-dt/css/jquery.dataTables.min.css";
 import $ from 'jquery';
import '../css/books_details.css';
import packageJson from '../../../package.json';

export default function BooksDetails({id}){

      const [comments,setComments]=useState([]);
      const [like,setLike]=useState(0);
      const [favorite,setFavorite]=useState(0);

      useEffect(()=>{
            getUseSession();


            getComments(id);
            getLike();
            getFavorite();
            getOneBooks(id)
      },[])

      function getOneBooks(id){
            fetch(packageJson.proxy+'/authentication/books/getOneBooks',{
                  method:"POST",
                  headers:{
                        'Content-Type':"application/json"
                  },
                  body:JSON.stringify({
                        "id":id
                  })
            })
            .then(response =>response.json())
            .then(data =>{
                  console.log(data.data)
                  data.data.map(item =>{
                      $("#title").html(item.title);
                      $("#author").html(item.author);
                      $("#price").html(item.price);
                      $("#description").html(item.description);

                      $("#saveButton").html("Update")
                  })
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
            
      }

      function getUseSession(){
            var user_id=sessionStorage.getItem('user_id');

            document.getElementById('user_id').value=user_id;
            document.getElementById('book_id').value=id;
      }

      function saveComment(e){

            e.preventDefault();
            var form=document.querySelector('form');
            const formData = new FormData(form);

            fetch(packageJson.proxy+'/authentication/books/addComment',{
                  method:"POST",
                  
                  body:formData
            })
                  .then(response =>response.json())
                  .then(data =>{
                  if(data.status==1){
                        getComments(id);
                        $("#comment").val("");
                        swal("Good job!",data.message, "success")

                  }else if(data.status==2){
                        swal("Warning!",data.message, "warning")
                  
                  }
                  
            })
                  .catch(error=>{
                  swal("Error", error.message, "error")
            })
         
      }
      
      function addLike(status){

            e.preventDefault();
            const formData = new FormData();
            var user_id=document.getElementById('user_id').value;
            var book_id=document.getElementById('book_id').value;

            formData.append('user_id',user_id);
            formData.append('book_id',book_id);
            formData.append('status',status);

            fetch(packageJson.proxy+'/authentication/books/addLike',{
                  method:"POST",
                  
                  body:formData
            })
                  .then(response =>response.json())
                  .then(data =>{
                  if(data.status==1){
                        swal("Good job!",data.message, "success")

                  }else if(data.status==2){
                        swal("Warning!",data.message, "warning")
                  
                  }
                  
            })
                  .catch(error=>{
                  swal("Error", error.message, "error")
            })
         
      }
      
      function addFavorite(status){

            e.preventDefault();
            const formData = new FormData();
            var user_id=document.getElementById('user_id').value;
            var book_id=document.getElementById('book_id').value;

            formData.append('user_id',user_id);
            formData.append('book_id',book_id);
            formData.append('status',status);

            fetch(packageJson.proxy+'/authentication/books/addFavorite',{
                  method:"POST",
                  
                  body:formData
            })
                  .then(response =>response.json())
                  .then(data =>{
                  if(data.status==1){
                        swal("Good job!",data.message, "success")

                  }else if(data.status==2){
                        swal("Warning!",data.message, "warning")
                  
                  }
                  
            })
                  .catch(error=>{
                  swal("Error", error.message, "error")
            })
         
      }

      function getComments(book_id){
            fetch(packageJson.proxy+'/authentication/books/getComments',{
                  method:"POST",
                  headers:{
                        'Content-Type':"application/json"
                  },
                  body:JSON.stringify({
                        'book_id':book_id
                  })
            })
            .then(response =>response.json())
            .then(data =>{

               //   console.log(data.data);
               setComments(data.data);
                 
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
      }

      function getLike(){

            const formData = new FormData();
            var user_id=document.getElementById('user_id').value;
            var book_id=document.getElementById('book_id').value;

            formData.append('user_id',user_id);
            formData.append('book_id',book_id);

            fetch(packageJson.proxy+'/authentication/books/getLike',{
                  method:"POST",
                  body:formData
            })
            .then(response =>response.json())
            .then(data =>{

               setLike(data.data);
                 
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
      }

      function getFavorite(){

            const formData = new FormData();
            var user_id=document.getElementById('user_id').value;
            var book_id=document.getElementById('book_id').value;

            formData.append('user_id',user_id);
            formData.append('book_id',book_id);

            fetch(packageJson.proxy+'/authentication/books/getFavorite',{
                  method:"POST",
                  body:formData
            })
            .then(response =>response.json())
            .then(data =>{

               setFavorite(data.data);
                 
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
      }

      function getElapseTime(time_ago){
            // Calculating the time elapsed from 
            // 1970-01-01 to 2020-08-22
            
            // set the time
            let first = Date.parse(time_ago)
            
            // assigning present time to now variable
            let end = Date.parse(new Date());    
            
            let elapsed = (end-first);

            var day=parseInt(elapsed/(1000*60*60*24)); 
            var d = Number(elapsed);
            var hour = Math.floor(d / 3600);
            var minutes = Math.floor(d % 3600 / 60);
            var second = Math.floor(d % 3600 % 60);

            if(day >= 1){
                  return day+" Day";
            }
            else if(hour >=1 && day < 1){
                  return hour+" hour";
            }
             else if(minutes >=1 && hour < 1){
                  return minutes+" minutes";
            }
             else if(second >=1 && hour < 1){
                  return second+" minutes";
            }else{
                  return "Couple Minutes";
            }
            
      }


      return(
            <div>
                   <div class="row">
                    <div class="col-12">
                     <div class="card my-4">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2" >
                           
                        <div style={{marginTop:15,marginBottom:10}} class="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                              <h6 class="text-white text-capitalize ps-3">BOOKS DETAILS</h6>
                             
                           </div>
                           
                        </div>
                        <div class="card-body px-0 pb-3">


                       
                  <div class="container bootdey">
                  <div class="col-md-12 bootstrap snippets">
                  <div class="panel">
                        <div class="panel-body">
                              <h2 id="title"></h2>
                              <span>
                                    <small id="price"></small> |
                                    <small id="author"></small>
                              
                              </span>
                              <p id="description"></p>

                              <div class="btn-group">
                                    <a class="btn btn-sm btn-default btn-hover-success" onClick={()=>{ addLike}} href="#"><i class="fa fa-thumbs-up"></i></a>
                                    
                                    <a class="btn btn-sm btn-default btn-hover-danger" onClick={()=>{ addFavorite}} href="#"><i class="fa fa-heart"></i></a>
                              </div>
                              <form id="form2" onSubmit={(event)=>saveComment(event)} enctype="multipart/form-data" >

                              <input type="hidden" class="form-control" name="user_id" id="user_id"/>
                              <input type="hidden" class="form-control" name="book_id" id="book_id"  />
                              
                              <textarea class="form-control" name="comment" id="comment" rows="5" placeholder="What are you thinking?" required></textarea>
                              <div class="mar-top clearfix">
                                    <button class="btn btn-sm btn-primary pull-right" type="submit"><i class="fa fa-pencil fa-fw"></i> Comment</button>
                              
                              </div>
                              </form>
                        </div>
                  </div>
                  <div class="panel">
                  <div class="panel-body">
                        { comments.map(item=>{ return(
                              <div class="media-block">

                                    <a class="media-left" href="#"><img class="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar1.png" /></a>

                                    <div class="media-body" style={{marginStart:10}}>
                                          <div class="mar-btm">
                                          <a href="#" class="btn-link text-semibold media-heading box-inline">{item.first_name+" "+item.last_name}</a><br/>
                                          <small class="text-muted text-sm">{item.email}</small><br/>

                                          {}
                                          <small class="text-muted text-sm">{getElapseTime(item.created_on)} ago</small><br/>
                                          </div>
                                          <p>{item.comment}</p>
                                          <div class="pad-ver">
                                          </div>
                                          <hr />

                                          </div>
                              </div>
                                  )  }  )}
                  </div>
                  </div>

             </div>
            </div>
            </div>
            </div>
                  </div>
                  </div>
                  </div>
      )
}