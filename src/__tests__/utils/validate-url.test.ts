import validateUrl from '../../utils/validate-url';

describe('when a user tries to validate a url, validateUrl', () => {
    it('returns the given url when the url already contains the http(s) prefix', () => {
        const urlWithHttpPrefix = 'http://www.example.com';
        expect(validateUrl(urlWithHttpPrefix)).toStrictEqual(urlWithHttpPrefix);

        const urlWithHttpsPrefix = 'https://www.example.com';
        expect(validateUrl(urlWithHttpsPrefix)).toStrictEqual(
            urlWithHttpsPrefix,
        );
    });

    it("prepends 'https://' url when the url is missing the http(s) prefix", () => {
        const urlWithoutWww = 'example.com';
        expect(validateUrl(urlWithoutWww)).toStrictEqual(
            `https://${urlWithoutWww}`,
        );

        const urlWithWww = 'example.com';
        expect(validateUrl(urlWithWww)).toStrictEqual(`https://${urlWithWww}`);
    });

    it('returns undefined when the url is not valid', () => {
        const invalidUrls = [
            'invalidurl',
            'not-a-valid-url',
            'https://i-am-not-a-valid-link',
            'httppp://another-not-valid-one.invalid',
        ];

        invalidUrls.forEach((invalidUrl) => {
            expect(validateUrl(invalidUrl)).toBeUndefined();
        });
    });
});
