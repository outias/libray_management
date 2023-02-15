import React,{useEffect} from "react";


//Datatable Modules
import '../assets/css/dashboard.css';

export default function Dashboard(){


      useEffect(()=>{
         getSetting();
      },[])

      function getSetting(){
            
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
                            <h5 class="mb-2 text-dark font-weight-normal" >Pending Requests</h5>
                            <h2 class="mb-4 text-dark font-weight-bold">932.00</h2>
                            <i class="fa fa-registered text-info" aria-hidden="true"  style={{fontSize:30}}></i>
                            <h3 class="mb-0 font-weight-bold mt-2 text-dark">10%</h3>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                        <div class="card">
                          <div class="card-body text-center">
                            <h5 class="mb-2 text-dark font-weight-normal">Progress Requests</h5>
                            <h2 class="mb-4 text-dark font-weight-bold">756,00</h2>
                            <i class="fa fa-eyedropper text-primary" aria-hidden="true"  style={{fontSize:30}}></i>
                            <h3 class="mb-0 font-weight-bold mt-2 text-dark">50%</h3>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3  col-lg-6 col-sm-6 grid-margin stretch-card">
                        <div class="card">
                          <div class="card-body text-center">
                            <h5 class="mb-2 text-dark font-weight-normal">Rejected Requests</h5>
                            <h2 class="mb-4 text-dark font-weight-bold">100,38</h2>
                            <i class="fa fa-close text-danger" aria-hidden="true"  style={{fontSize:30}}></i>
                            <h3 class="mb-0 font-weight-bold mt-2 text-dark">35%</h3>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                        <div class="card">
                          <div class="card-body text-center">
                            <h5 class="mb-2 text-dark font-weight-normal">Completed Requests</h5>
                            <h2 class="mb-4 text-dark font-weight-bold">4250k</h2>
                            <i class="fa fa-check-square text-success" aria-hidden="true"  style={{fontSize:30}}></i>
                            <h3 class="mb-0 font-weight-bold mt-2 text-dark">25%</h3>
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