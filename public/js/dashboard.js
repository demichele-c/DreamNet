document.addEventListener('DOMContentLoaded', () => {
    // Get references to form and result elements by their IDs
    const dreamForm = document.getElementById('dreamForm');
    const interpretationResult = document.getElementById('interpretationResult');
    const interpretationText = document.getElementById('interpretationText');
  
    // Add an event listener to the form for submission
    dreamForm.addEventListener('submit', async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
  
        // Get the values of the form inputs and trim any extra whitespace
        const dreamName = document.getElementById('dreamName').value.trim();
        const dreamDescription = document.getElementById('dreamInput').value.trim();
  
        // Check if both name and description are provided
        if (dreamName && dreamDescription) {
            try {
                // Send a POST request to the server with the dream data
                // Currently sending dream data to '/api/dreams'
                const response = await fetch('/api/dreams', {
                    method: 'POST',
                    body: JSON.stringify({ name: dreamName, description: dreamDescription }),
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type as JSON
                    },
                });
  
                // Check if the response was successful
                if (response.ok) {
                    // Parse the JSON response
                    const data = await response.json();
                    console.log("data: ", data);
                    // Display the interpretation result
                    interpretationResult.textContent = data.toString(); // Adjust based on response structure
                    interpretationResult.style.display = 'block'; // Show the interpretation section
                } else {
                    // Parse the JSON error response
                    const errorData = await response.json();
                    // Alert the user about the error
                    alert(`Failed to get interpretation: ${errorData.message}`);
                }
            } catch (err) {
                // Log and alert any errors that occurred during the fetch operation
                console.error('Error:', err);
                alert('An error occurred while getting the interpretation.');
            }
        } else {
            // Alert the user if either name or description is missing
            alert('Please enter both a name and description for your dream to get an interpretation.');
        }
    });
});
