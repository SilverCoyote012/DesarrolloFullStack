const express = require('express');
const app = express();
const tasksRoutes = require('./routes/tasksRoutes');
const usersRoutes = require('./routes/usersRoutes');
const errorHandler = require('./middlewares/errorHandle');

app.use(express.json());
app.use('/api', tasksRoutes);
app.use('/api', usersRoutes);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}/api/`);
});