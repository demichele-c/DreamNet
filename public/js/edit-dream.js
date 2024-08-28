// Add an event listener to the form with the ID 'edit-dream-form' for the submit event
document.getElementById('edit-dream-form').addEventListener('submit', async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  
  // Retrieve the dream ID from a hidden input field in the form
  const id = document.querySelector('input[name="id"]').value;
  // Retrieve the name and description values from the form fields
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  try {
    // Send a PUT request to update the dream with the specified ID
    const response = await fetch(`/api/dreams/${id}`, {
      method: 'PUT', // Use PUT method to update existing resource
      body: JSON.stringify({ name, description }), // Send updated name and description in the request body
      headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
      }
    });
    if (response.ok) {
      // On successful update, redirect to the dreams page
      window.location.href = '/dreams';
    } else {
      // Log an error message if the response was not OK
      console.error('Failed to update dream');
    }
  } catch (err) {
    // Catch and log any errors that occur during the fetch operation
    console.error('Error:', err);
  }
});
