export class CompanyNotFound extends Error {
  constructor() {
    super('Empresa não encontrado.')
  }
}
