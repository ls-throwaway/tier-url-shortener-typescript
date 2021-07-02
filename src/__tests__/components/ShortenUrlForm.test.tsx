import { act, fireEvent, waitFor, render } from '@testing-library/react';

import { ShortenUrlForm } from '../../components';
import bitlyApi from '../../api/bitly';

const SHORTENED_URL = 'https://tier.app';
jest.mock('../../api/bitly');
const mockedBitlyApi = bitlyApi as jest.Mocked<typeof bitlyApi>;

describe('when a user', () => {
    describe('submits an empty url', () => {
        it('nothing happens', () => {
            const { getByTestId, queryByText } = render(<ShortenUrlForm />);
            const button = getByTestId('submit-button');
            fireEvent.click(button);
            expect(mockedBitlyApi.shortenUrl).not.toHaveBeenCalled();
            expect(queryByText(SHORTENED_URL)).toBeNull();
        });
    });

    describe('submits a valid url', () => {
        it('the form calls the Bit.ly endpoint', async () => {
            const { getByTestId } = render(<ShortenUrlForm />);
            const input = getByTestId('url-input-field');
            const button = getByTestId('submit-button');

            await act(async () => {
                fireEvent.change(input, {
                    target: { value: 'https://www.example.com' },
                });
            });

            await act(async () => {
                fireEvent.click(button);
            });

            await waitFor(() => expect(mockedBitlyApi.shortenUrl).toHaveBeenCalledTimes(1));
        });

        it('the result url is displayed', async () => {
            const { getByTestId, queryByText } = render(<ShortenUrlForm />);
            const input = getByTestId('url-input-field');
            const button = getByTestId('submit-button');

            mockedBitlyApi.shortenUrl.mockResolvedValue({
                link: SHORTENED_URL,
            } as BitlyShortenUrlResponse);

            await act(async () => {
                fireEvent.change(input, {
                    target: { value: 'https://www.example.com' },
                });
            });

            await act(async () => {
                fireEvent.click(button);
            });

            await waitFor(() => expect(
                queryByText(new RegExp(SHORTENED_URL, 'i')),
            ).not.toBeNull());
        });
    });
});
