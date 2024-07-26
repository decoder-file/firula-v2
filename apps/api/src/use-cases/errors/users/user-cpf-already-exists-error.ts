export class UserCpfAlreadyExistsError extends Error {
  constructor() {
    super('O CPF fornecido já está cadastrado.')
  }
}
