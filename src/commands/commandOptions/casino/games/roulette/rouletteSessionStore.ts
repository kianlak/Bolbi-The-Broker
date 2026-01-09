import type { RouletteBet } from './types/RouletteBet.ts';
import type { RouletteSessionState } from './types/RouletteSessionState.ts';

const rouletteSessions = new Map<string, RouletteSessionState>();

export function getRouletteState(
  sessionId: string
): RouletteSessionState {
  const existing = rouletteSessions.get(sessionId);
  if (existing) return existing;

  const created: RouletteSessionState = {
    bets: [],
    reserved: 0,
  };

  rouletteSessions.set(sessionId, created);
  return created;
}

export function deleteRouletteState(sessionId: string): void {
  rouletteSessions.delete(sessionId);
}

export function addOrStackRouletteBet(
  sessionId: string,
  bet: RouletteBet
): void {
  const state = getRouletteState(sessionId);

  const existing = state.bets.find(
    b =>
      b.category === bet.category &&
      b.selection === bet.selection
  );

  if (existing) existing.amount += bet.amount;
  else state.bets.push(bet);

  state.reserved += bet.amount;
}
