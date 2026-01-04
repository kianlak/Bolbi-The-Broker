import type { CasinoGameType } from "./CasinoGameType.ts";

export type CasinoSession = {
  sessionId: string;
  game: CasinoGameType | null;
  lobbyMessageId?: string;
  activeMessageId?: string;
  isComplete: boolean;
};
