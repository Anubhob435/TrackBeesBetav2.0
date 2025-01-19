// JavaScript for signup form submission
/*
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('register-password').value;
    
    // Enhanced email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    // Password strength validation
    if (password.length < 8) {
        showMessage('Password must be at least 8 characters long', 'error');
        return;
    }

    // Show success with animation
    showMessage('Account created successfully!', 'success');
    document.getElementById('signup-form').reset();
});
*/

// Keep the rest of the JavaScript code
function showMessage(message, type) {
    const messageEl = document.getElementById('success-message');
    messageEl.textContent = message;
    messageEl.style.display = 'block';
    messageEl.style.opacity = '1';
    messageEl.style.background = type === 'error' ? 'var(--error)' : 'var(--success)';

    setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 300);
    }, 3000);
}

// Add smooth transitions for tab switching
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-container');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.transition = 'all 0.3s ease';
    });
    
    forms.forEach(form => {
        form.classList.remove('active');
        form.style.transition = 'all 0.3s ease';
    });
    
    document.querySelector(`#${tabName}`).classList.add('active');
    document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add('active');
}
