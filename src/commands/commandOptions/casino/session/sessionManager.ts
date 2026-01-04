import crypto from 'crypto';

import type { CasinoGameType } from "../types/CasinoGameType.ts";
import type { CasinoSession } from "../types/CasinoSession.ts";

const sessions = new Map<string, CasinoSession>();

function generateSessionId(): string {
  return crypto.randomBytes(4).toString('hex');
}

export function getSession(userId: string): CasinoSession | undefined {
  return sessions.get(userId);
}

export function createSession(userId: string): CasinoSession {
  const session: CasinoSession = {
    game: null,
    sessionId: generateSessionId(),
    isComplete: false,
  };

  sessions.set(userId, session);
  return session;
}

export function deleteSession(userId: string): void {
  sessions.delete(userId);
}

export function setGame(userId: string, game: CasinoGameType | null): void {
  const session = sessions.get(userId);
  if (!session) return;

  session.game = game;
}

export function setLobbyMessageId(userId: string, messageId: string): void {
  const session = sessions.get(userId);
  if (!session) return;

  session.lobbyMessageId = messageId;
}

export function setActiveMessageId(userId: string, messageId: string): void {
  const session = sessions.get(userId);
  if (!session) return;

  session.activeMessageId = messageId;
}

export function completed(userId: string): void {
  const session = sessions.get(userId);
  if (!session) return;

  session.isComplete = true;
}