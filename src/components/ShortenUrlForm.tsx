import React, { useCallback, useState } from 'react';

// APIs
import bitlyApi from '../api/bitly';

// Utils
import copyToClipboard from '../utils/copy-to-clipboard';
import validateUrl from '../utils/validate-url';
import runEmojiExplosions from '../utils/run-emoji-explosions';

const ShortenUrlForm: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [state, setState] = useState<
        | { state: 'LOADING' | 'SUCCESS' | 'ERROR' | 'TIER'; message: string }
        | undefined
    >();

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // Only execute the code if the input is not empty
            if (value === '') {
                setState({
                    state: 'ERROR',
                    message: '☝️ Enter a url above to shorten it ☝️',
                });
                return;
            }

            // 🥚
            if (/tier\.app/.test(value)) {
                await runEmojiExplosions();

                setState({
                    state: 'SUCCESS',
                    message: `${value} is such a beautiful url. Why runing it? 🦁`,
                });
                return;
            }

            // Tries to validate the url and return an acceptable input for the Bit.ly API
            const validatedUrl = validateUrl(value);

            if (validatedUrl) {
                setState({ state: 'LOADING', message: 'Loading...' });

                try {
                    // Shorten url via Bit.ly API
                    const response = await bitlyApi.shortenUrl(validatedUrl);

                    copyToClipboard(response?.link);
                    const message = `${response?.link} --- copied!`;
                    setState(() => ({ state: 'SUCCESS', message }));
                } catch (err) {
                    setState({ state: 'ERROR', message: err.message });
                }
            } else {
                setState({
                    state: 'ERROR',
                    message: `Are you sure ${value} is a valid url? 🤔`,
                });
            }
        },
        [value],
    );

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input
                    placeholder="Url to shorten"
                    id="shorten"
                    type="text"
                    value={value}
                    onChange={onChange}
                    data-testid="url-input-field"
                />
            </label>
            <input
                type="submit"
                value="Shorten and copy URL"
                data-testid="submit-button"
            />

            <div>{typeof state !== 'undefined' && state.message}</div>
        </form>
    );
};

export default ShortenUrlForm;
