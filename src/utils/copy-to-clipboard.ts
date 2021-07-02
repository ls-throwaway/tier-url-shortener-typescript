/**
 * Copy a given string to the clipboard. Requires support for the Clipboard API.
 *
 * @param {string} str The text to copy to the clipboard
 */
export default async function copyToClipboard(str: string): Promise<void> {
    if (navigator.clipboard) await navigator.clipboard.writeText(str);
}
