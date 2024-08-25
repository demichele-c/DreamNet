const loginFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#username-login').value.trim(); // Changed to '#username-login'
    const password = document.querySelector('#password-login').value.trim();

    if (userName && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const userName = document.querySelector('#userName-signup').value.trim(); // Ensure these IDs match your HTML
    const password = document.querySelector('#password-signup').value.trim();

    if (name && userName && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
