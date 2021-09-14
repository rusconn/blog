/* eslint-disable prefer-destructuring */

if (!process.env.API_KEY) {
  throw new Error("API_KEY not set");
}

if (!process.env.API_DOMAIN) {
  throw new Error("API_DOMAIN not set");
}

if (!process.env.PREVIEW_MODE_MAX_AGE) {
  throw new Error("PREVIEW_MODE_MAX_AGE not set");
}

const API_KEY = process.env.API_KEY;
const API_DOMAIN = process.env.API_DOMAIN;
const PREVIEW_MODE_MAX_AGE = Number(process.env.PREVIEW_MODE_MAX_AGE);

if (Number.isNaN(PREVIEW_MODE_MAX_AGE)) {
  throw new Error("failed to parse PREVIEW_MODE_MAX_AGE");
}

export { API_KEY, API_DOMAIN, PREVIEW_MODE_MAX_AGE };
