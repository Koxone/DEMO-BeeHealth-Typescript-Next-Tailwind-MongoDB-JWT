// ? compare: compara una contraseña con un hash para ver si coinciden
export interface PasswordHasher {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
