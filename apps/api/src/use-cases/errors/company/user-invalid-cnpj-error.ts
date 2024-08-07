export class UserInvalidCNPJError extends Error {
  constructor() {
    super('CNPJ inválido.')
  }
}
