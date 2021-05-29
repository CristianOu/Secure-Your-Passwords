let accountId = '';
let lastUpdated = '';
$(document).on("click", '.edit', function(){
    // event.preventDefault();
    accountId = $(this).attr('data-id');
    
    const result = axios.get('/getOneUser/' + accountId);
    result.then(response => {
        $("#edit-name-of-account").val(response.data.account[0].name);
        $("#edit-username").val(response.data.account[0].username);
        $("#edit-password").val(response.data.account[0].password);
        $("#edit-details").val(response.data.account[0].details);
        lastUpdated = response.data.account[0].last_updated;
    });
});

function hideEditModal() {
    document.getElementById('edit-backdrop').setAttribute("style", 
        "opacity: 0; z-index: -3;");
}

let oldPassword = "";
function displayEditModal(password) {
    oldPassword = password;
    document.getElementById("edit-backdrop").setAttribute("style", 
        "opacity: 1; z-index: 3; transition: opacity .3s");
}

function submitEditHandler() {
    event.preventDefault();
    if (oldPassword !== $('#edit-password').val()) {
        lastUpdated = new Date();
    } 
    convertedDate = new moment(lastUpdated).format('YYYY-MM-DD HH:mm:ss');
    
    const updatedAccount = {
        
        id: accountId,
        name: $('#edit-name-of-account').val(),
        username: $('#edit-username').val(),
        password: $('#edit-password').val(),
        details: $('#edit-details').val() || '',
        logo_upload: '',
        logo_url: '',
        last_updated: convertedDate
    };

    const request = axios.patch('/editAccount', updatedAccount);
    request.then(() => {

        //edit the fields in the UI
        $("#" + accountId + " .account-title .field").text( $('#edit-name-of-account').val() );
        $("#" + accountId + " .account-username .field").val( $('#edit-username').val() );
        $("#" + accountId + " .account-password .field").val( $('#edit-password').val() );

        hideEditModal();
        displayNotificationModal("The account has been successfully edited!");
        setTimeout(() => {
            hideNotification();
        }, 2000);
    });

    
}