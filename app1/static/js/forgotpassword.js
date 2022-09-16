/*START - SAVE DATA OPERATIONS*/
$("#BtnForgot").click(function () {
    Forgot();  
});
function Forgot() { 
    var ErrMsg = '';    
     
    if ($('#email').val().trim() == '') {
        ErrMsg += '<br/>-- E-mail ID.';
    }      

    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
    }
    
    else{         
        ShowLoader(); 
        $.ajax({
            url: 'forgotpass',
            type:'POST',
            data: {                
                email:$('#email').val(),               
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            },
            dataType: 'json',
            success: function(resp) {                                                        
                HideMessage("DivDisplayMsg"); 
                setTimeout(HideLoader,2000);      
                
                if(resp.opstatus ==  "Success"){                    
                    setTimeout(function(){
                        window.location.href = "forgotOtp";
                    },2000)                                 
                    $("#email").val('');                                        
                }  
                else if(resp.opstatus ==  "Error"){                    
                    setTimeout(function(){
                        email="-- Email Not Exist."
                        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + email, 0);                       
                    },2000)                                        
                }                                                                                        
            },
        });          
    } 
}   
/*END - SAVE DATA OPERATIONS*/
