// Function to fetch balance from the backend
async function fetchBalance() {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    try {
        const response = await fetch('http://localhost:3000/balance', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('balance').innerText = `Your balance: $${data.balance}`; // Display balance
        } else {
            throw new Error(data.message); // Handle error response
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
        document.getElementById('balance').innerText = 'Error fetching balance'; // Optional: Update UI to reflect error
    }
}

// Fetch balance on page load
fetchBalance();

// Add event listener for the View Transactions button
document.getElementById('viewTransactions').addEventListener('click', () => {
    window.location.href = '../html/view_transactions.html'; // Go to the view transactions page
});

// Add event listener for the Make Transaction button
document.getElementById('makeTransaction').addEventListener('click', () => {
    window.location.href = '../html/make_transaction.html'; // Go to the make transaction page
});

// Add event listener for the Logout button
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.href = '../html/signin.html'; // Redirect to sign-in page
});
