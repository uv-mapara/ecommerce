/*START - SAVE DATA OPERATIONS*/
$("#btnSubmit").click(function () {
    SaveData();
});
function SaveData(){
    var ErrMsg = '';     

    if ($("#firstname").val().trim() == '') {
        ErrMsg += '<br/>-- First Name.';
    }   
    if ($("#lastname").val().trim() == '') {
        ErrMsg += '<br/>-- Last Name.';
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
      
    if ($("#message").val().trim() == '') {
        ErrMsg += '<br/>-- Message.';
    }  

    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "You have some form errors. Please check below.", '<br/>' + ErrMsg, 0);
    }

    else{ 
        swal({
            icon: "success",
            text: "Sent Successfully.",
        });     
        $.ajax({
            url: 'contact',
            type:'POST',
            data: {
                firstname:$('#firstname').val(),
                lastname:$('#lastname').val(),
                email:$('#email').val(),
                message:$('#message').val(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
              },
            success: function (data) {
              setTimeout($.unblockUI, 1000);              
              HideMessage("DivDisplayMsg");  
              
              $("#firstname").val('');
              $("#lastname").val('');
              $("#email").val('');
              $("#message").val('');              
            },
          });          
    }    
}
/*END - SAVE DATA OPERATIONS*/