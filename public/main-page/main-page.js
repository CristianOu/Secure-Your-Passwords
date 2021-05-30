(async function getProjects() {
    const response = await axios.get("/accounts");
    const result = response.data;
    
    result.accounts.map((account) => {
        let convertedDate = new moment(account.last_updated).format('MMMM Do YYYY, h:mm:ss a');

        let output = `
            <div id="${account.id}" class="account-box">
                <div class="account-title"> 
                    <img class="account-icon" src="${account.logo_url}" alt="account-icon"/>
                    
                    <span class="field">${account.name}</span>
                </div>

                <div class="account-username"> 
                    <input type="text" class="field" readonly value="${account.username}" />
                    <button class="button-small copy">
                        *Icon*
                    </button>
                </div>

                <div class="account-password"> 
                    <input type="password" readonly class="field" value="${account.password}">
                    <button class="button-small copy">
                        <i class="far fa-clipboard" onClick="copyText(${account.id})"></i>
                    </button>
                    <button class="button-small watch" >
                        <i class="fas fa-eye" onClick="revealPassword(${account.id}, ${true})"></i>
                    </button>
                    
                </div>

                <div class="last-updated"> 
                    <span class="field">${convertedDate}</span>
                </div>

                <div class="button-group">
                    <button data-id="${account.id}" class="edit" onclick="displayEditModal('${account.password}')">
                        Edit
                    </button>
                    <button data-id="${account.id}" class="delete">
                        Delete
                    </button>
                </div>
            </div>
        `;
        $("#account-list").append(output);
    });
})();

function revealPassword(accountId, show) {
    if (show) {
        $("#" + accountId + " .account-password input").attr('type', 'text');
        $("#" + accountId + " .account-password .watch i").attr('class', 'far fa-eye-slash');
        $("#" + accountId + " .account-password .watch i").attr('onclick', 
            'revealPassword(' + accountId +','+ false +')');
    } else {
        $("#" + accountId + " .account-password input").attr('type', 'password');
        $("#" + accountId + " .account-password .watch i").attr('class', 'far fa-eye');
        $("#" + accountId + " .account-password .watch i").attr('onclick', 
            'revealPassword(' + accountId +','+ true +')');
    }
    // console.log(show)
}

function copyText(accountId) {
    // const text = $("#" + accountId + " .account-password input");
    // console.log(text)
    // text.select();
    // text.setSelectionRange(0, 9999);
    // document.execCommand("copy");
    // alert("Copied the text: " + text.value);
} 
