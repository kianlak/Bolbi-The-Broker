import { THANOS_CASINO_CHANNEL_ID } from '../../config/channels.ts';

import { beg } from '../../commandsOLD/beg/beg.ts';
import { casino } from '../../commandsOLD/casino/casino.ts';
import { profile } from '../../commandsOLD/profile/profile.ts';

import type { CommandInfo } from '../types/types.ts';

export const COMMAND_INFO: Record<string, CommandInfo> = {
  beg: {
    execute: beg,
    usage: '+beg',
  },

  profile: {
    execute: profile,
    usage: '+profile',
  },

  casino: {
    execute: casino,
    allowedChannelId: THANOS_CASINO_CHANNEL_ID,
    usage: '+casino',
  },
};
