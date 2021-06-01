const socket = io();
const msgText = $('#msg');
const btnSend = $('#btn-send');
const chatBox = $('.chat-content');
const displayMsg = $('.message');

msgText.focus();
$(btnSend).on('click', function(event) {
    event.preventDefault();
    // console.log(msgText.val())
    socket.emit('sendMessage', msgText.val());
});

socket.on('sendToAll', msg => {
    console.log(msg)
    display(msg, 'other-message');
});

const display = (msg, className) => {
    const msgDiv = $.create("div");
    msgDiv.addClass(className, 'message-row');

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

    
    displayMsg.append(innerText);
};
