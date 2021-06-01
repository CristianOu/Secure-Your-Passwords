const socket = io();
const msgText = $('#msg');
const btnSend = $('#btn-send');
const chatBox = $('.chat-content');
const displayMsg = $('.message');

msgText.focus();
$(btnSend).on('click', function() {
    event.preventDefault();
    // console.log(msgText.val())
    socket.emit('sendMessage', msgText.val());
});

