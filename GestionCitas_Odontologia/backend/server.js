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
  server: 'NITROMARV', 
  database: 'GestionCitas',
  user: 'gestion_citas_user', 
  password: 'GestionCitas321', 
  options: {
    encrypt: false, // Prueba con true si sigue fallando
    trustServerCertificate: true
  }
};

// Conectar a la base de datos
async function connectDB() {
  try {
    await sql.connect(dbConfig);
    console.log('✅ Conectado a SQL Server');
  } catch (err) {
    console.error('❌ Error al conectar a SQL Server:', err);
  }
}

connectDB();

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido al sistema de gestión de citas!');
});

// Ruta para agendar una cita
app.post('/api/citas', async (req, res) => {
  try {
    const { nombre, telefono, servicio, fecha, hora } = req.body;

    const pool = await sql.connect(dbConfig);
    
    await pool.request()
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
