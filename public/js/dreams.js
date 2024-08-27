const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#dream-name').value.trim();
  const description = document.querySelector('#dream-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/dreams`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dreams'); // Redirect to the dreams page
    } else {
      alert('Failed to create dream');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/dreams/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dreams'); // Redirect to dreams page after deletion
    } else {
      alert('Failed to delete dream');
    }
  }
};

const editButtonHandler = (event) => {
  if (event.target.classList.contains('edit-btn')) {
    const id = event.target.getAttribute('data-id');
    document.location.replace(`/dreams/edit/${id}`); // Redirect to edit page with dream ID
  }
};

document
  .querySelector('.new-dream-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.dream-list')
  .addEventListener('click', (event) => {
    delButtonHandler(event);
    editButtonHandler(event);
  });
