import Button from 'common/Button';
import { Customer, CustomerValidation, DEFAULT_CUSTOMER, PHONE_NUMBER_MASK, validateCustomer } from 'model/customer';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { totallyValid } from 'utils';
import Field from './Field';

interface Props {
  price: number;
  onSubmit(customer: Customer): void;
}

const Form: React.FC<Props> = props => {
  const { price, onSubmit } = props;
  const [customer, setCustomer] = React.useState<Customer>(DEFAULT_CUSTOMER);
  const [customerValidation, setCustomerValidation] = React.useState<CustomerValidation>({});

  const submitHandler = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateCustomer(customer);
    if (totallyValid(validation)) {
      onSubmit(customer);
    } else {
      setCustomerValidation(validation);
    }
  }, [customer, onSubmit]);

  return <form onSubmit={submitHandler}>
    <Field name="First Name"
      error={customerValidation.firstName}
      value={customer.firstName} onChange={(val) => setCustomer(old => ({ ...old, firstName: val }))} />
    <Field name="Last Name"
      error={customerValidation.lastName}
      value={customer.lastName} onChange={(val) => setCustomer(old => ({ ...old, lastName: val }))} />
    <Field name="Email"
      error={customerValidation.email}
      value={customer.email} onChange={(val) => setCustomer(old => ({ ...old, email: val }))} />
    <Field name="Phone Number"
      error={customerValidation.phoneNumber}
      value={customer.phoneNumber}
      mask={PHONE_NUMBER_MASK}
      onChange={(val) => setCustomer(old => ({ ...old, phoneNumber: val }))} />
    <div style={{ textAlign: 'end' }}>
      <Button
        type='submit'
        color='tertiary'
      >
        <p style={{ display: 'inline', fontSize: '1rem' }}>
          <FormattedMessage id="bookIt" values={{
            price: <FormattedNumber value={price / 100}
              minimumFractionDigits={2} maximumFractionDigits={2} />
          }} />
        </p>
      </Button>
    </div>
  </form>
}

export default Form;
