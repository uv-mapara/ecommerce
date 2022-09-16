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
        ShowLoader("Please Wait");     
        $.ajax({
            url: 'signupAuthentication',
            type:'POST',
            data: {
                otp:$('#otp').val(),                
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
              },
            success: function(data) {                                            
              HideMessage("DivDisplayMsg"); 
              setTimeout(HideLoader,2000);          
              setTimeout(function(){
                window.location.href = "/";
              },2000)
                $("#otp").val('');                                   
            },
          });          
    } 
}   
/*END - OTP DATA OPERATIONS*/