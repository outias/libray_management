import React,{useState,useEffect} from "react";
import packageJson from '../../../package.json';


 //Datatable Modules
 import "jquery/dist/jquery.min.js";
 import "datatables.net-dt/js/dataTables.dataTables";
 import "datatables.net-buttons/js/buttons.print";
 import "datatables.net-buttons/js/buttons.html5";
 import "datatables.net-dt/css/jquery.dataTables.min.css";
 import $ from 'jquery';


export default function User(){
      const[user,setUser]=useState([]);
      const[country,setCountry]=useState([]);
      const[role,setRole]=useState([]);
      const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");
      const[show,setShow]=useState('none');
 
      const saveFile = (e) => {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
            //bind image
            var selected_image = document.getElementById('selected_image');
            selected_image.src = URL.createObjectURL(e.target.files[0]);
            selected_image.onload = function() {
                  URL.revokeObjectURL(selected_image.src) // free memory
            }
      };


      useEffect(()=>{
           getUser();
           getCountry();
           getRole();
           getSetting();
           getUseSession();
      },[])

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


      function getUser(){
            fetch(packageJson.proxy+'/authentication/user',{
                  method:"GET",
                  headers:{
                        'Content-Type':"application/json"
                  }
            })
            .then(response =>response.json())
            .then(data =>{

                  console.log(data.data);
                  setUser(data.data);
                  
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
      }
      
      function getCountry(){
            fetch(packageJson.proxy+'/authentication/country',{
                  method:"GET",
                  headers:{
                        'Content-Type':"application/json"
                  }
            })
            .then(response =>response.json())
            .then(data =>{

                  console.log(data.data);
                  setCountry(data.data);
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
      }

      function getRole(){
            fetch(packageJson.proxy+'/authentication/role',{
                  method:"GET",
                  headers:{
                        'Content-Type':"application/json"
                  }
            })
            .then(response =>response.json())
            .then(data =>{

                  console.log(data.data);
                  setRole(data.data);
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
      }

      function addUser(){

            //document element
            const firstName=document.getElementById('firstName');
            const lastName=document.getElementById('lastName');
            const phone=document.getElementById('phone');
            const email=document.getElementById('email');
            const password=document.getElementById('password');
            const rePassword=document.getElementById('rePassword');
            const role=document.getElementById('role');
            const country_id=document.getElementById('country_id');
            const gender=document.getElementById('gender');
            const hidden_unique_id=document.getElementById('hidden_unique_id');
           
            let specialCharacters= /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            let upperCaseCharacter=  /[A-Z]/

            if(firstName.value==""||lastName.value=="" || phone.value=="" || email.value=="" ||  password.value=="" || rePassword.value=="" || country_id.value=="" || role.value=="" ){
                  swal("Incomplete Data", "Please add all required field", "warning");
            }else if(!specialCharacters.test(password.value)){
                 swal("Password Error", "Your Password Must contain Upper case letter and Special charater", "warning");
            }
            else if(!upperCaseCharacter.test(password.value)){
                  swal("Password Error", "Your Password Must contain Upper case letter and Special charater", "warning");
            }else if(password.value.length < 7){
                  swal("Password Error", "Your Password Must contain Upper case letter and Special charater and lenght greter than 6", "warning");
            }else if(password.value!=rePassword.value ){
                swal("Incomplete Data", "Password must be the same", "warning");
            }else{
                  const formData = new FormData();
                  formData.append("hidden_unique_id",hidden_unique_id.value);
                  formData.append("firstName",firstName.value);
                  formData.append("lastName",lastName.value);
                  formData.append("phone",phone.value);
                  formData.append("email",email.value);
                  formData.append("password",password.value);
                  formData.append("role",role.value);
                  formData.append("country_id",country_id.value);
                  formData.append("gender",gender.value);
                  formData.append("attachment",file);
                  formData.append("attachment_name",fileName);
                  

                  fetch(packageJson.proxy+'/authentication/user/addUser',{
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
      }
    
      function getOneUser(id){
            fetch(packageJson.proxy+'/authentication/user/getOneUser',{
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
                      $("#firstName").val(item.first_name);
                      $("#lastName").val(item.last_name);
                      $("#phone").val(item.phone);
                      $("#email").val(item.email);
                      $("#password").val(item.password);
                      $("#rePassword").val(item.password);
                      $("#role").val(item.role_id);
                      $("#country_id").val(item.country_id);
                      $("#gender").val(item.gender);

                      $("#saveButton").html("Update")
                  })
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
            
      }
      
      function deleteUser(id){
            var conf=confirm("Are you sure you want to delete a user ?")
            if(conf){
                  fetch(packageJson.proxy+'/authentication/user/deleteUser',{
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
     
      function clear_input(){
            
            $("#saveButton").html("Save")
             document.getElementById('form2').reset();
            $("#hidden_unique_id").val("");

            setUser([]);
            getUser();
      }

      
   
      return(
            <div>
               <div class="row">
                    <div class="col-12">
                     <div class="card my-4">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2" >
                           
                        <div style={{marginTop:15,marginBottom:10}} class="bg-success  border-radius-lg pt-4 pb-3">
                              <h6 class="text-white text-capitalize ps-3">USERS</h6>
                             
                           </div>
                           <div class="col-12 text-end" >
                                <button class="btn btn-success btn-sm mb-0" onClick={clear_input}data-bs-toggle="modal" data-bs-target="#largeModal" style={{margin:20,marginEnd:10,marginTop:10,padding:10,display:show}}>Add User</button>
                           </div>
                           
                        </div>
                        <div class="card-body px-0 pb-3">
                             <div class="table-responsive p-3">
                                    <table id="vendor" class="table align-items-center mb-0">
                              <thead>
                                    <tr>
                                          <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Profile</th>
                                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Gender</th>
                                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phone Number</th>
                                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Country</th>
                                          
                                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Register On</th>
                                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    { 
                                    
                                    user.map(item=>(
                                    <tr>
                                          <td>
                                                <div class="d-flex px-2 py-1">
                                                      <div>
                                                      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="avatar avatar-sm me-3 border-radius-lg" alt="user4" />
                                                      </div>
                                                      <div class="d-flex flex-column justify-content-center">
                                                            <h6 class="mb-0 text-sm">{item.first_name+" "+item.last_name}</h6>
                                                            <p class="text-xs text-secondary mb-0">{item.email}</p>
                                                      </div>
                                                </div>
                                          </td>
                                          <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-bold">{item.gender}</span>
                                          </td>
                                           <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-bold">{item.phone}</span>
                                          </td>
                                          <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-bold">{item.country_name}</span>
                                          </td>
                                        
                                          <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-bold">{item.created_on}</span>
                                          </td>
                                          <td class="align-middle">
                                        
                                                <div class="btn-group" role="group" aria-label="Basic outlined example">
                                                
                                                      <button type="button" style={{display:show}}  onClick={()=>getOneUser(item.id)} data-bs-toggle="modal" data-bs-target="#largeModal"  class="btn btn-outline-primary" title="edit">
                                                      <i class="fa fa-edit text-success"></i></button>


                                                      <button type="button" style={{display:show}}  onClick={()=>deleteUser(item.id)} class="btn btn-outline-primary deleterow" title="delete">
                                                      <i class="fa fa-trash text-danger"></i></button>

                                          
                                                </div>
                                          </td>
                                    </tr>
                                     ))}
                           
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
                              <h5 class="modal-title" id="staticBackdropLabel">New User</h5>
                              <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                              <form id="form2" enctype="multipart/form-data" >
                                    <div class="row">
                                    <input type="hidden" class="form-control" name="hidden_unique_id" id="hidden_unique_id" />
                                          <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                      <label class="form-label">First Name<span style={{color:'red'}}>*</span></label>
                                                      <input type="text" class="form-control" 
                                                     id="firstName" 
                                                      placeholder="Enter First Name" required />
                                                </div>
                                                <div class="form-group mb-3">
                                                      <label class="form-label">Email<span style={{color:'red'}}>*</span></label>
                                                      <input type="email" class="form-control" id="email" placeholder="Enter Email" required />
                                                </div>
                                                
                                                <div class="form-group mb-3">
                                                      <label class="form-label">Country <span style={{color:'red'}}>*</span></label>
                                                      <select class="form-control " id="country_id">
                                                            <option value="">Select</option>
                                                            {
                                                                  country.map(item =>{
                                                                       return( <option value={item.id}>{item.name}</option>);
                                                                  })
                                                            }
                                                      </select>
                                                </div>

                                                <div class="form-group mb-3">
                                                      <label class="form-label">Password<span style={{color:'red'}}>*</span></label>
                                                      <input type="password" class="form-control" id='password' placeholder="Enter Password" required />
                                                </div>

                                                
                                                <div class="form-group mb-3">
                                                      <label class="form-label">Picture </label><br/>
                                                    
                                                      <input type="file" accept="image/*" class="form-control" id="attachment" name="attachment" onChange={saveFile} />
                                                </div>
                                                <div class="form-group mb-3">
                                                    <img id="selected_image" src="#" alt=" image" width="100px" height="100px"  />
                                                </div>

                                          </div>
                                          
                                          <div class="col-md-6">
                                               
                                                <div class="form-group mb-3">
                                                      <label class="form-label">Last Name<span style={{color:'red'}}>*</span></label>
                                                      <input type="text" class="form-control" id="lastName" placeholder="Enter Last Name" required />
                                                </div>
                                                <div class="form-group mb-3">
                                                      <label class="form-label">Phone Number<span style={{color:'red'}}>*</span></label>
                                                      <input type="text" class="form-control" id="phone" placeholder="Enter Phone Number" required />
                                                </div>
                                                <div class="form-group mb-3">
                                                      <label class="form-label">Role<span style={{color:'red'}}>*</span></label>
                                                      <select class="form-control" id="role">
                                                            <option value="">Select</option>
                                                            {
                                                                  role.map(item =>{
                                                                       return( <option value={item.id}>{item.name}</option>);
                                                                  })
                                                            }
                                                           
                                                      </select>
                                                </div>
                                                <div class="form-group mb-3">
                                                      <label class="form-label">Re-Password<span style={{color:'red'}}>*</span></label>
                                                      <input type="password" class="form-control" id="rePassword" placeholder="Enter Password" required />
                                                </div>

                                                <div class="form-group mb-3">
                                                     <label class="form-label">Gender<span style={{color:'red'}}>*</span></label>
                                                      <br></br>
                                                      <select class="form-control select2" id="gender">
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                           
                                                      </select>
                                                </div>

                                          </div>
                                    </div>
                              </form>                       




                        </div>
                        <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary" id="saveButton" onClick={addUser}>Save</button>
                        </div>
                  </div>
            </div>
      </div>

      {/* end modal */}

                  </div>
      )
}