//public/js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  const dreamForm = document.getElementById('dreamForm');
  const interpretationResult = document.getElementById('interpretationResult');

  dreamForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dreamName = document.getElementById('dreamName').value.trim();
    const dreamDescription = document.getElementById('dreamInput').value.trim();

    if (dreamName && dreamDescription) {
      try {
        // Make the POST request to the API
        const response = await fetch('/api/dreams/interpret', {
          method: 'POST',
          body: JSON.stringify({
            name: dreamName,
            description: dreamDescription
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Display the interpretation result
          interpretationResult.innerHTML = `<h4>Interpretation:</h4><p>${data.interpretation_text}</p>`;
        } else {
          // Handle errors returned from the server
          const errorData = await response.json();
          console.error('Server error:', errorData);
          interpretationResult.innerHTML = `<p>Failed to get interpretation: ${errorData.message}</p>`;
        }
      } catch (err) {
        console.error('Error:', err);
        interpretationResult.innerHTML = '<p>An error occurred while getting the interpretation.</p>';
      }
    } else {
      interpretationResult.innerHTML = '<p>Please enter both a name and description for your dream to get an interpretation.</p>';
    }
  });
});
