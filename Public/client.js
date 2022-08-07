const socket = io(); // CALLING IO FUNCTION
let msg = document.querySelector('#msg-input'); // msg write box
let sentBtn = document.querySelector('.send-btn'); // send button
let textArea = document.querySelector('.message-box');

// let name;
// // GETTING USER NAME;
// do {
//     user = prompt('enter your name');
//     document.querySelector('.user').textContent = user;
// } while (!user);
sentBtn.addEventListener('click', () => {
    if (msg.value) {
        sendMsg(msg.value);
        msg.value = '';

    }
})



// FUNCTION TO SEND MESSAGE
function sendMsg(msg) {
    appendMsg(msg, 'outgoing-msg');
    scrollBottm();
    // SENDIGN MSG TO SERVER
    socket.emit('message', { message: msg });
}

// FUNCTION TO APPEND MESSANGE IN MESSAGE_AREA
function appendMsg(msg, type) {
    let msgDiv = document.createElement('div');
    let className = type;
    msgDiv.classList.add(className);

    let msgData = `<p>${msg}</p>`;
    msgDiv.innerHTML = msgData;
    textArea.appendChild(msgDiv);

}

// Recieve msg FROM SERVER

socket.on('message', (msg) => {
    let recieveMsg = msg.message;
    appendMsg(recieveMsg, 'incomming-msg');
    scrollBottm();
})

// FUNCTION TO SCROLL TO BOTTOM WITH MESSAGE.
function scrollBottm() {
    textArea.scrollTop = textArea.scrollHeight;
}