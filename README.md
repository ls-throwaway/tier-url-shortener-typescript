# **Tier URL Shortener** 🛴

Live demo [here](https://tier-url-shortener.netlify.app/). If you want to check the original commits, access to the original (private) repo can be requested to lorenzosignoretti[at]gmail[dot]com.

## Notes and assumptions

-   The challenge was completed in about **2 an a half hours**. Most of the code was written during the same sitting, with additional tests and this `readme` added later.
-   The proposed solution **sticks to the "suggestions" provided in the starting code** as much as possible. However, the following observations come to mind:
    -   There appears to be no need for a controlled `<input>` component. This would allow removing the `value` state and the `onChange` callback.
    -   A better setup for the form could use [`formik`](https://github.com/formium/formik) for the form and [`yup`](https://github.com/jquense/yup) for the form validation.
-   Because the Bit.ly API token was included in the `.env` file, it might be possible to retrieve it from the client. A more robut solution would perform this action on a server/serverless function to avoid exposing the token.

### "Bonus" points

-   Some effort was spent in setting up **TypeScript** for the project. While not required, this adds compile-time type safety, which can be very beneficial in larger projects like the ones I may have the chance to work on at Tier. In addition, because TypeScript is a superscript of JavaScript, I didn't feel like it would detract from the solution.
-   The code implemented to validate urls also adds the `https://` prefix if missing. The assumption is that most website that anyone would share on social networks probably support an ssl certificate.
-   A few tests have been added on some of the tool's core functionalities. Only the happy paths have been tested.

PS: Find the Easter Egg 🥚.
