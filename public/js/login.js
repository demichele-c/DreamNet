const loginFormHandler = async (event) => {
  event.preventDefault();
  const userName = document.querySelector('#userName-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  
  console.log('Submitting login form with:', { userName, password });

  if (userName && password) {
    try {
      const response = await fetch('https://dreamnet-4.onrender.com/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
};
