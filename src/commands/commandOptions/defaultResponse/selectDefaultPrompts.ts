import { BOLBI_STAND_CHANNEL_ID, THANOS_CASINO_CHANNEL_ID } from "../../../config/channels.ts";
import { BOLBI_DEFAULT_RESPONSES } from "./prompts/bolbiDefaultResponses.ts";
import { THANOS_DEFAULT_RESPONSES } from "./prompts/thanosDefaultResponses.ts";

import { randomMessagePrompt } from "../../../helper/randomMessagePrompt.ts";

export function selectDefaultPrompt(channelId: string): string {
  switch (channelId) {
    case BOLBI_STAND_CHANNEL_ID:
      return randomMessagePrompt(BOLBI_DEFAULT_RESPONSES);

    case THANOS_CASINO_CHANNEL_ID:
      return randomMessagePrompt(THANOS_DEFAULT_RESPONSES);

    default:
      return randomMessagePrompt(BOLBI_DEFAULT_RESPONSES);
  }
}
