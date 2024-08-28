// Add event listener for DOMContentLoaded to ensure the script runs after the HTML has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Handle Dashboard Navigation
  // Select the dashboard button element by its ID
  const dashboardBtn = document.getElementById('dashboard-btn');
  
  // Check if the dashboard button element exists
  if (dashboardBtn) {
    // Add an event listener to the dashboard button for the 'click' event
    dashboardBtn.addEventListener('click', () => {
      // Navigate to the dashboard page
      window.location.href = '/dashboard'; // Redirect to the dashboard URL
    });
  }

  // Handle Logout
  // Select the logout button element by its ID
  const logoutBtn = document.getElementById('logout');
  
  // Check if the logout button element exists
  if (logoutBtn) {
    // Add an event listener to the logout button for the 'click' event
    logoutBtn.addEventListener('click', async () => {
      try {
        // Send a POST request to the logout API endpoint
        const response = await fetch('/api/users/logout', {
          method: 'POST', // Specify the HTTP method as POST
          headers: { 'Content-Type': 'application/json' }, // Set the request content type to JSON
        });

        // Check if the response was successful
        if (response.ok) {
          // Redirect to the homepage or login page after a successful logout
          document.location.replace('/'); // Redirect to the root URL
        } else {
          // Display an alert if the logout request failed
          alert('Failed to log out');
        }
      } catch (error) {
        // Log any errors that occur during the fetch request
        console.error('Error during logout:', error);
        alert('An error occurred while logging out.');
      }
    });
  }
});
