const socket = io();
const msgText = $('#msg');
const btnSend = $('#btn-send');
const chatBox = $('.chat-content');
const displayMsg = $('.message');

msgText.focus();

