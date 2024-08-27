document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-dream-form');

  if (form) { // Check if the form element exists
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;

      try {
        const response = await fetch('/api/dreams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, description })
        });

        if (response.ok) {
          window.location.href = '/dreams'; // Redirect back to the dreams page
        } else {
          // Improved error handling: log response details
          console.error('Failed to add dream:', await response.text());
        }
      } catch (err) {
        console.error('Error:', err);
      }
    });
  }
});
