/*START - SAVE DATA OPERATIONS*/
$("#btnSignup").click(function () {
    signup();  
});
function signup() { 
    var ErrMsg = '';    

    if ($("#username").val().trim() == '') {
        ErrMsg += '<br/>-- Username.';
    }   
    if ($('#email').val().trim() == '') {
        ErrMsg += '<br/>-- E-mail ID.';
    }
    else {
        var Valid = validateEmail($("#email").val().trim());
        if (!Valid) {
            ErrMsg += '<br/>-- Invalid E-mail ID.';
        }       
    } 

    if ($("#phone").val().trim() == '') {
        ErrMsg += '<br/>-- Mobile.';
    }  
     
    if ($("#password").val().trim() == '') {
        ErrMsg += '<br/>-- Password.';
    }
    
    if ($("#confirmpassword").val().trim() == '') {
        ErrMsg += '<br/>-- Confirm Password.';
    }
    
    else{
        if ($("#password").val() != $("#confirmpassword").val()) {
            ErrMsg += '<br/>-- Password Does not Match.';
        }
    }

    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
    }
    
    else{         
        ShowLoader(); 
        $.ajax({
            url: 'signup',
            type:'POST',
            data: {
                username:$('#username').val(),
                email:$('#email').val(),
                phone:$('#phone').val(),
                password:$('#password').val(),
                confirmpassword:$('#confirmpassword').val(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
              },
            dataType: 'json',
            success: function(resp) { 
                console.log(resp)
                console.log(resp.opstatus)                                        
                HideMessage("DivDisplayMsg"); 
                setTimeout(HideLoader,2000);      
                
                if(resp.opstatus ==  "Error"){
                    alert('eror new');
                    setTimeout(function(){
                        email="-- email has already Exist."
                        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + email, 0);                       
                    },2000)                                        
                }   
                else
                {
                    alert('ersuccessor new');
                    setTimeout(function(){
                        window.location.href = "signupAuthentication";
                    },2000)
                    $("#username").val('');             
                    $("#email").val('');
                    $("#phone").val('');
                    $("#password").val('');
                    $("#confirmpassword").val('');
                }                                         
            },
        });          
    } 
}   
/*END - SAVE DATA OPERATIONS*/