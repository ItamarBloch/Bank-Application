document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    const response = await fetch('http://localhost:3000/signup', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            phone: phone
        })
    });

    const data = await response.json();
    document.getElementById('message').innerText = data.message; 

    if (response.ok) {
        // Optionally redirect to the sign-in page or another page
        // window.location.href = 'signin.html'; 
    } else {
        // Handle errors if necessary
        console.error('Signup error:', data.message);
    }
});
