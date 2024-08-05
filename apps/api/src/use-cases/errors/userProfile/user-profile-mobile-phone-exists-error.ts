export class UserProfileMobilePhoneExistsError extends Error {
  constructor() {
    super(
      'Telefone celular já cadastrado. Por favor, use outro número de telefone celular.',
    )
  }
}
