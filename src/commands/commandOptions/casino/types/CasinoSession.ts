import type { CasinoGameType } from "./CasinoGameType.ts";

export type CasinoSession = {
  game: CasinoGameType | null;
  sessionId: string;
  lobbyMessageId?: string;
  activeMessageId?: string;
  isComplete: boolean;
};
