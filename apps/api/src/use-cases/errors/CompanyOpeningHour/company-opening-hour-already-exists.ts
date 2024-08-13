export class CompanyOpeningHourAlreadyExists extends Error {
  constructor() {
    super(
      'Já existe um horário de funcionamento para a empresa neste dia da semana.',
    )
  }
}
