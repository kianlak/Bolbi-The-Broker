import { DEV_TEST_CHANNEL_ID, THANOS_CASINO_CHANNEL_ID } from '../../config/channels.ts';

import { beg } from '../commandOptions/beg/beg.ts';
import { binder } from '../commandOptions/binder/binder.ts';
import { casino } from '../commandOptions/casino/casino.ts';
import { inventory } from '../commandOptions/inventory/inventory.ts';
import { profile } from '../commandOptions/profile/profile.ts';
import { use } from '../commandOptions/use/use.ts';

import type { CommandInfo } from '../types/CommandInfo.ts';

export const COMMAND_INFO: Record<string, CommandInfo> = {
  beg: {
    execute: beg,
    usage: '+beg',
    description: 'Beg in different locations to earn anywhere from 0-100 Baleh Bucks (2hr cooldown)',
    maxArgs: 0,
  },

  profile: {
    execute: profile,
    usage: '+profile | <Discord ID>',
    description: 'View your profile information or other users',
    maxArgs: 1,
  },

  casino: {
    execute: casino,
    usage: '+casino',
    description: 'Enter the casino to play the available games',
    allowedChannelId: THANOS_CASINO_CHANNEL_ID,
    maxArgs: 0,
  },

  inventory: {
    execute: inventory,
    usage: '+inventory',
    description: 'View your inventory',
    maxArgs: 1,
  },

  use: {
    execute: use,
    usage: '+use',
    description: 'Use a specific item',
    minArgs: 1,
  },

  binder: {
    execute: binder,
    usage: '+binder',
    description: 'View cards collected across packs',
    maxArgs: 2,
  },
};
