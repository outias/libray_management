
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
