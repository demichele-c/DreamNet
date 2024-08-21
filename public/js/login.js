document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    console.log('Submitting login form with:', { username, password });

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        console.log('Login response JSON:', result);

        if (response.ok) {
            // Redirect to dashboard
            console.log('Redirecting to:', result.redirect);
            window.location.href = result.redirect;
        } else {
            console.error('Error logging in user:', result.message);
            alert('Login failed: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred');
    }
});
