
     var currentTab = 0; // Current tab is set to be the first tab (0)
   
    document.getElementById('newRequestButton').addEventListener('click',function(){
      currentTab=0;
        showTab(0);
    });
    
    document.getElementById('requestCloseButton1').addEventListener('click',function(){
      fixStepIndicatorInactive();
    });
    
    
    
    
    document.getElementById('prevBtn').addEventListener('click',function(){

       nextPrev(-1)
        
    })
    
    document.getElementById('nextBtn').addEventListener('click',function(){

       nextPrev(1)
         
    });

    function nextPrev(n){
       // This function will figure out which tab to display
       var x = document.getElementsByClassName("step");
       // Exit the function if any field in the current tab is invalid:
      if (n == 1 && !validateForm()) {
          
        if(currentTab==0){
          swal("Incomplete Data", "You Have To Select Request Type", "warning")
        }else{
          swal("Incomplete Data", "Please Fill All Required Field", "warning")
        }
          
          return false;
      }


       // Hide the current tab:
       x[currentTab].style.display = "none";
       // Increase or decrease the current tab by 1:
       currentTab = currentTab + n;
      
      
       // if you have reached the end of the form...
       if (currentTab >= x.length) {
         // ... the form gets submitted:
         document.getElementById("signUpForm").submit();
         return false;
       }

       // Otherwise, display the correct tab:
       showTab(currentTab);
    }

    function validateForm() {
      // This function deals with validation of the form fields
      var x, y, i,z,s, valid = true;
      x = document.getElementsByClassName("step");
      z, y = x[currentTab].getElementsByTagName("input");
      s = x[currentTab].getElementsByTagName("select");
      // A loop that checks every input field in the current tab:

      if(currentTab==0){
        for (i = 0; i < y.length; i++) {
            // If a field is empty...


            if (!y[i].checked) {
              // add an "invalid" class to the field:
              y[i].className += " invalid ";
              // and set the current valid status to false
    
                valid = false;

                getRequestType(1);
                continue;
            }else{
                valid=true
                break;
            }
        }
      }else if(currentTab==1){

        var requestType1=document.getElementById('requestType1');
        var requestType2=document.getElementById('requestType2');
        var requestType3=document.getElementById('requestType3');
        var requestType4=document.getElementById('requestType4');
        var requestType5=document.getElementById('requestType5');

        var accident_verification=document.getElementsByClassName('accident_verification');
        var insurance_vehicle=document.getElementsByClassName('insurance_vehicle');
        var identity_verification=document.getElementsByClassName('identity_verification');
        var third_part=document.getElementsByClassName('third_part');
        var claimat_details=document.getElementsByClassName('claimat_details');

       
          for (i = 0; i < y.length; i++) {
                // If a field is empty...
                

                y[i].classList.remove("invalid"); 
                if(requestType1.checked){
                  
                    if (y[i].value == "" && y[i].attributes['required'] && y[i].classList.contains("insurance_vehicle")) {

                           y[i].className += " invalid ";
                          valid = false;

                          
                    }
                }
                if(requestType2.checked){
                 
                  //input
                    if (y[i].value == "" && y[i].attributes['required'] && y[i].classList.contains("accident_verification")) {

                           y[i].className += " invalid ";
                          valid = false;
                    }
                    
                   
                    
                }
                
                if(requestType3.checked){
                  
                    if (y[i].value == "" && y[i].attributes['required'] && y[i].classList.contains("identity_verification")) {

                           y[i].className += " invalid ";
                          valid = false;
                    }
                }
                if(requestType4.checked){
                    if (y[i].value == "" && y[i].attributes['required'] && y[i].classList.contains("third_part")) {

                           y[i].className += " invalid ";
                          valid = false;
                    }
                }
                if(requestType5.checked){
                    if (y[i].value == "" && y[i].attributes['required'] && y[i].classList.contains("claimat_details")) {

                           y[i].className += " invalid ";
                          valid = false;
                    }
                }
                
          }

        
          for (i = 0; i < s.length; i++) {
           //select
              if(requestType2.checked){
                    var option=s[i].options[s[i].selectedIndex].value;
                   
                    if (option == "" && s[i].hasAttribute('required') && s[i].classList.contains("accident_verification")) {
                    
                          valid = false;
                    }
              }

          }

      }else if(currentTab==2){

        var candidateChoiceNew=document.getElementById('candidateChoiceNew');
        var candidateChoiceOld=document.getElementById('candidateChoiceOld');

        //one selector
        var myCandidate=document.getElementById('myCandidate');
        
            for (i = 0; i < y.length; i++) {

              //remove invalid
              y[i].classList.remove("invalid"); 

              //check to add invalid
              if(candidateChoiceNew.checked){
                  // If a field is empty...
                  if (y[i].value == "" && y[i].attributes['required'] && s[i].classList.contains("candidateChoiceNew")) {
                    // add an "invalid" class to the field:
                    y[i].className += " invalid ";
                    // and set the current valid status to false
          
                    valid = false;
                  }
              }
              
              if(candidateChoiceOld.checked){
                   if(myCandidate.value==""){
                       myCandidate.className +="invalid";

                       valid = false;
                   }
              }
                
            }
      }

      else if(currentTab==3){

        //remove invalid
        y[i].classList.remove("invalid"); 
        for (i = 0; i < y.length; i++) {
          // If a field is empty...
          if (y[i].value == "" && y[i].attributes['required']) {
            // add an "invalid" class to the field:
             y[i].className += " invalid ";
            // and set the current valid status to false
  
             valid = false;
          }
        }
      }

      else{

        
        for (i = 0; i < y.length; i++) {
          // If a field is empty...
          if (y[i].value == "" && y[i].attributes['required']) {
            // add an "invalid" class to the field:
             y[i].className += " invalid ";
            // and set the current valid status to false
  
             valid = false;
          }
        }
      }




      // If the valid status is true, mark the step as finished and valid:
      if (valid) {
    
        for (z = 0; z < y.length; z++) {
          y[z].classList.remove("invalid");    
        }
        document.getElementsByClassName("stepIndicator")[currentTab].className += " finish";
      }
      return valid; // return the valid status
    }
    
    function showTab(n) {
      
      // This function will display the specified tab of the form...
      var x = document.getElementsByClassName("step");
      x[n].style.display = "block";
      //... and fix the Previous/Next buttons:
      if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("saveButton").style.display = "none";
        document.getElementById("nextBtn").style.display = "inline";
      } else {
        document.getElementById("saveButton").style.display = "none";
        document.getElementById("prevBtn").style.display = "inline";
      }
      if (n == (x.length - 1)) {

        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("saveButton").style.display = "inline";

        
      } else {
        document.getElementById("nextBtn").innerHTML = "Next";
      }
      //... and run a function that will display the correct step indicator:
      fixStepIndicator(n)
    }


    function fixStepIndicator(n) {
      // This function removes the "active" class of all steps...
      var i, x = document.getElementsByClassName("stepIndicator");
      for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
      }
      //... and adds the "active" class on the current step:
      x[n].className += " active";
    }    
      
    function fixStepIndicatorInactive() {
      // This function removes the "active" class of all steps...
      var i, x = document.getElementsByClassName("stepIndicator");
      var step = document.getElementsByClassName("step");
      
     
    
      
      for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
        x[i].className = x[i].className.replace(" finish", "");
        step[i].style.display = "none";
      }
      
      var k=0;
      for (k = 0; k < x.length; k++) {
        x[k].className = x[k].className.replace(" active", "");
        x[k].className = x[k].className.replace(" finish", "");
      }

      

      var y =document.getElementsByTagName('input');
      var z =document.getElementsByTagName('select');
      for (var p = 0; p < y.length; p++) {
          y[p].classList.remove('invalid');
      }

      
    
    }    
      
          
   
    function getRequestType(id){
      var insuranceDiv=document.getElementById('insuranceDiv');
      var accidentDiv=document.getElementById('accidentDiv');
      var identityDiv=document.getElementById('identityDiv');
      var thirdPartDiv=document.getElementById('thirdPartDiv');
      var claimatDiv=document.getElementById('claimatDiv');
    
      //get class of all request type input
      var requestTypeClass=document.getElementsByClassName('requestTypeClass');

    
      var requestType1=document.getElementById('requestType1');
      var requestType2=document.getElementById('requestType2');
      var requestType3=document.getElementById('requestType3');
      var requestType4=document.getElementById('requestType4');
      var requestType5=document.getElementById('requestType5');

      ///set display none
      insuranceDiv.style.display='none';
      accidentDiv.style.display='none';
      identityDiv.style.display='none';
      thirdPartDiv.style.display='none';
      claimatDiv.style.display='none';

      //alert(requestType1.checked)
      //check to set show
      if(requestType1.checked){
            insuranceDiv.style.display='block';
      }
      if(requestType2.checked){
            accidentDiv.style.display='block';
      }
      if(requestType3.checked){
            identityDiv.style.display='block';
      }
      if(requestType4.checked){
            thirdPartDiv.style.display='block';
      }
      if(requestType5.checked){
            claimatDiv.style.display='block';
      }

}