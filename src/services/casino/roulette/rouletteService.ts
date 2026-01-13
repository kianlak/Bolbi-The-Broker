import { getDb } from "../../../database/sqlite.ts";
import { RouletteRepository } from "./rouletteRepository.ts";

import type { RouletteProfileStats } from "../../../commands/commandOptions/profile/types/RouletteProfileStats.ts";
import type { RouletteSpinResult } from "../../../commands/commandOptions/casino/games/roulette/helper/calculateRouletteResults.ts";

type OutcomeTotals = {
  wins: number;
  losses: number;
};

function rate({ wins, losses }: OutcomeTotals): string {
  const total = wins + losses;
  if (total === 0) return '0%';
  return `${Math.round((wins / total) * 100)}%`;
}

function typeMap(
  map: Map<string, Map<string, OutcomeTotals>>,
  type: string,
  key: string
): OutcomeTotals {
  return (
    map.get(type)?.get(key) ?? {
      wins: 0,
      losses: 0,
    }
  );
}

function allKeys(
  map: Map<string, Map<string, OutcomeTotals>>,
  type: string
): OutcomeTotals {
  const entries = map.get(type);
  if (!entries) return { wins: 0, losses: 0 };

  let wins = 0;
  let losses = 0;

  for (const v of entries.values()) {
    wins += v.wins;
    losses += v.losses;
  }

  return { wins, losses };
}

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

  getStats(discordId: string): RouletteProfileStats | null {
    return this.repo.getStats(discordId);
  }

  getBetTypeWinRates(discordId: string) {
    const rows =
      this.repo.getRouletteBetTypeStats(discordId);

    const map = new Map<
      string,
      Map<string, OutcomeTotals>
    >();

    for (const row of rows) {
      if (!map.has(row.bet_type)) {
        map.set(row.bet_type, new Map());
      }

      const typeMap = map.get(row.bet_type)!;

      if (!typeMap.has(row.bet_key)) {
        typeMap.set(row.bet_key, {
          wins: 0,
          losses: 0,
        });
      }

      const entry = typeMap.get(row.bet_key)!;

      if (row.outcome === 'WIN') {
        entry.wins += row.total;
      } else {
        entry.losses += row.total;
      }
    }

    return {
      COLOR: {
        RED: rate(typeMap(map, 'COLOR', 'RED')),
        BLACK: rate(typeMap(map, 'COLOR', 'BLACK')),
      },
      EVEN_ODD: {
        EVEN: rate(typeMap(map, 'EVEN_ODD', 'EVEN')),
        ODD: rate(typeMap(map, 'EVEN_ODD', 'ODD')),
      },
      LOW_HIGH: {
        LOW: rate(typeMap(map, 'LOW_HIGH', 'LOW')),
        HIGH: rate(typeMap(map, 'LOW_HIGH', 'HIGH')),
      },
      DOZEN: {
        FIRST: rate(typeMap(map, 'DOZEN', 'DOZEN_1')),
        SECOND: rate(typeMap(map, 'DOZEN', 'DOZEN_2')),
        THIRD: rate(typeMap(map, 'DOZEN', 'DOZEN_3')),
      },
      COLUMN: {
        FIRST: rate(typeMap(map, 'COLUMN', 'COLUMN_1')),
        SECOND: rate(typeMap(map, 'COLUMN', 'COLUMN_2')),
        THIRD: rate(typeMap(map, 'COLUMN', 'COLUMN_3')),
      },
      OTHER: {
        DOUBLE_STREET: rate(allKeys(map, 'DOUBLE_STREET')),
        TOP_LINE: rate(allKeys(map, 'TOP_LINE')),
        CORNER: rate(allKeys(map, 'CORNER')),
        STREET: rate(allKeys(map, 'STREET')),
        ROW: rate(allKeys(map, 'ROW')),
        SPLIT: rate(allKeys(map, 'SPLIT')),
        SINGLE: rate(allKeys(map, 'SINGLE')),
      },
    };
  }
}
