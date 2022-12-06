export const parseEnvs = (envs: typeof process.env) => {
  const { API_URL, PUBLISHED_TOKEN, DRAFT_TOKEN, PREVIEW_SECRET, PREVIEW_MAX_SECONDS } = envs;

  if (!API_URL) {
    throw new Error("API_URL not set");
  }

  if (!PUBLISHED_TOKEN) {
    throw new Error("PUBLISHED_TOKEN not set");
  }

  if (!DRAFT_TOKEN) {
    throw new Error("DRAFT_TOKEN not set");
  }

  if (!PREVIEW_SECRET) {
    throw new Error("PREVIEW_SECRET not set");
  }

  if (!PREVIEW_MAX_SECONDS) {
    throw new Error("PREVIEW_MAX_SECONDS not set");
  }

  const previewMaxSeconds = Number(PREVIEW_MAX_SECONDS);

  if (Number.isNaN(previewMaxSeconds)) {
    throw new Error("failed to parse PREVIEW_MAX_SECONDS");
  }

  return {
    apiUrl: API_URL,
    publishedToken: PUBLISHED_TOKEN,
    draftToken: DRAFT_TOKEN,
    previewSecret: PREVIEW_SECRET,
    previewMaxSeconds,
  };
};
