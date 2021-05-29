function displayNotificationModal(notification) {
    $("#notification-box").html(notification);
    $('#notification-box').css( {
        "opacity": "1",
        "z-index": "3",
        "visibility": "visible",  
        "transition": "opacity .3s"
    });
}

function hideNotification() {
    $('#notification-box').css( {
        "visibility": "hidden", 
        "opacity": "0", 
        "transition": " visibility .3s, opacity .3s"
    });
}

