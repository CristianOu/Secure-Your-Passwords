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
    hideDeleteModal();
    const result = axios.delete('/deleteAccount/' + id);
    
    console.log("before");
    result.then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
}

function hideDeleteModal() {
    document.getElementById('delete-modal').setAttribute("style", 
        "opacity: 0; z-index: -3;");
}

function displayDeleteAccount() {
    document.getElementById("delete-modal").setAttribute("style", 
        "opacity: 1; z-index: 3; transition: opacity .3s");
}