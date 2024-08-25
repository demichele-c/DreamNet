// profile.js

document.addEventListener('DOMContentLoaded', () => {
    // Handle logout
    const logoutButton = document.querySelector('a[href="/logout"]');
  
    if (logoutButton) {
      logoutButton.addEventListener('click', async (event) => {
        event.preventDefault();
  
        try {
          // Send a POST request to the logout route
          const response = await fetch('/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            // Redirect to login page or another route after successful logout
            window.location.href = '/login';
          } else {
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
      });
    }
  
    // Add any additional client-side logic here
  });
  