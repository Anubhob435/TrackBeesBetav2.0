// Object to store our page content
const pageContent = {
    profile: `
        <h2>Profile</h2>
        <form id="profile-form">
            <div class="settings-box">
                <div class="profile-header">
                    <div class="avatar-upload">
                        <div class="avatar-preview">
                            <i class="fas fa-user"></i>
                        </div>
                        <button type="button" class="upload-button">
                            <i class="fas fa-camera"></i>
                            Change Photo
                        </button>
                    </div>
                    <div class="profile-info">
                        <div class="form-group">
                            <label for="username">
                                <i class="fas fa-at"></i>
                                Username
                            </label>
                            <input type="text" id="username" name="username" value="shadcn">
                        </div>
                        <div class="form-group">
                            <label for="email">
                                <i class="fas fa-envelope"></i>
                                Email
                            </label>
                            <select id="email" name="email">
                                <option value="">Select a verified email to display</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-box">
                <h3>
                    <i class="fas fa-pen"></i>
                    About You
                </h3>
                <div class="form-group">
                    <label for="bio">Bio</label>
                    <textarea id="bio" name="bio" placeholder="Write a few sentences about yourself">I own a computer.</textarea>
                    <span class="input-hint">Brief description for your profile.</span>
                </div>
            </div>
            
            <div class="settings-box">
                <h3>
                    <i class="fas fa-link"></i>
                    Social Links
                </h3>
                <div class="social-links">
                    <div class="form-group">
                        <label>
                            <i class="fas fa-globe"></i>
                            Website
                        </label>
                        <input type="url" name="url1" value="https://shadcn.com" placeholder="Your website URL">
                    </div>
                    <div class="form-group">
                        <label>
                            <i class="fab fa-twitter"></i>
                            Twitter
                        </label>
                        <input type="url" name="url2" value="http://twitter.com/shadcn" placeholder="Twitter URL">
                    </div>
                </div>
            </div>
            
            <button type="submit">Update Profile</button>
        </form>
    `,
    account: `
        <h2>Account</h2>
        <form id="account-form">
            <div class="settings-box">
                <h3>Personal Information</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="name">
                            <i class="fas fa-user"></i>
                            Full Name
                        </label>
                        <input type="text" id="name" name="name" placeholder="Your name">
                    </div>
                    
                    <div class="form-group">
                        <label for="dob">
                            <i class="fas fa-calendar"></i>
                            Date of Birth
                        </label>
                        <input type="date" id="dob" name="dob">
                    </div>
                </div>
            </div>

            <div class="settings-box">
                <h3>Preferences</h3>
                <div class="form-group">
                    <label for="language">
                        <i class="fas fa-globe"></i>
                        Language
                    </label>
                    <select id="language" name="language">
                        <option value="">Select language</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                    </select>
                </div>
            </div>
            
            <button type="submit">Update Account</button>
        </form>
    `,
    appearance: `
        <h2>Appearance</h2>
        <form id="appearance-form">
            <div class="form-grid">
                <div class="settings-box">
                    <h3>Font Settings</h3>
                    <div class="font-preview-group">
                        <div class="form-group">
                            <label for="font">
                                <i class="fas fa-font"></i>
                                Font Family
                            </label>
                            <select id="font" name="font">
                                <option value="inter">Inter</option>
                                <option value="roboto">Roboto</option>
                                <option value="arial">Arial</option>
                                <option value="helvetica">Helvetica</option>
                            </select>
                        </div>
                        <div class="font-preview">
                            The quick brown fox jumps over the lazy dog
                        </div>
                    </div>
                </div>

                <div class="settings-box">
                    <h3>Theme</h3>
                    <div class="theme-grid">
                        <div class="theme-option-card">
                            <input type="radio" id="light" name="theme" value="light">
                            <label for="light">
                                <div class="theme-preview light-preview">
                                    <i class="fas fa-sun"></i>
                                </div>
                                Light
                            </label>
                        </div>
                        <div class="theme-option-card">
                            <input type="radio" id="dark" name="theme" value="dark" checked>
                            <label for="dark">
                                <div class="theme-preview dark-preview">
                                    <i class="fas fa-moon"></i>
                                </div>
                                Dark
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
            <button type="submit">Update Preferences</button>
        </form>
    `,
    notifications: `
        <h2>Notifications</h2>
        <form id="notifications-form">
            <div class="form-grid">
                <div class="settings-box notification-preferences">
                    <h3>
                        <i class="fas fa-bell"></i>
                        Notification Preferences
                    </h3>
                    <div class="notification-options">
                        <div class="notification-option">
                            <input type="radio" id="all" name="notify" value="all">
                            <label for="all">
                                <div class="option-icon">
                                    <i class="fas fa-globe"></i>
                                </div>
                                <div class="option-content">
                                    <span class="option-title">All new messages</span>
                                    <span class="option-description">Get notified about all messages and activities</span>
                                </div>
                            </label>
                        </div>
                        <div class="notification-option">
                            <input type="radio" id="direct" name="notify" value="direct" checked>
                            <label for="direct">
                                <div class="option-icon">
                                    <i class="fas fa-at"></i>
                                </div>
                                <div class="option-content">
                                    <span class="option-title">Direct messages and mentions</span>
                                    <span class="option-description">Only get notified when you're mentioned</span>
                                </div>
                            </label>
                        </div>
                        <div class="notification-option">
                            <input type="radio" id="none" name="notify" value="none">
                            <label for="none">
                                <div class="option-icon">
                                    <i class="fas fa-bell-slash"></i>
                                </div>
                                <div class="option-content">
                                    <span class="option-title">Nothing</span>
                                    <span class="option-description">Turn off all notifications</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="settings-box email-preferences">
                    <h3>
                        <i class="fas fa-envelope"></i>
                        Email Notifications
                    </h3>
                    <div class="email-options">
                        <div class="email-option">
                            <div class="option-info">
                                <span class="option-title">Communication emails</span>
                                <span class="option-description">Responses to your messages and mentions</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="communication" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="email-option">
                            <div class="option-info">
                                <span class="option-title">Marketing emails</span>
                                <span class="option-description">Product updates and announcements</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="marketing" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="email-option">
                            <div class="option-info">
                                <span class="option-title">Social emails</span>
                                <span class="option-description">Friend requests and activities</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="social">
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="email-option">
                            <div class="option-info">
                                <span class="option-title">Security emails</span>
                                <span class="option-description">Password changes and login alerts</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="security" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit">Update Notifications</button>
        </form>
    `,
    display: `
        <h2>Display</h2>
        <form id="display-form">
            <div class="settings-box">
                <h3>Sidebar</h3>
                <p>Select the items you want to display in the sidebar.</p>
                <div class="checkbox-grid">
                    <div class="checkbox-item">
                        <input type="checkbox" id="recents" name="sidebar" value="recents" checked>
                        <label for="recents">
                            <i class="fas fa-clock"></i>
                            Recents
                        </label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="home" name="sidebar" value="home" checked>
                        <label for="home">
                            <i class="fas fa-home"></i>
                            Home
                        </label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="applications" name="sidebar" value="applications">
                        <label for="applications">
                            <i class="fas fa-th-large"></i>
                            Applications
                        </label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="desktop" name="sidebar" value="desktop">
                        <label for="desktop">
                            <i class="fas fa-desktop"></i>
                            Desktop
                        </label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="downloads" name="sidebar" value="downloads">
                        <label for="downloads">
                            <i class="fas fa-download"></i>
                            Downloads
                        </label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="documents" name="sidebar" value="documents">
                        <label for="documents">
                            <i class="fas fa-file-alt"></i>
                            Documents
                        </label>
                    </div>
                </div>
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
