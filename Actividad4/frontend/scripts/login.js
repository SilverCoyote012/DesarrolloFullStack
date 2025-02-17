const API_URL = 'http://localhost:5000/api/users';
const buttonLogin = document.getElementById('login');

buttonLogin.addEventListener('click', async function(event) {
    event.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;
    const message = document.getElementById('messageLogin');

    if (!email || !password) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    message.innerHTML = data.message;

    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = './index.html';
    } else {
        console.error('Error al autenticar usuario:', data.message);
    }
});