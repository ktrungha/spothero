import { fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import create, { getHistory, getStore } from 'store/store';
import spots from '../../back-end/db.json';
import { renderApp } from './utils';

describe('<Root />', () => {

  it('Full flow', async () => {
    const mock = new MockAdapter(axios);
    const queries = renderApp();

    mock.onGet('/spots').reply(200, spots.spots);

    const onPurchase = async (email: string) => {
      const detailsButtons = await queries.findAllByText('Details');
      expect(detailsButtons.length).toBe(spots.spots.length);

      const store: ReturnType<typeof create> = getStore();
      const history = getHistory();

      expect(queries.queryByText('Spot Details')).toBe(null);

      fireEvent.click(detailsButtons[1]);

      // see Spot Details now
      queries.getByText('Spot Details')

      // Check if the description is there
      queries.getByText('between S Michigan Ave and S Wabash Ave.', { exact: false })

      // Check the selected spot id
      expect(store.getState().spot.selected.id).toBe(2);

      const bookButton = queries.getByText('$16.50 | Book it').closest('button');
      fireEvent.click(bookButton!);

      // Should see the back to search header
      const backToSearch = queries.getByText("< Back to search");

      fireEvent.click(backToSearch);
      await queries.findAllByText('Details');

      // should be back to search
      expect(history.location.pathname).toBe('/');

      fireEvent.click(queries.getByText('$16.50 | Book it').closest('button')!);

      // should be at checkout again
      expect(history.location.pathname).toBe('/checkout');

      // all fields should be empty
      queries.getAllByRole("input").forEach(one => expect((one as HTMLInputElement).value).toEqual(''));

      const purchaseButton = queries.getByText('$16.50 | Book it').closest('button')!;
      fireEvent.click(purchaseButton);

      // check all the error messages
      queries.getByText('Please enter a valid first name');
      queries.getByText('Please enter a valid last name');
      queries.getByText('Please enter a valid email');
      queries.getByText('Please enter a valid phone number');

      const inputs = queries.getAllByRole("input");

      fireEvent.change(inputs[0], { target: { value: 'Joe' } });
      expect((inputs[0] as HTMLInputElement).value).toEqual('Joe');

      fireEvent.change(inputs[1], { target: { value: 'Doe' } });
      expect((inputs[1] as HTMLInputElement).value).toEqual('Doe');

      fireEvent.change(inputs[2], { target: { value: email } });
      expect((inputs[2] as HTMLInputElement).value).toEqual(email);

      fireEvent.change(inputs[3], { target: { value: '(123) 456-7890' } });
      expect((inputs[3] as HTMLInputElement).value).toEqual('(123) 456-7890');

      fireEvent.click(queries.getByText('$16.50 | Book it').closest('button')!);

      // should be at confirmation
      expect(history.location.pathname).toBe('/confirmation');
      queries.getByText("Park it like its hot!");

      queries.getByText("Purchase Another Spot!");
      queries.getByText(email);
    }

    // first purchase
    await onPurchase('joedoe@email.com');
    fireEvent.click(queries.getByText("Purchase Another Spot!").closest('button')!);

    // second purchase
    await onPurchase('abc@email.com');
  })
});