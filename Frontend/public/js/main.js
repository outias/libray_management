
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


$("#registerUser").on('submit',(e)=>{
      e.preventDefault();

      //document element
      const firstName=document.getElementById('firstName');
      const lastName=document.getElementById('lastName');
      const phone=document.getElementById('phone');
      const email=document.getElementById('email');
      const password=document.getElementById('password');
      const rePassword=document.getElementById('rePassword');
      const role=2;
      const country_id=1;
      const gender=document.getElementById('gender');
      const hidden_unique_id=document.getElementById('hidden_unique_id');
     
      let specialCharacters= /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
      let upperCaseCharacter=  /[A-Z]/

      if(firstName.value==""||lastName.value=="" || phone.value=="" || email.value=="" ||  password.value=="" || rePassword.value==""  ){
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
            formData.append("role",2);
            formData.append("country_id",1);
            formData.append("gender",gender.value);
            formData.append("attachment","");
            formData.append("attachment_name","");
            

            fetch('/registerUser',{
                method:"POST",
                body:formData
            })
             .then(response =>response.json())
             .then(data =>{
                  if(data.status==1){
                      
                        swal("Good job!",data.message, "success")
                        alert(data.message);
                        location.replace('/');

                  }else if(data.status==2){
                        swal("Warning!",data.message, "warning")
                  
                  }
                  
            })
             .catch(error=>{
                  swal("Error", error.message, "error")
            })
    }
})

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
