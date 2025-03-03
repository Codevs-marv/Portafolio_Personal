document.getElementById('citaForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const cita = {
      nombre: document.getElementById('nombre').value,
      telefono: document.getElementById('telefono').value,
      servicio: document.getElementById('servicio').value,
      fecha: document.getElementById('fecha').value,
      hora: document.getElementById('hora').value
    };
  
    fetch('http://localhost:3000/api/citas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cita)
    })
    .then(response => response.json())
    .then(data => {
      alert('Cita agendada con éxito');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });