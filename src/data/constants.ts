export const BEG_COOLDOWN_MS = 2 * 60 * 60 * 1000; // 2 hours

export const ALLOWED_CHANNELS = new Set(
  [
    process.env.DISCORD_MAIN_CHANNEL_ID,
    process.env.DISCORD_DEV_TEST_CHANNEL_ID,
  ].filter(Boolean)
);