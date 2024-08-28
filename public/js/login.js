// Define an asynchronous function to handle the login form submission
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Collect the values from the login form fields
  const userName = document.querySelector('#userName-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both username and password fields are filled
  if (userName && password) {
    try {
      // Send a POST request to the login API endpoint with the user credentials
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ userName, password }), // Convert the credentials to JSON format
        headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
      });

      // Check if the response was successful
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        // If there was an error, display the status text as an alert
        alert(response.statusText);
      }
    } catch (error) {
      // Log any errors that occur during the fetch request
      console.error('Error during login:', error);
    }
  }
};

// Define an asynchronous function to handle the signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Collect the values from the signup form fields
  const name = document.querySelector('#name-signup').value.trim();
  const userName = document.querySelector('#userName-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if all fields are filled
  if (name && userName && password) {
    try {
      // Send a POST request to the signup API endpoint with the user details
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, userName, password }), // Convert the user details to JSON format
        headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
      });

      // Check if the response was successful
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        // If there was an error, display the status text as an alert
        alert(response.statusText);
      }
    } catch (error) {
      // Log any errors that occur during the fetch request
      console.error('Error during signup:', error);
    }
  }
};

// Add an event listener to the login form for the submit event
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Add an event listener to the signup form for the submit event
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
