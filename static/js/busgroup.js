// Back button functionality
function goBack() {
    window.location.href = "..\afterlog\tiles.html";
}

const chatArea = document.getElementById('chat-area');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Send message functionality
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function openWebsite() {
    // Opens a specific website when the function is called
    window.location.href = "https://gemini-flask-chat-1.onrender.com/";
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        chatArea.appendChild(messageElement);
        messageInput.value = '';
        chatArea.scrollTop = chatArea.scrollHeight; // Auto-scroll to the bottom
    }
}
