function deleteAccount() {
    const result = fetch("/deleteAccount", {
        method: 'DELETE',
        body: "body"
    });
    // console.log("Delete");
}

function hideDeleteModal() {
    document.getElementById('delete-modal').setAttribute("style", 
        "opacity: 0; z-index: -3;");
}