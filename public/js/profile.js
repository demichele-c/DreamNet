const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#dream-name').value.trim();
    const needed_interpretation= document.querySelector('#dream-interpretation').value.trim();
    const user_name = document.querySelector('#user_name').value.trim();
  
    if (name && needed_interpretation && user_name) {
      const response = await fetch(`/api/dreams`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_interpretation, user_name }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
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
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  