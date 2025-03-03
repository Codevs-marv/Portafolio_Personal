const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos SQL Server
const dbConfig = {
  user: 'tu_usuario',      // Reemplaza con tu usuario de SQL Server
  password: 'tu_contraseña', // Reemplaza con tu contraseña
  server: 'NITROMARV',      // O el nombre de tu servidor
  database: 'GestionCitas',
  options: {
    encrypt: false,         // Ponlo en true si usas Azure
    trustServerCertificate: true
  }
};

// Conectar a la base de datos
sql.connect(dbConfig)
  .then(() => console.log('✅ Conectado a SQL Server'))
  .catch(err => console.error('❌ Error al conectar a SQL Server:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido al sistema de gestión de citas!');
});

// Ruta para agendar una cita
app.post('/api/citas', async (req, res) => {
  try {
    const { nombre, telefono, servicio, fecha, hora } = req.body;

    // Conectar a SQL Server
    const pool = await sql.connect(dbConfig);
    
    // Insertar en la base de datos
    const result = await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('telefono', sql.NVarChar, telefono)
      .input('servicio', sql.NVarChar, servicio)
      .input('fecha', sql.Date, fecha)
      .input('hora', sql.Time, hora)
      .query(`
        INSERT INTO Citas (Nombre, Telefono, Servicio, Fecha, Hora)
        VALUES (@nombre, @telefono, @servicio, @fecha, @hora)
      `);

    res.status(201).json({ mensaje: 'Cita agendada con éxito' });
  } catch (error) {
    console.error('❌ Error al agendar cita:', error);
    res.status(500).json({ mensaje: 'Error al agendar la cita' });
  }
});



// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
