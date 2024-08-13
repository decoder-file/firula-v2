export class CompanyOpeningHourNotFound extends Error {
  constructor() {
    super('Horário de funcionamento da empresa não encontrado.')
  }
}
