/* eslint-disable prefer-destructuring */

if (!process.env.GRAPHCMS_PROJECT_API) {
  throw new Error("GRAPHCMS_PROJECT_API not set");
}

if (!process.env.GRAPHCMS_PROD_AUTH_TOKEN) {
  throw new Error("GRAPHCMS_PROD_AUTH_TOKEN not set");
}

if (!process.env.GRAPHCMS_DEV_AUTH_TOKEN) {
  throw new Error("GRAPHCMS_DEV_AUTH_TOKEN not set");
}

if (!process.env.GRAPHCMS_PREVIEW_POST_SECRET) {
  throw new Error("GRAPHCMS_PREVIEW_POST_SECRET not set");
}

if (!process.env.PREVIEW_MODE_MAX_AGE) {
  throw new Error("PREVIEW_MODE_MAX_AGE not set");
}

const GRAPHCMS_PROJECT_API = process.env.GRAPHCMS_PROJECT_API;
const GRAPHCMS_PROD_AUTH_TOKEN = process.env.GRAPHCMS_PROD_AUTH_TOKEN;
const GRAPHCMS_DEV_AUTH_TOKEN = process.env.GRAPHCMS_DEV_AUTH_TOKEN;
const GRAPHCMS_PREVIEW_POST_SECRET = process.env.GRAPHCMS_PREVIEW_POST_SECRET;
const PREVIEW_MODE_MAX_AGE = Number(process.env.PREVIEW_MODE_MAX_AGE);

if (Number.isNaN(PREVIEW_MODE_MAX_AGE)) {
  throw new Error("failed to parse PREVIEW_MODE_MAX_AGE");
}

export {
  GRAPHCMS_PROJECT_API,
  GRAPHCMS_PROD_AUTH_TOKEN,
  GRAPHCMS_DEV_AUTH_TOKEN,
  GRAPHCMS_PREVIEW_POST_SECRET,
  PREVIEW_MODE_MAX_AGE,
};
