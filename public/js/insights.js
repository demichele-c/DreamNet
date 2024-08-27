document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch interpretations data
    async function fetchInterpretations() {
      try {
        const response = await fetch('/api/interpretations'); // Adjust this URL based on your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayInterpretations(data);
      } catch (error) {
        console.error('Error fetching interpretations:', error);
        const container = document.getElementById('interpretations-container');
        container.innerHTML = '<p>Error loading interpretations. Please try again later.</p>';
      }
    }
  
    // Function to display interpretations data
    function displayInterpretations(interpretations) {
      const container = document.getElementById('interpretations-container');
      if (interpretations.length > 0) {
        const list = document.createElement('ul');
        interpretations.forEach(interpretation => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <h2>Dream ID: ${interpretation.id}</h2>
            <p><strong>Description:</strong> ${interpretation.dream_description}</p>
            <p><strong>Interpretation:</strong> ${interpretation.interpretation_text}</p>
            <p><strong>Created At:</strong> ${new Date(interpretation.created_at).toLocaleString()}</p>
            <p><strong>Creator:</strong> ${interpretation.creator.name}</p>
          `;
          list.appendChild(listItem);
        });
        container.appendChild(list);
      } else {
        container.innerHTML = '<p>No interpretations found.</p>';
      }
    }
  
    // Fetch and display interpretations on page load
    fetchInterpretations();
  });
  