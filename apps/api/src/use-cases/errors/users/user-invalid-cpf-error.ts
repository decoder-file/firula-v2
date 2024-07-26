export class UserInvalidCpfError extends Error {
  constructor() {
    super('CPF inválido.')
  }
}
