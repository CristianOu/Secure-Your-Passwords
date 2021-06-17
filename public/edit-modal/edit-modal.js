let accountId = '';
let lastUpdated = '';

$(document).on("click", '.edit', function(){
    // event.preventDefault();
    accountId = $(this).attr('data-id');
    
    const result = axios.get('/account/' + accountId);
    result.then(response => {
        $("#edit-name-of-account").val(response.data.account[0].name);
        $("#edit-username").val(response.data.account[0].username);
        $("#edit-password").val(response.data.account[0].password);
        $("#edit-details").val(response.data.account[0].details);
        lastUpdated = response.data.account[0].last_updated;
    });
});

function hideEditModal() {
    // document.getElementById('modal-backdrop').setAttribute("style", 
    //     "opacity: 0; z-index: -3;");
    $(".modal-backdrop").eq(2).css({"opacity": "0", "z-index": "-3", "transition": "opacity 0s"});
}

let oldPassword = "";
function displayEditModal(password) {
    oldPassword = password;
    console.log(oldPassword);
    // document.getElementById("modal-backdrop").setAttribute("style", 
    //     "opacity: 1; z-index: 3; transition: opacity .4s");

    $(".modal-backdrop").eq(2).css({"opacity": "1", "z-index": "3", "transition": "opacity .4s"});
}

function submitEditHandler() {
    isPasswordChanged = false;
    event.preventDefault();
    console.log(oldPassword + '\n' + $('#edit-password').val())
    if (oldPassword !== $('#edit-password').val()) {
        lastUpdated = new Date();
        oldPassword = $('#edit-password').val();
        isPasswordChanged = true;
    } 
    convertedDate = new moment(lastUpdated).format('YYYY-MM-DD HH:mm:ss');
    console.log(oldPassword)
    
    const updatedAccount = {
        
        id: accountId,
        name: $('#edit-name-of-account').val(),
        username: $('#edit-username').val(),
        password: $('#edit-password').val(),
        details: $('#edit-details').val() || '',
        logo_upload: '',
        logo_url: '',
        last_updated: convertedDate,
        isPasswordChanged: isPasswordChanged
    };

    const request = axios.patch('/account', updatedAccount);
    request.then(() => {

        //edit the fields in the UI
        $("#" + accountId + " .account-title .field").text( updatedAccount.name );
        $("#" + accountId + " .account-username .field").val( updatedAccount.username );
        $("#" + accountId + " .account-password .field").val( updatedAccount.password );

        let convertedDate = new moment(updatedAccount.last_updated).format('MMMM Do YYYY, h:mm:ss a');
        $("#" + accountId + " .last-updated .field").text( convertedDate );

        //updates the reference of the displayEditModal
        $("#" + accountId + " .button-group .edit").attr("onclick", "displayEditModal('" + updatedAccount.password + "')");

        // location.reload();
        hideEditModal();
        displayNotificationModal("The account has been successfully edited!");
        setTimeout(() => {
            hideNotification();
        }, 2000);
    });

    
}