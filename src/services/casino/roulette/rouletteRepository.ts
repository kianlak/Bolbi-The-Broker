import { getDb } from "../../../database/sqlite.ts";
import { ROULETTE_QUERIES } from "./queries.ts";
import type { RouletteProfileStats } from "../../../commands/commandOptions/profile/types/RouletteProfileStats.ts";

export class RouletteRepository {
  updateUserBalance(discordId: string, amount: number): void {
    const db = getDb();

    if (amount > 0) {
      db.prepare(ROULETTE_QUERIES.addBalance).run(amount, discordId);
    } else {
      db.prepare(ROULETTE_QUERIES.subtractBalance).run(
        Math.abs(amount),
        discordId
      );
    }
  }

  upsertRouletteStats(data: {
    discordId: string;
    spinsPlayed: number;
    balehBucksWon: number;
    balehBucksLost: number;
    betsWon: number;
    betsLost: number;
    largestWin: number;
    largestLoss: number;
  }): void {
    const db = getDb();

    db.prepare(ROULETTE_QUERIES.upsertRouletteStats).run(
      data.discordId,
      data.spinsPlayed,
      data.balehBucksWon,
      data.balehBucksLost,
      data.betsWon,
      data.betsLost,
      data.largestWin,
      data.largestLoss
    );
  }

  incrementSpinNumber(discordId: string, roll: number): void {
    const db = getDb();

    db.prepare(ROULETTE_QUERIES.incrementSpinNumber).run(
      discordId,
      roll
    );
  }

  getStats(
    discordId: string
  ): RouletteProfileStats | null {
    const db = getDb();

    return db
      .prepare(ROULETTE_QUERIES.getRouletteStats)
      .get(discordId) as RouletteProfileStats | null;
  }

  incrementBetStat(
    discordId: string,
    game: string,
    betType: string,
    betKey: string,
    outcome: 'WIN' | 'LOSS'
  ) {
    const db = getDb();

    db.prepare(ROULETTE_QUERIES.incrementBetStat)
    .run(discordId, game, betType, betKey, outcome);
  }

  getRouletteBetTypeStats(
    discordId: string
  ): Array<{
    bet_type: string;
    bet_key: string;
    outcome: 'WIN' | 'LOSS';
    total: number;
  }> {
    const db = getDb();

    return db
      .prepare(
        ROULETTE_QUERIES.getRouletteBetTypeStats
      )
      .all(discordId) as Array<{
        bet_type: string;
        bet_key: string;
        outcome: 'WIN' | 'LOSS';
        total: number;
      }>;
  }
}
