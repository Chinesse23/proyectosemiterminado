document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            { title: 'Clase de Surf', start: '2024-09-15', description: 'Aprende a surfear con los mejores instructores.' },
            { title: 'Taller de Cocina', start: '2024-09-20', description: 'Descubre los secretos de la cocina local.' },
            { title: 'Clase de Yoga', start: '2024-09-25', description: 'Relájate y encuentra tu equilibrio.' },
            { title: 'Clase de Fotografía', start: '2024-10-05', description: 'Captura la belleza de Choroní.' },
            { title: 'Taller de Pintura', start: '2024-10-15', description: 'Explora tu creatividad con la pintura.' },
            { title: 'Clase de Danza', start: '2024-10-25', description: 'Aprende a bailar con ritmo y estilo.' },
            { title: 'Clase de Escultura', start: '2024-11-05', description: 'Moldea tus ideas en esculturas.' },
            { title: 'Taller de Cerámica', start: '2024-11-15', description: 'Crea hermosas piezas de cerámica.' },
            { title: 'Clase de Música', start: '2024-11-25', description: 'Descubre el músico que llevas dentro.' },
            { title: 'Clase de Teatro', start: '2024-12-05', description: 'Desarrolla tus habilidades actorales.' },
            { title: 'Taller de Escritura', start: '2024-12-15', description: 'Escribe tus propias historias.' }
        ],
        eventClick: function(info) {
            alert('Evento: ' + info.event.title + '\nDescripción: ' + info.event.extendedProps.description);
            // Remover la clase 'selected' de todos los días
            document.querySelectorAll('.fc-daygrid-day').forEach(day => day.classList.remove('selected'));
            // Añadir la clase 'selected' al día clicado
            info.el.classList.add('selected');
            // Desplazar la página a la sección de inscripción
            document.querySelector('.contact-form').scrollIntoView({ behavior: 'smooth' });
        }
    });
    calendar.render();

    // ScrollReveal Configurations
    ScrollReveal().reveal('.featured-classes', { 
        duration: 1000, 
        origin: 'left', 
        distance: '100px' 
    });
    ScrollReveal().reveal('.calendar', { 
        duration: 1000, 
        origin: 'right', 
        distance: '100px' 
    });
    ScrollReveal().reveal('.instructors', { 
        duration: 1000, 
        origin: 'bottom', 
        distance: '100px' 
    });
    ScrollReveal().reveal('.contact-form', { 
        duration: 1000, 
        origin: 'top', 
        distance: '100px' 
    });
    ScrollReveal().reveal('.gallery', { 
        duration: 1000, 
        scale: 0.85 
    });

    // Carousel Functionality
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const carouselContainer = document.querySelector('.carousel-container');
    let index = 0;

    prev.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : carouselContainer.children.length - 1;
        carouselContainer.style.transform = `translateX(-${index * 100}%)`;
    });

    next.addEventListener('click', () => {
        index = (index < carouselContainer.children.length - 1) ? index + 1 : 0;
        carouselContainer.style.transform = `translateX(-${index * 100}%)`;
    });
});

function limitCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="classes"]:checked');
    if (checkboxes.length > 3) {
        alert('Solo puedes seleccionar hasta 3 clases.');
        checkboxes[checkboxes.length - 1].checked = false;
    }
}

// backend
document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.classes = formData.getAll('classes'); // Asegúrate de obtener todos los valores de 'classes'
    const feedback = document.getElementById('feedback');

    try {
        const response = await fetch('/api/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            feedback.textContent = 'Inscripción exitosa. Revisa tu correo para la confirmación.';
            feedback.className = 'feedback success';
        } else {
            feedback.textContent = 'Hubo un error en la inscripción. Inténtalo de nuevo.';
            feedback.className = 'feedback error';
        }
    } catch (error) {
        feedback.textContent = 'Hubo un error en la inscripción. Inténtalo de nuevo.';
        feedback.className = 'feedback error';
    }

    feedback.style.display = 'block';
});
