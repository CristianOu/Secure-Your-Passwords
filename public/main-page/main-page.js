document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8000/getAll')
    .then(response => response.json())
    .then(object => loadHTML(object));
});     

function loadHTML(object) {
    const title = document.querySelector('.title');
    title.innerText += " " + object.data[0].username;
}