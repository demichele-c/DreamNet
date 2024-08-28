// Add an event listener to the document for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch interpretations data from the server
    async function fetchInterpretations() {
      try {
        // Send a GET request to the specified API endpoint to retrieve interpretations
        const response = await fetch('/api/interpretations'); // Adjust this URL based on your API endpoint
        
        // Check if the response was not OK and throw an error if so
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        // Parse the JSON response into a JavaScript object
        const data = await response.json();
        // Call function to display the fetched interpretations
        displayInterpretations(data);
      } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error fetching interpretations:', error);
        
        // Display an error message in the container if there was an issue fetching data
        const container = document.getElementById('interpretations-container');
        container.innerHTML = '<p>Error loading interpretations. Please try again later.</p>';
      }
    }
  
    // Function to display the fetched interpretations data
    function displayInterpretations(interpretations) {
      // Get the container element where the interpretations will be displayed
      const container = document.getElementById('interpretations-container');
      
      // Check if there are any interpretations to display
      if (interpretations.length > 0) {
        // Create a new unordered list element
        const list = document.createElement('ul');
        
        // Iterate over each interpretation and create list items
        interpretations.forEach(interpretation => {
          // Create a new list item element
          const listItem = document.createElement('li');
          
          // Set the inner HTML of the list item to include interpretation details
          listItem.innerHTML = `
            <h2>Dream ID: ${interpretation.id}</h2>
            <p><strong>Description:</strong> ${interpretation.dream_description}</p>
            <p><strong>Interpretation:</strong> ${interpretation.interpretation_text}</p>
            <p><strong>Created At:</strong> ${new Date(interpretation.created_at).toLocaleString()}</p>
            <p><strong>Creator:</strong> ${interpretation.creator.name}</p>
          `;
          
          // Append the list item to the unordered list
          list.appendChild(listItem);
        });
        
        // Append the unordered list to the container
        container.appendChild(list);
      } else {
        // Display a message if no interpretations were found
        container.innerHTML = '<p>No interpretations found.</p>';
      }
    }
  
    // Fetch and display interpretations when the page loads
    fetchInterpretations();
  });
