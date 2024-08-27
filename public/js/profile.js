//public/js/profile.js

document.addEventListener('DOMContentLoaded', () => {
  // Handle Dashboard navigation
  const dashboardBtn = document.getElementById('dashboard-btn');
  if (dashboardBtn) {
    dashboardBtn.addEventListener('click', () => {
      window.location.href = '/dashboard'; // Navigate to the dashboard
    });
  }

  // Handle Logout
  const logoutBtn = document.getElementById('logout');
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
});
