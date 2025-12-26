import { BOLBI_STAND_CHANNEL_ID, THANOS_CASINO_CHANNEL_ID } from "../../../config/channels.ts";
import { BOLBI_BEG_RESPONSES } from "./prompts/bolbiBegPrompts.ts";
import { THANOS_BEG_RESPONSES } from "./prompts/thanosBegPrompts.ts";

import { selectRandomPrompt } from "../../helper/randomMessagePrompt.ts";

export function selectBegPrompts(channelId: string): string {
  switch (channelId) {
    case BOLBI_STAND_CHANNEL_ID:
      return selectRandomPrompt(BOLBI_BEG_RESPONSES);

    case THANOS_CASINO_CHANNEL_ID:
      return selectRandomPrompt(THANOS_BEG_RESPONSES);

    default:
      return selectRandomPrompt(BOLBI_BEG_RESPONSES);
  }
}
