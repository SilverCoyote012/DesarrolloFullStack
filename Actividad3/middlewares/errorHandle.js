function errorHandler(err, req, res, next) {
    // console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    // Si el error tiene un código de estado, se usa directamente.
    res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
}

module.exports = errorHandler;
