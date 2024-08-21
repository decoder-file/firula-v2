export class CompanyClosed extends Error {
  constructor() {
    super('A empresa se encontra fechada neste dia ou horário.')
  }
}
