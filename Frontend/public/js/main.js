
$(document).ready(function(){
      getSystemSettings();
})

$("#login").on('submit',(e)=>{
      e.preventDefault();

      var email=document.getElementById('email').value;
      var password=document.getElementById('password').value;

      if(email==""){
            swal("Warning", "Email is required", "warning")
      }else if(password==""){
            swal("Warning", "Password is required", "warning")
      }else{
            fetch('/login',{
                  method:"POST",
                  headers:{
                        
                        'Content-Type':"application/json",
                        
                  },
                  body:JSON.stringify({
                        "email":email,
                        "password":password
                  })
            })
            .then(response =>response.json())
            .then(data =>{
                  if(data.status==1){
                        swal("Good job!",data.message, "success");

                       setSession(data.data);


                        location.replace('authentication/libray_management');
                  }else{
                        swal("Warning!",data.message, "warning")
                  }
                  
            })
            .catch(error=>{
                  swal("Error", error.message, "error")
            })
      }
});

function setSession(data){

      sessionStorage.setItem("user_access",true);
      sessionStorage.setItem("user_id",data.id);
      sessionStorage.setItem("first_name",data.first_name);
      sessionStorage.setItem("last_name",data.last_name);
      sessionStorage.setItem("email",data.email);
      sessionStorage.setItem("phone",data.phone);
      sessionStorage.setItem("role_id",data.role_id);
      sessionStorage.setItem("gender",data.gender);
      
}

function delete_row(id) {
      var table = document.getElementById("tableID");
      var rowCount = table.rows.length;
      $("#row" + id).remove();
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
                       $(".system_name").html(mau.system_name);
                       $(".system_info").html(mau.system_info);
                       $(".system_attachment").src=mau.attachment;
                     
                  })
                  
            }else{
                  swal("Warning!",data.message, "warning")
            }
            
      })
      .catch(error=>{
            swal("Error", error.message, "error")
      })
}
