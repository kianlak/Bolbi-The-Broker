export const DEV_TEST_CHANNEL_ID = process.env.DISCORD_DEV_TEST_CHANNEL_ID;
export const BOLBI_STAND_CHANNEL_ID = process.env.DISCORD_BOLBI_STAND_CHANNEL_ID;
export const THANOS_CASINO_CHANNEL_ID = process.env.DISCORD_THANOS_CASINO_CHANNEL_ID;

export const VALID_CHANNELS = {
  DEV_TEST: DEV_TEST_CHANNEL_ID,
  BOLBI_STAND: BOLBI_STAND_CHANNEL_ID,
  THANOS_CASINO: THANOS_CASINO_CHANNEL_ID,
} as const;

export type ChannelKey = keyof typeof VALID_CHANNELS;

export const VALID_CHANNEL_IDS = new Set(
  Object.values(VALID_CHANNELS).filter(
    (id): id is string => typeof id === 'string'
  )
);