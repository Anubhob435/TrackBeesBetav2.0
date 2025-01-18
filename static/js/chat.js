class ChatBot {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.chatForm = document.getElementById('chat-form');
        this.userInput = document.getElementById('user-input');
        this.clearButton = document.getElementById('clear-chat');
        
        this.chatHistory = this.loadChatHistory();
        this.initializeEventListeners();
        this.renderChatHistory();
    }

    initializeEventListeners() {
        this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.clearButton.addEventListener('click', () => this.clearChat());
    }

    loadChatHistory() {
        const history = sessionStorage.getItem('chatHistory');
        return history ? JSON.parse(history) : [];
    }

    saveChatHistory() {
        sessionStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    }

    renderChatHistory() {
        this.chatMessages.innerHTML = '';
        this.chatHistory.forEach(message => {
            this.appendMessage(message.content, message.type);
        });
    }

    appendMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const icon = document.createElement('i');
        icon.className = type === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(icon);
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const message = this.userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.appendMessage(message, 'user');
        this.chatHistory.push({ content: message, type: 'user' });
        this.userInput.value = '';

        try {
            // Show loading state
            const loadingDiv = this.appendMessage('Thinking...', 'bot');
            
            // Make API call to your backend that handles Gemini API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            
            // Remove loading message
            this.chatMessages.removeChild(this.chatMessages.lastChild);
            
            // Add bot response
            this.appendMessage(data.response, 'bot');
            this.chatHistory.push({ content: data.response, type: 'bot' });
            this.saveChatHistory();

        } catch (error) {
            console.error('Error:', error);
            this.appendMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }

    clearChat() {
        this.chatHistory = [];
        this.saveChatHistory();
        this.chatMessages.innerHTML = '';
        this.appendMessage('Hello! How can I help you today?', 'bot');
    }
}

// Initialize chatbot when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});
