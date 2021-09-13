/* eslint-disable prefer-destructuring */

if (!process.env.API_KEY) {
  throw new Error("API_KEY not set");
}

if (!process.env.API_DOMAIN) {
  throw new Error("API_DOMAIN not set");
}

const API_KEY = process.env.API_KEY;
const API_DOMAIN = process.env.API_DOMAIN;

export { API_KEY, API_DOMAIN };
