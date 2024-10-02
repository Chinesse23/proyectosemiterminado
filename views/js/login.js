document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful');
      window.location.href = data.role === 'admin' ? '/admin' : '/';
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});

// Inicializa ScrollReveal
ScrollReveal().reveal('.container', {
  origin: 'bottom',
  distance: '50px',
  duration: 1000,
  delay: 200,
  easing: 'ease-in-out'
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
