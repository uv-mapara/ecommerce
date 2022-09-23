// $('#BtnAddCart').click(function(){
//     AddToCart();
// })

// function AddToCart(){
//     ShowLoader();     
//         $.ajax({
//             url: 'addtocart/<int:pk>/',
//             type:'POST',            
//             data: {
//                 csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
//             },
//             success: function() {                                            
//               HideMessage("DivDisplayMsg"); 
//               setTimeout(HideLoader,2000);          
//               setTimeout(function(){
//                 window.location.href = "showmycart";
//               },2000)                                        
//             },
//         });          
// }

$.ajax({
    url: 'home',                    
    success: function(resp) {                                            
        if(resp.Logstatus ==  "Success"){
            $('.ProfileUL').show();
        }
        if(resp.Logstatus ==  "Error"){
            setTimeout(function(){
                window.location.href = "home";
            },2000)                   
        }                                     
    },
});             