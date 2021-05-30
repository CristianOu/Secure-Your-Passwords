(async function getProjects() {
    const response = await fetch("/getAccounts");
    const result = await response.json();

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
                        Copy Pass
                    </button>
                    <button class="button-small copy" >
                        <i class="fas fa-eye" onClick=showPassword(${account.id})></i>
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

function showPassword(accountId) {
    
    $("#" + accountId + " .account-password input").attr('type', 'text');
}
