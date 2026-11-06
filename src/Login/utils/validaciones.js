export const validarLogin = ({ username, password }) => {
  if (!username?.trim() || !password?.trim()) {
    return 'Por favor, ingresa tanto el usuario como la contraseña.';
  }
  return null;
};

export const validarRegistro = ({ username, password, confirmPassword }) => {
  if (!username?.trim()) {
    return 'El nombre de usuario es obligatorio.';
  }
  if (username.trim().length < 3) {
    return 'El nombre de usuario debe tener al menos 3 caracteres.';
  }
  if (!password?.trim()) {
    return 'La contraseña es obligatoria.';
  }
  if (password.length < 4) {
    return 'La contraseña debe tener al menos 4 caracteres.';
  }
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden.';
  }
  return null;
};
