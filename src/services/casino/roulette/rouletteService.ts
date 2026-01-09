import { getDb } from "../../../database/sqlite.ts";
import { RouletteRepository } from "./rouletteRepository.ts";
import type { RouletteSpinResult } from "../../../commands/commandOptions/casino/games/roulette/helper/calculateRouletteResults.ts";


export class RouletteService {
  private readonly repo: RouletteRepository;

  constructor(repo?: RouletteRepository) {
    this.repo = repo ?? new RouletteRepository();
  }

  applySpinResult(discordId: string, result: RouletteSpinResult): void {
    const db = getDb();

    db.transaction(() => {
      this.applyBalance(discordId, result);
      this.applyAggregateStats(discordId, result);
      this.applySpinNumber(discordId, result.roll);
      this.applyBetStats(discordId, result);
    })();
  }

  private applyBalance(discordId: string, result: RouletteSpinResult) {
    if (result.netProfit !== 0) {
      this.repo.updateUserBalance(discordId, result.netProfit);
    }
  }

  private applyAggregateStats(
    discordId: string,
    result: RouletteSpinResult
  ) {
    const betsWon = result.betResults.filter(b => b.won).length;
    const betsLost = result.betResults.length - betsWon;

    const wonAmount = result.betResults
      .filter(b => b.won)
      .reduce((s, b) => s + b.profit, 0);

    const lostAmount = result.betResults
      .filter(b => !b.won)
      .reduce((s, b) => s + Math.abs(b.profit), 0);

    this.repo.upsertRouletteStats({
      discordId,
      spinsPlayed: 1,
      balehBucksWon: wonAmount,
      balehBucksLost: lostAmount,
      betsWon,
      betsLost,
      largestWin: wonAmount,
      largestLoss: lostAmount,
    });
  }

  private applySpinNumber(discordId: string, roll: number) {
    this.repo.incrementSpinNumber(discordId, roll);
  }

  private applyBetStats(
    discordId: string,
    result: RouletteSpinResult
  ) {
    for (const res of result.betResults) {
      this.repo.incrementBetStat(
        discordId,
        'ROULETTE',
        res.bet.category,
        res.bet.selection,
        res.won ? 'WIN' : 'LOSS'
      );
    }
  }
}
