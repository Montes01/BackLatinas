const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PHONE_REGEX = /^\+?[0-9]{1,3}?[-.\s]?([0-9]{10}|[0-9]{3}[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})$/

export const isEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email)
}

export const isPhoneNumber = (phone: string): boolean => {
  return PHONE_REGEX.test(phone)
}