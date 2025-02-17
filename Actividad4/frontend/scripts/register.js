const API_URL = 'http://localhost:5000/api/users';
const buttonRegister = document.getElementById('register');

buttonRegister.addEventListener('click', async function(event) {
    event.preventDefault();
    const name = document.getElementById('nameRegister').value;
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('passwordRegister').value;
    const message = document.getElementById('messageRegister');

    if (!name || !email || !password) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    message.innerHTML = data.message 

    if (response.ok) {
        // console.log('Usuario creado:', data.user);
        window.location.href = './login.html';
    } else {
        console.error('Error al crear usuario:', data.message);
    }
}); 