const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#dream-name').value.trim();
    
    const description = document.querySelector('#dream-desc').value.trim();
  
    if (name &&  description) {
      const response = await fetch(`/api/dreams`, {
        method: 'POST',
        body: JSON.stringify({ name,  description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dream');
      } else {
        alert('Failed to create dream');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/dreams/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete dream');
      }
    }
  };
  
  document
    .querySelector('.new-dream-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.dream-list')
    .addEventListener('click', delButtonHandler);
  