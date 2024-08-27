//public/js/edit-dream.js

document.getElementById('edit-dream-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = document.querySelector('input[name="id"]').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
  
    try {
      const response = await fetch(`/api/dreams/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        window.location.href = '/dreams';
      } else {
        console.error('Failed to update dream');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
  