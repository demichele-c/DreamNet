//public/js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  const dreamForm = document.getElementById('dreamForm');
  const interpretationResult = document.getElementById('interpretationResult');
  const interpretationText = document.getElementById('interpretationText');

  dreamForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission

      const dreamName = document.getElementById('dreamName').value.trim();
      const dreamDescription = document.getElementById('dreamInput').value.trim();

      if (dreamName && dreamDescription) {
          try {
              // Send the dream description to the server for interpretation
            //  const response = await fetch('/api/dreams/interpret', {
              const response = await fetch('/api/dreams', {
                  method: 'POST',
                  body: JSON.stringify({ name: dreamName, description: dreamDescription }),
                //  body: JSON.stringify({ description: dreamDescription }),
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });

              if (response.ok) {
                  const data = await response.json();
                  console.log("data: ", data);
                  // Display the interpretation result
                  //interpretationText.textContent = data.interpretation_text;
                  interpretationResult.textContent = data.toString();
                  interpretationResult.style.display = 'block'; // Show the interpretation section
              } else {
                  const errorData = await response.json();
                  alert(`Failed to get interpretation: ${errorData.message}`);
              }
          } catch (err) {
              console.error('Error:', err);
              alert('An error occurred while getting the interpretation.');
          }
      } else {
          alert('Please enter both a name and description for your dream to get an interpretation.');
      }
  });
});
