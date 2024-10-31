// Function to fetch transactions from the backend
async function fetchTransactions() {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    const response = await fetch('http://localhost:3000/transactions', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    
    const transactionsListElement = document.getElementById('transactionsList');

    if (response.ok) {
        // Clear loading message
        transactionsListElement.innerHTML = '';

        // Populate the transactions list
        data.transactions.forEach(transaction => {
            const transactionDiv = document.createElement('div');
            transactionDiv.className = 'transaction';
            transactionDiv.innerHTML = `
                <strong>Sender:</strong> ${transaction.sender.name}<br>
                <strong>Receiver:</strong> ${transaction.receiver.name}<br>
                <strong>Amount:</strong> $${transaction.amount}
            `;
            transactionsListElement.appendChild(transactionDiv);
        });
    } else {
        console.error('Error fetching transactions:', data.message);
        transactionsListElement.innerText = 'Error fetching transactions'; // Optional: Update UI to reflect error
    }
}

// Fetch transactions on page load
fetchTransactions();

// Add event listener for the back button
document.getElementById('backToDashboard').addEventListener('click', () => {
    window.location.href = '../html/dashboard.html'; // Go back to the dashboard
});
