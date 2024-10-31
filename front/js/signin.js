document.getElementById('signinForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/signin', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();
    document.getElementById('message').innerText = data.message; // Display the message from the server

    if (response.ok) {
        localStorage.setItem('token', data.token);
        // Redirect to the dashboard or another page
        window.location.href = '../html/dashboard.html'; 
    } else {
        console.error('Sign-in error:', data.message);
    }
});
