export class UserProfileNotFound extends Error {
  constructor() {
    super('Perfil de usuário não encontrado.')
  }
}
