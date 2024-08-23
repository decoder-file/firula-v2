'use server'

export async function signUp(data: FormData) {
  console.log(Object.fromEntries(data))
}
