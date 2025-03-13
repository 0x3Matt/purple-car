// Test email submission
fetch('http://localhost:3000/api/waitlist', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
  }),
})
.then(response => response.json())
.then(data => console.log('Response:', data))
.catch(error => console.error('Error:', error)); 