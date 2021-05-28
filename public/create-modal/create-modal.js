// console.log("Create-modal");

function hideCreateModal() {

    let obj = document.getElementById('create-modal').setAttribute("style", 
        "opacity: 0; z-index: -3;");
    // console.log("cancel-modal");
}

function submitHandler() {
    event.preventDefault();

    const newAccount = {
        name: $('#name-of-account').val(),
        username: $('#username').val(),
        password: $('#password').val(),
        details: $('#details').val() || '',
        logo_upload: '',
        logo_url: '',
    };
    const request = axios.post('createAccount', newAccount);
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
                <button class="button-small copy">
                    *Icon*
                </button>
            </div>

            <div class="account-password"> 
                <input type="text" class="field" value="${newAccount.password}">
                <button class="button-small copy">
                    *Icon*
                </button>
            </div>

            <div class="last-updated"> 
                <span class="field">${convertedDate}</span>
            </div>

            <div class="button-group">
                <button class="button-medium edit">
                    Edit
                </button>
                <button data-id="${result.data.id}" class="delete">
                    Delete
                </button>
            </div>
        </div>`;

        $('#account-list').append(newAccountHTML);
    });
    
    // reset values after Save
    $('#name-of-account').val("");
    $('#username').val("");
    $('#password').val("");
    $('#details').val("");

    hideCreateModal();
    displaySuccessfullyCreatedModal();
    setTimeout(() => {
        hideDisplaySuccessfullyCreated();
    }, 2000);
    
}

function displaySuccessfullyCreatedModal() {
    $('#success-box').css( {
        "opacity": "1",
        "z-index": "3",
        "visibility": "visible",  
        "transition": "opacity .3s"
    });
}

function hideDisplaySuccessfullyCreated() {
    $('#success-box').css( {
        "visibility": "hidden", 
        "opacity": "0", 
        "transition": " visibility .3s, opacity .3s"
    });
}