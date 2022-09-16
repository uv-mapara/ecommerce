/*START - SAVE DATA OPERATIONS*/
$("#BtnLogin").click(function () {
    Login();  
});
function Login() { 
    var ErrMsg = '';    
     
    if ($('#email').val().trim() == '') {
        ErrMsg += '<br/>-- E-mail ID.';
    }
    else {
        var Valid = validateEmail($("#email").val().trim());
        if (!Valid) {
            ErrMsg += '<br/>-- Invalid E-mail ID.';
        }       
    } 
     
    if ($("#password").val().trim() == '') {
        ErrMsg += '<br/>-- Password.';
    }   

    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
    }
    
    else{         
        ShowLoader(); 
        $.ajax({
            url: '',
            type:'POST',
            data: {                
                email:$('#email').val(),                
                password:$('#password').val(),                
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
              },
            dataType: 'json',
            success: function(resp) { 
                console.log(resp)
                console.log(resp.opstatus)                                        
                HideMessage("DivDisplayMsg"); 
                setTimeout(HideLoader,2000);      
                
                if(resp.opstatus ==  "EmailError"){
                    alert('eror new');
                    setTimeout(function(){
                        email="-- Email Wrong."
                        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + email, 0);                       
                    },2000)                                        
                }  
                else if(resp.opstatus ==  "PasswordError"){                    
                    setTimeout(function(){
                        email="-- Wrong Password."
                        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + email, 0);                       
                    },2000)                                        
                } 
                else if(resp.opstatus ==  "PasswordSuccess"){                    
                    setTimeout(function(){
                        window.location.href = "home";
                    },2000)                                 
                    $("#email").val('');                    
                    $("#password").val('');                                                     
                }                                                                        
            },
        });          
    } 
}   
/*END - SAVE DATA OPERATIONS*/
