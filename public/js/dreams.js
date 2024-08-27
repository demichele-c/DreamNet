//public/js/dreams.js
ddocument.addEventListener('DOMContentLoaded', function() {
  const dreamsContainer = document.getElementById('dreams');

  fetch('/api/dreams')
      .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
      })
      .then(dreams => {
          dreams.forEach(dream => {
              const dreamElement = document.createElement('div');
              dreamElement.className = 'dream-item';
              dreamElement.innerHTML = `
                  <h2>${dream.name}</h2>
                  <p>${dream.description}</p>
                  <small>Logged on ${new Date(dream.date_created).toLocaleDateString()}</small>
                  <button data-id="${dream.id}" class="edit-btn">Edit</button>
                  <button data-id="${dream.id}" class="delete-btn">Delete</button>
              `;
              dreamsContainer.appendChild(dreamElement);
          });
      })
      .catch(error => console.error('Error fetching dreams:', error));
});
