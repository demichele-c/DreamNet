document.addEventListener('DOMContentLoaded', () => {
  // Get the form element by its ID
  const form = document.getElementById('add-dream-form');

  // Check if the form element exists on the page
  if (form) {
    // Add an event listener for form submission
    form.addEventListener('submit', async (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the values of the form inputs
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;

      try {
        // Send a POST request to the server with the form data
        const response = await fetch('/api/dreams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
          },
          body: JSON.stringify({ name, description }) // Send the form data as JSON
        });

        // Check if the response was successful
        if (response.ok) {
          // Redirect to the dreams page on success
          window.location.href = '/dreams';
        } else {
          // Log an error message if the response was not successful
          console.error('Failed to add dream:', await response.text());
        }
      } catch (err) {
        // Log any errors that occurred during the fetch operation
        console.error('Error:', err);
      }
    });
  }
});
