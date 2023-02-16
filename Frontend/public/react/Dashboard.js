import React,{useEffect} from "react";
import packageJson from '../../../package.json';

//Datatable Modules
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';

//Datatable Modules
import '../assets/css/dashboard.css';

export default function Dashboard(){


      useEffect(()=>{
        countAuthenticateUser();
         countComment();
         countBooks();
      },[])

      function countAuthenticateUser(){
        fetch(packageJson.proxy+'/authentication/countAuthenticateUser',{
          method:"GET",
          headers:{
                'Content-Type':"application/json"
          }
          })
          .then(response =>response.json())
          .then(data =>{
              $("#users_count").html(data.data)

              
          })
          .catch(error=>{
                swal("Error", error.message, "error")
          })
      }
      
      function countBooks(){
        fetch(packageJson.proxy+'/authentication/countBooks',{
          method:"GET",
          headers:{
                'Content-Type':"application/json"
          }
          })
          .then(response =>response.json())
          .then(data =>{
              $("#books_count").html(data.data);
              $("#like_count").html('-');
              
              
          })
          .catch(error=>{
                swal("Error", error.message, "error")
          })
      }
      
      function countComment(){
        fetch(packageJson.proxy+'/authentication/countComment',{
          method:"GET",
          headers:{
                'Content-Type':"application/json"
          }
          })
          .then(response =>response.json())
          .then(data =>{
              $("#comment_count").html(data.data)
              
          })
          .catch(error=>{
                swal("Error", error.message, "error")
          })
      }
      return(
        <div class="row">
                    <div class="col-12">
                     <div class="card my-4">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2" >
                           
                           <div style={{marginTop:15,marginBottom:10}} class="bg-gradient-danger shadow-primary border-radius-lg pt-4 pb-3">
                              <h6 class="text-white text-capitalize ps-3">Dashboard</h6>
                             
                           </div>
                         </div>
                            
      <div style={{marginLeft:10,marginRight:10}} >
         <div class="tab-pane fade show active" id="business-1" role="tabpanel" aria-labelledby="business-tab">
                    <div class="row">
                      <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                        <div class="card">

                          <div class="card-body text-center">
                            <h5 class="mb-2 text-dark font-weight-normal" >Users</h5>
                            <h2 class="mb-4 text-dark font-weight-bold" id="users_count"></h2>
                            <i class="fa fa-user text-info" aria-hidden="true"  style={{fontSize:30}}></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                        <div class="card">
                          <div class="card-body text-center">
                            <h5 class="mb-2 text-dark font-weight-normal">Books</h5>
                            <h2 class="mb-4 text-dark font-weight-bold" id="books_count"></h2>
                            <i class="fa fa-book text-primary" aria-hidden="true"  style={{fontSize:30}}></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3  col-lg-6 col-sm-6 grid-margin stretch-card">
                        <div class="card">
                          <div class="card-body text-center">
                            <h5 class="mb-2 text-dark font-weight-normal">Comments</h5>
                            <h2 class="mb-4 text-dark font-weight-bold" id="comment_count"></h2>
                            <i class="fa fa-comment text-danger" aria-hidden="true"  style={{fontSize:30}}></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                        <div class="card">
                          <div class="card-body text-center">
                            <h5 class="mb-2 text-dark font-weight-normal">Most Like</h5>
                            <h2 class="mb-4 text-dark font-weight-bold" id="like_count"></h2>
                            <i class="fa fa-check-square text-success" aria-hidden="true"  style={{fontSize:30}}></i>
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