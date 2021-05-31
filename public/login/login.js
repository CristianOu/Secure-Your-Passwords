$(".input-field").focusout(function(){
    if($(this).val() != ""){
        $(this).addClass("has-content");
    }else{
        $(this).removeClass("has-content");
    }
});

$(".label").on('click', function() {
    $(this).prev().focus();
});

