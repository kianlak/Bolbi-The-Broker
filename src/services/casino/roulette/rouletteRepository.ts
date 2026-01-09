import { getDb } from "../../../database/sqlite.ts";
import { ROULETTE_QUERIES } from "./queries.ts";


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

  incrementBetStat(
    discordId: string,
    game: string,
    betType: string,
    betKey: string,
    outcome: 'WIN' | 'LOSS'
  ) {
    const db = getDb();

    db.prepare(`
      INSERT INTO casino_game_stats (
        discord_id,
        game,
        bet_type,
        bet_key,
        outcome,
        count
      )
      VALUES (?, ?, ?, ?, ?, 1)
      ON CONFLICT(discord_id, game, bet_type, bet_key, outcome)
      DO UPDATE SET count = count + 1;
    `).run(discordId, game, betType, betKey, outcome);
  }
}
