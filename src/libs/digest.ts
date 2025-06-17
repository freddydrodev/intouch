import DigestFetch from "digest-fetch";

export const digest = new DigestFetch(
  process.env.INTOUCH_CI_USERNAME,
  process.env.INTOUCH_CI_PASSWORD
);
