// Object to store our page content
const pageContent = {
    profile: `
        <h2>Profile</h2>
        <form id="profile-form">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" value="shadcn">
            
            <label for="email">Email</label>
            <select id="email" name="email">
                <option value="">Select a verified email to display</option>
            </select>
            
            <label for="bio">Bio</label>
            <textarea id="bio" name="bio">I own a computer.</textarea>
            
            <h3>URLs</h3>
            <input type="url" name="url1" value="https://shadcn.com" placeholder="Your website URL">
            <input type="url" name="url2" value="http://twitter.com/shadcn" placeholder="Twitter URL">
            
            <button type="submit">Update Profile</button>
        </form>
    `,
    account: `
        <h2>Account</h2>
        <form id="account-form">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name">
            
            <label for="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob">
            
            <label for="language">Language</label>
            <select id="language" name="language">
                <option value="">Select language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
            </select>
            
            <button type="submit">Update Account</button>
        </form>
    `,
    appearance: `
        <h2>Appearance</h2>
        <form id="appearance-form">
            <label for="font">Font</label>
            <select id="font" name="font">
                <option value="inter">Inter</option>
                <option value="roboto">Roboto</option>
                <option value="arial">Arial</option>
            </select>
            
            <h3>Theme</h3>
            <div class="theme-options">
                <div class="theme-option">
                    <input type="radio" id="light" name="theme" value="light">
                    <label for="light">Light</label>
                </div>
                <div class="theme-option">
                    <input type="radio" id="dark" name="theme" value="dark" checked>
                    <label for="dark">Dark</label>
                </div>
            </div>
            
            <button type="submit">Update Preferences</button>
        </form>
    `,
    notifications: `
        <h2>Notifications</h2>
        <form id="notifications-form">
            <h3>Notify me about...</h3>
            <div>
                <input type="radio" id="all" name="notify" value="all">
                <label for="all">All new messages</label>
            </div>
            <div>
                <input type="radio" id="direct" name="notify" value="direct" checked>
                <label for="direct">Direct messages and mentions</label>
            </div>
            <div>
                <input type="radio" id="none" name="notify" value="none">
                <label for="none">Nothing</label>
            </div>
            
            <h3>Email Notifications</h3>
            <div class="toggle-option">
                <label for="communication">Communication emails</label>
                <label class="toggle-switch">
                    <input type="checkbox" id="communication" checked>
                    <span class="slider"></span>
                </label>
            </div>
            <div class="toggle-option">
                <label for="marketing">Marketing emails</label>
                <label class="toggle-switch">
                    <input type="checkbox" id="marketing" checked>
                    <span class="slider"></span>
                </label>
            </div>
            <div class="toggle-option">
                <label for="social">Social emails</label>
                <label class="toggle-switch">
                    <input type="checkbox" id="social">
                    <span class="slider"></span>
                </label>
            </div>
            <div class="toggle-option">
                <label for="security">Security emails</label>
                <label class="toggle-switch">
                    <input type="checkbox" id="security" checked>
                    <span class="slider"></span>
                </label>
            </div>
            
            <button type="submit">Update Notifications</button>
        </form>
    `,
    display: `
        <h2>Display</h2>
        <form id="display-form">
            <h3>Sidebar</h3>
            <p>Select the items you want to display in the sidebar.</p>
            <div>
                <input type="checkbox" id="recents" name="sidebar" value="recents" checked>
                <label for="recents">Recents</label>
            </div>
            <div>
                <input type="checkbox" id="home" name="sidebar" value="home" checked>
                <label for="home">Home</label>
            </div>
            <div>
                <input type="checkbox" id="applications" name="sidebar" value="applications">
                <label for="applications">Applications</label>
            </div>
            <div>
                <input type="checkbox" id="desktop" name="sidebar" value="desktop">
                <label for="desktop">Desktop</label>
            </div>
            <div>
                <input type="checkbox" id="downloads" name="sidebar" value="downloads">
                <label for="downloads">Downloads</label>
            </div>
            <div>
                <input type="checkbox" id="documents" name="sidebar" value="documents">
                <label for="documents">Documents</label>
            </div>
            
            <button type="submit">Update Display</button>
        </form>
    `
};

// Function to load page content
function loadPage(page) {
    const contentArea = document.getElementById('settings-content');
    contentArea.style.opacity = '0';
    contentArea.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        contentArea.innerHTML = pageContent[page];
        contentArea.style.opacity = '1';
        contentArea.style.transform = 'translateY(0)';
        
        const links = document.querySelectorAll('.sidebar a');
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${page}`);
        });

        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }
    }, 150);
}

// Function to handle form submissions
async function handleFormSubmit(event) {
    event.preventDefault();
    const button = event.target.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    button.disabled = true;

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/update-settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (response.ok) {
            button.innerHTML = '<i class="fas fa-check"></i> Saved!';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        } else {
            throw new Error('Failed to update');
        }
    } catch (error) {
        button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
        console.error('Error:', error);
    }
}

// Event listener for navigation
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            // Get the href from the closest anchor element
            const href = event.target.closest('a').getAttribute('href');
            const page = href.substring(1);
            loadPage(page);
        });
    });

    // Load default page (profile)
    loadPage('profile');
});
