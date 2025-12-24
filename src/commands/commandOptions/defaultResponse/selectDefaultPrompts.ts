import { BOLBI_STAND_CHANNEL_ID, THANOS_CASINO_CHANNEL_ID } from "../../../config/channels.ts";
import { BOLBI_DEFAULT_RESPONSES } from "./prompts/bolbiDefaultResponses.ts";
import { THANOS_DEFAULT_RESPONSES } from "./prompts/thanosDefaultResponses.ts";

import { selectRandomPrompt } from "../../helper/randomMessagePrompt.ts";

export function selectDefaultPrompt(channelId: string): string {
  switch (channelId) {
    case BOLBI_STAND_CHANNEL_ID:
      return selectRandomPrompt(BOLBI_DEFAULT_RESPONSES);

    case THANOS_CASINO_CHANNEL_ID:
      return selectRandomPrompt(THANOS_DEFAULT_RESPONSES);

    default:
      return selectRandomPrompt(BOLBI_DEFAULT_RESPONSES);
  }
}
