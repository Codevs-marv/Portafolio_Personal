document.getElementById("formCita").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que la página se recargue

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const servicio = document.getElementById("servicio").value;
    const fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;

    // Asegurar formato HH:MM:SS (añadir segundos si faltan)
    if (hora.length === 5) {
        hora += ":00"; // Convertir "HH:MM" a "HH:MM:SS"
    }

    const cita = {
        nombre,
        telefono,
        servicio,
        fecha,
        hora
    };

    try {
        const response = await fetch("http://localhost:3000/api/citas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cita)
        });

        const data = await response.json();
        alert(data.mensaje); // Muestra un mensaje de éxito o error
    } catch (error) {
        alert("Error al agendar la cita. Inténtalo de nuevo.");
        console.error("Error:", error);
    }
});
