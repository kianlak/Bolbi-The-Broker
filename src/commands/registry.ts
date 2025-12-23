import { CASINO_CHANNEL_ID } from '../data/constants/constants.ts';

import { beg } from '../commandsOLD/beg/beg.ts';
import { casino } from '../commandsOLD/casino/casino.ts';
import { profile } from '../commandsOLD/profile/profile.ts';

import type { CommandDefinition } from './types.ts';

export const COMMANDS: Record<string, CommandDefinition> = {
  beg: {
    execute: beg,
    usage: '+beg',
  },

  profile: {
    execute: profile,
    maxArgs: 1,
    usage: '+profile //Info about what maxArgs can be',
  },

  casino: {
    execute: casino,
    allowedChannelId: CASINO_CHANNEL_ID,
    usage: '+casino',
  },
};
