const express = require('express');
const app = express();
const routes = require('./routes/tasksRoutes');
const errorHandler = require('./middlewares/errorHandle');

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}/api/`);
});