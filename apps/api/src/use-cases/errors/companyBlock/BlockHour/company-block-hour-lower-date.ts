export class CompanyBlockHourLowerDate extends Error {
  constructor() {
    super('A data fornecida é anterior à data atual.')
  }
}
