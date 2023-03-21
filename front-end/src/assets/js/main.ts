import "bootstrap";

$(function() {
    $('.nav a').on('click', function(){ 
        if($('.navbar-toggler').css('display') !='none'){
            $('.navbar-toggler').trigger( "click" );
        }
    });
});