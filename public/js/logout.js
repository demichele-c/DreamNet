//public/js/logout.js

const logoutBtn = document.querySelector('#logout');

if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect to the homepage or login page after logout
        } else {
            alert('Failed to log out');
        }
    });
}
