document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            // Registration successful
            alert('Registered successfully');
            window.location.href = '/'; // Redirect to homepage
        } else {
            // Registration failed
            alert('Registration unsuccessful: ' + result.message);
            window.location.reload(); // Refresh the page
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An unexpected error occurred');
    }
});
