// Import method-override for supporting HTTP verbs (like PUT and DELETE) in forms
const methodOverride = require('method-override');

// Use method-override middleware with '_method' query parameter
app.use(methodOverride('_method'));

document.addEventListener('DOMContentLoaded', () => {
  // Add click event listeners to all elements with the class 'edit-btn'
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      // Get the dream ID from the data-id attribute of the clicked button
      const dreamId = event.target.getAttribute('data-id');
      // Redirect to the edit page for the selected dream
      window.location.href = `/edit-dream/${dreamId}`;
    });
  });

  // Add click event listeners to all elements with the class 'delete-btn'
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
      // Get the dream ID from the data-id attribute of the clicked button
      const dreamId = event.target.getAttribute('data-id');
      try {
        // Send a DELETE request to the server to delete the dream with the specified ID
        const response = await fetch(`/api/dreams/${dreamId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          // On successful deletion, remove the dream item from the DOM
          event.target.closest('.dream-item').remove();
        } else {
          // Log an error if the response was not OK
          console.error('Failed to delete dream');
        }
      } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error deleting dream:', error);
      }
    });
  });
});
