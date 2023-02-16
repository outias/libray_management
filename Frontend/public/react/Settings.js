import React,{useState,useEffect} from "react";
import  ReactDOM  from "react-dom";
import packageJson from '../../../package.json';
import $ from 'jquery';

//files
import GeneralSettings from "./GeneralSettings";
import User from "./User";

export default function Settings(){

      

      useEffect(()=>{
          getView("GeneralSettings");
          
      },[])

      

      function getView(view){

            var viewArea=document.getElementById('viewArea');
            var root=ReactDOM.createRoot(viewArea);
            if(view=="GeneralSettings"){
                  root.render(<React.StrictMode>
                        <GeneralSettings />
                 </React.StrictMode>);

                  //class
                  $('#general').addClass("active");
                  $('#request_status').removeClass("active");
            }
            else if(view=="User"){
                  root.render(<React.StrictMode>
                                   <User />
                            </React.StrictMode>);

                  //class
                  $('#general').removeClass("active");
                  $('#request_status').addClass("active");
            }

           
            
      }

      return(
            <div>
             <div class="col-12">
                  <div class="card my-4">
                  <div  class="card-header p-0 position-relative mt-n4 mx-3 " >
                        <div style={{marginTop:15,marginBottom:10}} class="bg-gradient-secondary shadow-primary border-radius-lg pt-4 pb-3">
                           <h6 class="text-white text-capitalize ps-3">SETTINGS</h6>
                       </div>
                    </div>
                  </div>
            </div>
            <div class="row">
                  <div class="col-lg-3 col-md-12 col-sm-12">
                        <div class="card">
                              <div class="list-group list-group-transparent mb-0 mail-inbox" style={{backgroundColor:"white"}}>
                                    <a href="#" id="general" onClick={()=>getView('GeneralSettings')} class="list-group-item list-group-item-action d-flex align-items-center active">
                                    <span class="icon mr-3"><i class="fe fe-inbox"></i></span>General Settings<span class="ml-auto badge badge-success"></span>
                                    </a>

                                    {/* <a href="#" id="request_status" onClick={()=>getView('User')} class="list-group-item list-group-item-action d-flex align-items-center ">
                                    <span class="icon mr-3"><i class="fe fe-inbox"></i></span>Request Status<span class="ml-auto badge badge-success"></span>
                                    </a> */}

                              </div>
                        </div>
                        
                        </div>
                        <div class="col-lg-9 col-md-12 col-sm-12" >
                              <div class="card  img-card box-secondary-shadow">
                                    <div class="card-body">
                                    
                                          <div id="viewArea" class="viewArea"></div>
                              </div>
                        </div>
                  </div>
            </div>
            </div> 
      );
}