/*START - SAVE DATA OPERATIONS*/
$("#btnSave").click(function () {
    Save();  
});
function Save() { 
    var ErrMsg = '';    
     
    if ($('#newpassword').val().trim() == '') {
        ErrMsg += '<br/>-- New Password.';
    }          
    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
    }
    
    else{        
        ShowLoader(); 
        $.ajax({
            url: 'newpassword',            
            type:'POST',
            data: {                
                newpassword:$('#newpassword').val(),               
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            },
            dataType: 'json',
            success: function(resp) {                                                                        
                HideMessage("DivDisplayMsg"); 
                setTimeout(HideLoader,2000);
                if(resp.opstatus ==  "Success"){                    
                    setTimeout(function(){
                        window.location.href = '/';
                    },2000)                                 
                    $("#email").val('');                                        
                }                                                                                                                                                            
            },
        });          
    } 
}   
/*END - SAVE DATA OPERATIONS*/
