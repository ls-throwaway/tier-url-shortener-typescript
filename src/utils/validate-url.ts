// Based on: https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php

/**
 * Check if a given string is a valid url.
 *
 * @param {string} url The url to check for.
 * @returns {string | undefined} A validated url when the url is vaild; undefined otherwise.
 */
export default function validateUrl(url: string): string | undefined {
    let returnUrl = url;

    // Check if url already start with http(s)
    if (!/^https?:\/\//i.test(url)) returnUrl = `https://${url}`;

    const regex = new RegExp(
        // eslint-disable-next-line max-len
        /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
    );
    if (regex.test(returnUrl)) return returnUrl;

    return undefined;
}
