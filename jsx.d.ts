// https://github.com/ota-meshi/eslint-plugin-astro?tab=readme-ov-file#resolving-error-in-jsx-unsafe-return-of-an-any-typed-value

import "astro/astro-jsx";

declare global {
  namespace JSX {
    // type Element = astroHTML.JSX.Element // We want to use this, but it is defined as any.
    type Element = HTMLElement;
  }
}
