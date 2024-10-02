document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Determinar el rol en función de la URL
  const role = window.location.pathname.includes('/registro-admin') ? 'admin' : 'user';
  try {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
    });

    const data = await response.json();
    if (response.ok) {
        alert('Registration successful');
        window.location.href = window.location.origin + '/api/auth/login';
    } else {
        alert(data.message);
    }
    } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
  });

// Puedes agregar más elementos para que se revelen, si lo deseas.
ScrollReveal().reveal('.top-header', {
    origin: 'top',
    distance: '30px',
    duration: 800,
    delay: 300
});
  
ScrollReveal().reveal('.input-field', {
    origin: 'left',
    distance: '30px',
    duration: 800,
    interval: 200 // Diferencia de tiempo entre cada elemento
});
   
ScrollReveal().reveal('.bottom', {
    origin: 'bottom',
    distance: '30px',
    duration: 800,
    delay: 300
});
  