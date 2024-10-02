document.addEventListener('DOMContentLoaded', () => {
    loadPosadas();
    loadActividades();
    loadVentasChart();
  });
  
  function loadPosadas() {
    fetch('/posadas')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#posadasTable tbody');
            tableBody.innerHTML = '';
            data.forEach(posada => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${posada.nombre}</td>
                    <td>${posada.direccion}</td>
                    <td>${posada.contacto}</td>
                    <td>
                        <button onclick="editPosada('${posada._id}')">Editar</button>
                        <button onclick="deletePosada('${posada._id}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar posadas:', error));
  }
  
  function addPosada() {
    const nombre = prompt('Nombre de la posada:');
    const direccion = prompt('Dirección de la posada:');
    const contacto = prompt('Contacto de la posada:');
    const informacion = prompt('Información de la posada:');
  
    const nuevaPosada = { nombre, direccion, contacto, informacion };
  
    fetch('/posadas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaPosada)
    })
    .then(() => loadPosadas())
    .catch(error => console.error('Error al agregar posada:', error));
  }
  
  function editPosada(id) {
    const nombre = prompt('Nuevo nombre de la posada:');
    const direccion = prompt('Nueva dirección de la posada:');
    const contacto = prompt('Nuevo contacto de la posada:');
    const informacion = prompt('Nueva información de la posada:');
  
    const posadaActualizada = { nombre, direccion, contacto, informacion };
  
    fetch(`/posadas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(posadaActualizada)
    })
    .then(() => loadPosadas())
    .catch(error => console.error('Error al editar posada:', error));
  }
  
  function deletePosada(id) {
    fetch(`/posadas/${id}`, { method: 'DELETE' })
        .then(() => loadPosadas())
        .catch(error => console.error('Error al eliminar posada:', error));
  }
  
  function loadActividades() {
    fetch('/actividades')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#actividadesTable tbody');
            tableBody.innerHTML = '';
            data.forEach(actividad => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${actividad.nombre}</td>
                    <td>${new Date(actividad.fecha).toLocaleDateString()}</td>
                    <td>${actividad.participantes}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar actividades:', error));
  }
  
  function loadVentasChart() {
    fetch('/ventas')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('ventasChart').getContext('2d');
            const ventasChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels, // Etiquetas de las posadas
                    datasets: [{
                        label: 'Ventas',
                        data: data.ventas, // Datos de ventas reales
                        backgroundColor: [
                            'rgba(46, 139, 87, 0.2)', // Verde oscuro
                            'rgba(143, 188, 143, 0.2)', // Verde claro
                            'rgba(60, 179, 113, 0.2)' // Verde medio
                        ],
                        borderColor: [
                            'rgba(46, 139, 87, 1)',
                            'rgba(143, 188, 143, 1)',
                            'rgba(60, 179, 113, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al cargar datos de ventas:', error));
  }
  