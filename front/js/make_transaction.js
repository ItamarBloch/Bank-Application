// Function to handle the transaction form submission
document.getElementById('transactionForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const receiverEmail = document.getElementById('receiverEmail').value;
    const amount = document.getElementById('amount').value;
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const messageElement = document.getElementById('message');

    // Clear any previous messages
    messageElement.innerText = '';

    try {
        const response = await fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: receiverEmail, amount })
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.innerText = 'Transaction successful!'; // Show success message
            // Optionally, you might want to refresh the balance here
            // fetchBalance(); // Uncomment if you want to refresh the balance after a successful transaction
        } else {
            throw new Error(data.message); // Show error message
        }
    } catch (error) {
        messageElement.innerText = `Error: ${error.message}`;
        messageElement.classList.add('error'); // Add error class for styling
    }
});

// Add event listener for the back button
document.getElementById('backToDashboard').addEventListener('click', () => {
    window.location.href = '../html/dashboard.html'; // Go back to the dashboard
});
