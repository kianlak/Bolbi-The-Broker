export const DEV_TEST_CHANNEL = process.env.DISCORD_DEV_TEST_CHANNEL_ID;
export const BOLBI_STAND_CHANNEL = process.env.DISCORD_BOLBI_STAND_CHANNEL_ID;
export const THANOS_CASINO_CHANNEL = process.env.DISCORD_THANOS_CASINO_CHANNEL_ID;

export const ALLOWED_CHANNELS = new Set(
  [
    process.env.DISCORD_DEV_TEST_CHANNEL_ID,
    process.env.DISCORD_BOLBI_STAND_CHANNEL_ID,
    process.env.DISCORD_THANOS_CASINO_CHANNEL_ID,
  ].filter(Boolean)
);
