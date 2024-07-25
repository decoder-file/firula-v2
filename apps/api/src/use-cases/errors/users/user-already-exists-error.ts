export class UserAlreadyExistsError extends Error {
  constructor() {
    super('O email fornecido já está cadastrado. Por favor, use outro email.')
  }
}
