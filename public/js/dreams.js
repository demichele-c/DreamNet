const methodOverride = require('method-override');
app.use(methodOverride('_method'));

document.addEventListener('DOMContentLoaded', () => {
  // Edit button click handler
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const dreamId = event.target.getAttribute('data-id');
      // Redirect to the edit page
      window.location.href = `/edit-dream/${dreamId}`;
    });
  });

  // Delete button click handler
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
      const dreamId = event.target.getAttribute('data-id');
      try {
        const response = await fetch(`/api/dreams/${dreamId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          // Remove the dream item from the DOM
          event.target.closest('.dream-item').remove();
        } else {
          console.error('Failed to delete dream');
        }
      } catch (error) {
        console.error('Error deleting dream:', error);
      }
    });
  });
});
