export class UserNotExistsError extends Error {
  constructor() {
    super('Usuário não encontrado')
  }
}
