import type { RouletteBetTarget } from './betTargets.ts';
import type { RouletteBetCategory } from './types/RouletteBetCategory.ts';

export type RouletteBet = {
  category: RouletteBetCategory;
  target: RouletteBetTarget;
  amount: number;
  
};

export type RouletteSession = {
  userId: string;
  bets: RouletteBet[];
  messageId?: string;
};

const sessions = new Map<string, RouletteSession>();

export function getOrCreateSession(userId: string): RouletteSession {
  let session = sessions.get(userId);

  if (!session) {
    session = {
      userId,
      bets: [],
    };
    sessions.set(userId, session);
  }

  return session;
}

export function deleteSession(userId: string) {
  sessions.delete(userId);
}