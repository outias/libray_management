import React,{useState,useEffect} from "react";
import packageJson from '../../../package.json';
import ReactDOM  from "react-dom";



  //Datatable Modules
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';
import BooksDetails from "./BooksDetails";


export default function Books(){
      const[books,setBooks]=useState([]);
      const[show,setShow]=useState('none');

      
      
      useEffect(()=>{ 
          getBooks();
          getSetting();
          getUseSession();
      },[]);

      function getUseSession(){
            var user_id=sessionStorage.getItem('user_id');
            var role_id=sessionStorage.getItem('role_id');

            if(role_id==1){ //admin
                  setShow('block')
            }else{
                  setShow('none')
            }
      }

      function getSetting(){
            $(document).ready(function () {
                  $("#vendor").DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                              {
                                    extend: "print",
                                    className: "btn btn-success bg-success",
                              },{
                                    extend: "copy",
                                    className: "btn btn-primary bg-success",
                              }
                        ],
                        "pageLength": 10,
                        "bDestroy": true,
                       
                  });
            });
                
      }
      function getBooks(){
            fetch(packageJson.proxy+'/authentication/books',{
                  method:"GET",
                  headers:{
                        'Content-Type':"application/json"
                  }
            })
            .then(response =>response.json())
            .then(data =>{

               //   console.log(data.data);
               setBooks(data.data);
                 
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
      }

    

      function addBooks(){

          
            var form=document.querySelector('form');
            const formData = new FormData(form);

            fetch(packageJson.proxy+'/authentication/books/addBooks',{
                  method:"POST",
                  
                  body:formData
            })
                  .then(response =>response.json())
                  .then(data =>{
                  if(data.status==1){
                        clear_input();
                        swal("Good job!",data.message, "success")

                  }else if(data.status==2){
                        swal("Warning!",data.message, "warning")
                  
                  }
                  
            })
                  .catch(error=>{
                  swal("Error", error.message, "error")
            })
         
      }
    
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
                      $("#hidden_unique_id").val(item.id);
                      $("#title").val(item.title);
                      $("#author").val(item.author);
                      $("#price").val(item.price);
                      $("#description").val(item.description);

                      $("#saveButton").html("Update")
                  })
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
            
      }
      
      function deleteBooks(id){
            var conf=confirm("Are you sure you want to delete a book ?")
            if(conf){
                  fetch(packageJson.proxy+'/authentication/books/deleteBooks',{
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
      
                      
                       clear_input();
                        swal("Good job!",data.message, "success")
                  })
                  .catch(error=>{
                        swal("Error", error.message, "error")
                  })
            }
            
      }

      function viewBooks(id){
          //  document
         var root=document.getElementById('root');
         var dom=ReactDOM.createRoot(root);
         dom.render(<BooksDetails id={id} />);

      }
     
      function clear_input(){
            $("#saveButton").html("Save")
             document.getElementById('form2').reset();
            $("#hidden_unique_id").val("");
           
          //  $('#vendor').empty()
            setBooks([])
            getBooks();
          
      }

      
   
      return(
            <div>
               <div class="row">
                    <div class="col-12">
                     <div class="card my-4">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2" >
                           
                        <div style={{marginTop:15,marginBottom:10}} class="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                              <h6 class="text-white text-capitalize ps-3">BOOKS</h6>
                             
                           </div>
                           <div class="col-12 text-end" >
                        
                                <button class="btn btn-success btn-sm mb-0" onClick={clear_input}  data-bs-toggle="modal" data-bs-target="#largeModal" style={{margin:20,marginEnd:10,marginTop:10,padding:10,display:show}}>Add Book</button>
                           </div>
                           
                        </div>
                        <div class="card-body px-0 pb-3">
                             <div class="table-responsive p-3">
                                    <table id="vendor" class="table align-items-center mb-0">
                              <thead>
                                    <tr>
                                          {/* <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Number</th> */}
                                          <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title</th>
                                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
                                        
                                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</th>
                                         
                                        
                                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    { 
                                  
                                    books.map(item=>{ return(
                                    <tr>
                                          <td>
                                                <div class="d-flex px-2 py-1">
                                                      
                                                      <div class="d-flex flex-column justify-content-center">
                                                            <h6 class="mb-0 text-sm">{item.title}</h6>
                                                           
                                                      </div>
                                                </div>
                                          </td>
                                          <td class="align-middle text-center">
                                                    <div class="d-flex flex-column justify-content-center">
                                                              <h6 class="mb-0 text-sm">{item.author}</h6>
                                                          
                                                      </div>
                                                
                                          </td>
                                          <td class="align-middle text-center">
                                                            <span class="text-secondary text-xs font-weight-bold">{parseInt(item.price).toLocaleString('TZS')}</span> 
                                          </td>
                                        
                             
                                          <td class="align-middle">
                                        
                                                <div class="btn-group" role="group" aria-label="Basic outlined example">
                                                
                                                      <button type="button" style={{display:show}} onClick={()=>getOneBooks(item.id)} data-bs-toggle="modal" data-bs-target="#largeModal"  class="btn btn-outline-primary" title="edit">
                                                      <i class="fa fa-edit text-success"></i></button>


                                                      <button type="button" style={{display:show}}  onClick={()=>deleteBooks(item.id)} class="btn btn-outline-primary deleterow" title="delete">
                                                      <i class="fa fa-trash text-danger"></i></button>
                                                      
                                                      <button type="button" onClick={()=>viewBooks(item.id)} class="btn btn-outline-primary deleterow" title="delete">
                                                      <i class="fa fa-eye text-primary"></i></button>

                                          
                                                </div>
                                          </td>
                                    </tr>
                                 )})}
                           
                              </tbody>
                        </table>
                        </div>
                        </div>
                  </div>
                  </div>
                  </div>

      {/* modal */}
      <div class="modal fade" id="largeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h5 class="modal-title" id="staticBackdropLabel">New Book</h5>
                              <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                              <form id="form2" enctype="multipart/form-data" >
                                    <div class="row">
                                    <input type="hidden" class="form-control" name="hidden_unique_id" id="hidden_unique_id" />
                                          <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                      <label class="form-label"> Title<span style={{color:'red'}}>*</span></label>
                                                      <input type="text" class="form-control" 
                                                     id="title"  name="title" 
                                                      placeholder="Enter  Title" required />
                                                </div>
                                                <div class="form-group mb-3">
                                                      <label class="form-label">Author<span style={{color:'red'}}>*</span></label>
                                              
                                                      <input type="text" class="form-control" 
                                                     id="author"   name="author" 
                                                      placeholder="eg emanuel" required />
                                                </div>
                                             

                                          </div>
                                          
                                          <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                      <label class="form-label">Price (Tsh)<span style={{color:'red'}}>*</span></label>
                                                      <input type="number" class="form-control" id="price" name="price" placeholder="eg. 6000" required />
                                                </div>
                                                <div class="form-group mb-3">
                                                      <label class="form-label">Description</label>
                                                      <textarea class="form-control" id="description" name="description" rows={5}  required ></textarea>
                                                </div>
                                                

                                          </div>
                                    </div>
                              </form>                       




                        </div>
                        <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary" id="saveButton" onClick={addBooks}>Save</button>
                        </div>
                  </div>
            </div>
      </div>

      {/* end modal */}
      </div>
      )
}