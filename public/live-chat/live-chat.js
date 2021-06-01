const socket = io();
const msgText = $('#msg');
const btnSend = $('#btn-send');
const chatBox = $('.chat-content');
const displayMsg = $('.message');

msgText.focus();

$(btnSend).on('click', function(event) {
    event.preventDefault();

    const msg = msgText.val();
    display(msg, 'your-message');
    socket.emit('sendMessage', msg);
    msgText.val('');
    msgText.focus();
    chatBox.scrollTop(chatBox.prop('scrollHeight')); // shows the last msg every time an message is sent
});

socket.on('sendToAll', msg => {
    // console.log(msg)
    display(msg, 'other-message');
    chatBox.scrollTop(chatBox.prop('scrollHeight'));
});

const display = (msg, className) => {
    const msgDiv = $('<div></div>');
    msgDiv.addClass(className + ' message-row');

    const time = new Date().toLocaleTimeString();
    const innerText = `
        <div class="message-title">
        👻<span>User</span>
        </div>

        <div class="message-text">
            ${msg}
        </div> 
        
        <div class="message-time">
            ${time}
        </div>
    `;

    msgDiv.html(innerText);
    displayMsg.append(msgDiv);
};

function closeChat() {
    document.getElementById("live-chat-box").setAttribute("style", 
        "opacity: 0; z-index: -3; transition: opacity .3s");
}

function openChat() {
    document.getElementById("live-chat-box").setAttribute("style", 
        "opacity: 1; z-index: 3; transition: opacity .3s");
}