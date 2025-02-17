const { login } = require('./login');

test('debería iniciar sesión con credenciales válidas', () => {
	expect(login('usuario', 'contraseña')).toBe(true);
});

test('no debería iniciar sesión con credenciales inválidas', () => {
	expect(login('usuario', 'contraseñaIncorrecta')).toBe(false);
});