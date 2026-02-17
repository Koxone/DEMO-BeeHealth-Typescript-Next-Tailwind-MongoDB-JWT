// Invalid credentials error
export class InvalidCredentialsError extends Error {
  constructor() {
    super('Email o Contraseña inválidos');
    this.name = 'InvalidCredentialsError';
  }
}
