import React,{useState,useEffect} from "react";
import packageJson from '../../../package.json';
import {Helmet} from 'react-helmet';


  //Datatable Modules
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $, { event } from 'jquery';


export default function GeneralSettings(){
      const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");

      function saveFile(e) {
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
          getSystemSettings();
      },[]);

      
      

      function saveGeneralSetting(e){
            e.preventDefault();


            var form=document.querySelector('form');

            fetch(packageJson.proxy+'/authentication/settings/saveSettings',{
                  method:"POST",
                  
                  body:new FormData(form)
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
    
     
      function clear_input(){
            $("#saveButton").html("Save")
             document.getElementById('form2').reset();
            $("#hidden_unique_id").val("");
            getSystemSettings();
          
      }

      function getSystemSettings(){
            fetch('/settings',{
                  method:"GET",
                  headers:{
                        
                        'Content-Type':"application/json",
                        
                  },
                  
            })
            .then(response =>response.json())
            .then(data =>{
                  if(data.status==1){
                        $.each(data.data,function(mauu,mau){
                           document.getElementById('selected_image').src=mau.attachment;
                             $("#system_name").val(mau.system_name);
                             $("#system_info").val(mau.system_info);
                        })
                        
                  }else{
                        swal("Warning!",data.message, "warning")
                  }
                  
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
      }
      
      
   
      return(
            <div>
               <div class="row">
                    <div class="col-12">
                     <div class="card my-4">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2" >
                           
                           <div class="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                              <h6 class="text-white text-capitalize ps-3">SYSTEM SETTINGS</h6>
                             
                           </div>
                           
                        </div>
                        <div class="card-body px-0 pb-3">
                             
                        <form id="form2" onSubmit={(event)=>saveGeneralSetting(event)} enctype="multipart/form-data" style={{padding:10}}>
                                    <div class="row">
                                          <div class="col-md-12">
                                                
                                                <div class="form-group text-center mb-3">
                                                      <img id="selected_image" src="#" alt=" image" width="100px" height="100px"  />
                                                </div>
                                                <div class="form-group mb-3">
                                                      <label class="form-label">System Logo </label><br/>
                                                
                                                      <input type="file" accept="image/*" class="form-control" id="attachment" name="attachment" onChange={saveFile} />
                                                </div>
                                                <div class="form-group mb-3">
                                                      <label class="form-label">System Name<span style={{color:'red'}}>*</span></label>
                                                      <input type="text" class="form-control" 
                                                     id="system_name" name="system_name" 
                                                      placeholder="Recommended two words" required />
                                                </div>
                                                <div class="form-group mb-3">
                                                      <label class="form-label">System Info<span style={{color:'red'}}>*</span></label>
                                                      <textarea class="form-control" rows={5}
                                                     id="system_info" name="system_info" required ></textarea>
                                                </div>
                                                
                                                
                                                

                                          </div>
                                          
                                          
                                    </div>
                                    <div class="modal-footer">
                                          <button type="submit" class="btn btn-primary" id="saveButton" >Update</button>
                                    </div>     
                              </form> 


                        </div>
                  </div>
                  </div>
            </div>
      </div>
      )
}