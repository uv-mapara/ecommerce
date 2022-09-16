/*START - OTP DATA OPERATIONS*/
$("#btnOtp").click(function () {
    Otp();  
});
function Otp() { 
    var ErrMsg = '';    

    if ($("#otp").val().trim() == '') {
        ErrMsg += '<br/>-- Otp.';
    }   
    
    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
    }
    
    else{         
        ShowLoader();     
        $.ajax({
            url: 'forgotOtp',
            type:'POST',
            data: {
                otp:$('#otp').val(),                
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
              },
            success: function(resp) {                                            
              HideMessage("DivDisplayMsg"); 
              setTimeout(HideLoader,2000);          
              if(resp.opstatus ==  "Success"){                    
                setTimeout(function(){
                    window.location.href = "newpassword";
                },2000)                                 
                $("#otp").val('');                                        
               }
               else
               {
                setTimeout(function(){
                    otp="-- OTP Wrong."
                        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + otp, 0);                       
                    },2000)
               }
            //    else if(resp.opstatus ==  "Wrong"){                    
            //     setTimeout(function(){
            //         otp="-- OTP Wrong."
            //         ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + otp, 0);                       
            //     },2000)                                        
            //    }                                                  
            },
          });          
    } 
}   
/*END - OTP DATA OPERATIONS*/

/*START - OTP DATA OPERATIONS*/
$("#btnResendOtp").click(function () {
    Otp();  
});

/*END - OTP DATA OPERATIONS*/
