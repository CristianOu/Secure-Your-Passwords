function displayCreateModal() {
    // document.getElementById("modal-backdrop").setAttribute("style", 
    //     "opacity: 1; z-index: 3; transition: opacity .4s");
    $(".modal-backdrop").eq(0).css({"opacity": "1", "z-index": "3", "transition": "opacity .4s"});
}

function hideCreateModal() {
    // document.getElementById('modal-backdrop').setAttribute("style", 
    //     "opacity: 0; z-index: -3;");

    $(".modal-backdrop").eq(0).css({"opacity": "0", "z-index": "-3", "transition": "opacity 0s"});
}

function submitCreateHandler() {
    event.preventDefault();

    const newAccount = {
        name: $('#name-of-account').val(),
        username: $('#username').val(),
        password: $('#password').val(),
        details: $('#details').val() || '',
        logo_upload: '',
        logo_url: '',
    };
    const request = axios.post('/account', newAccount);
    request.then(result => {
        const convertedDate = new moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');

        const newAccountHTML = `
        <div id="${result.data.id}" class="account-box">
            <div class="account-title"> 
                <img class="account-icon" src="${newAccount.logo_url}" alt="account-icon"/>
                
                <span class="field">${newAccount.name}</span>
            </div>

            <div class="account-username"> 
                <input type="text" class="field" readonly value="${newAccount.username}" />
                <button class="button-small copy" onClick="copyText(${result.data.id}, 'account-username')" >
                    <i class="far fa-2x fa-copy"></i>
                    <div class="tooltip">Copied!</div>
                </button>
            </div>

            <div class="account-password"> 
                <input type="password" class="field" value="${newAccount.password}">
                <button class="button-small copy" onClick="copyText(${result.data.id}, 'account-password')" >
                    <i class="far fa-2x fa-copy"></i>
                    <div class="tooltip">Copied!</div>
                </button>
                <button class="button-small watch" onClick="revealPassword(${result.data.id}, ${true})" >
                    <i class="far fa-2x fa-eye" ></i>
                </button>
            </div>

            <div class="last-updated"> 
                <span class="field">${convertedDate}</span>
            </div>

            <div class="button-group">
                <button data-id="${result.data.id}" class="button-medium edit" onclick="displayEditModal('${newAccount.password}')">
                    Edit
                </button>
                <button data-id="${result.data.id}" class="delete">
                    Delete
                </button>
            </div>
        </div>`;

        $('#account-list').append(newAccountHTML);

        // reset values after Save
        $('#name-of-account').val("");
        $('#username').val("");
        $('#password').val("");
        $('#details').val("");

        hideCreateModal();

        displayNotificationModal("The account has been successfully added!");
        setTimeout(() => {
            hideNotification();
        }, 2000);
    });
}