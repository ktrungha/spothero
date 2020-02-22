export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const DEFAULT_CUSTOMER: Customer = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: ''
}

export interface CustomerValidation {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export const PHONE_NUMBER_MASK = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export function validateCustomer(customer: Customer) {
  const retval: CustomerValidation = {};
  if (!customer.firstName) {
    retval.firstName = 'Please enter a valid first name'
  }
  if (!customer.lastName) {
    retval.lastName = 'Please enter a valid last name'
  }
  if (!customer.email) {
    retval.email = 'Please enter a valid email'
  }
  if (customer.phoneNumber.length !== PHONE_NUMBER_MASK.length) {
    retval.phoneNumber = 'Please enter a valid phone number'
  }
  return retval;
}
