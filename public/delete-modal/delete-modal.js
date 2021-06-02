$(document).on("click", '.delete', function(){
    // event.preventDefault();
    let id = $(this).attr('data-id');
    // console.log(id);
    $('#delRef').attr('data-id', id);
    displayDeleteAccount();
}); // maybe moved into main-page.js cause the delete class is there

// call the backend
function deleteAccount(id) { 
    $('#' + id).remove();
    const response = axios.delete('/account/' + id);
    response.then(() => {
        hideDeleteModal();
    
        displayNotificationModal("The account has been successfully deleted");
        setTimeout(() => {
            hideNotification();
        }, 2000);
    });
    
    
    
}

function hideDeleteModal() {
    document.getElementById('delete-modal').setAttribute("style", 
        "opacity: 0; z-index: -3;");
}

function displayDeleteAccount() {
    document.getElementById("delete-modal").setAttribute("style", 
        "opacity: 1; z-index: 3; transition: opacity .4s");
}