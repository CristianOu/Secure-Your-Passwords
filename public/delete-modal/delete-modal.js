$(document).on("click", '.delete', function(){
    // event.preventDefault();
    let id = $(this).attr('data-id');
    // console.log(id);
    $('#delRef').attr('data-id', id);
    displayDeleteAccount();
});

// call the backend
function deleteAccount(id) { 
    $('#' + id).remove();
    hideDeleteModal();
    axios.delete('/deleteAccount/' + id);
}

function hideDeleteModal() {
    document.getElementById('delete-modal').setAttribute("style", 
        "opacity: 0; z-index: -3;");
}

function displayDeleteAccount() {
    document.getElementById("delete-modal").setAttribute("style", 
        "opacity: 1; z-index: 3; transition: opacity .3s");
}