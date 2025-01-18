// JavaScript for signup form submission
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    const email = document.getElementById('email').value;

    // Simple email validation (you can expand this)
    if (!email) {
        alert('Please enter a valid email address.');
        return;
    }

    // Show success message
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';

    // Clear the form after submission
    document.getElementById('signup-form').reset();

    // Hide the success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
});
