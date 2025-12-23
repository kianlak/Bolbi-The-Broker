import { ROULETTE_STATS_QUERIES } from "./queries.ts";

import { logger } from "../../../shared/logger.ts";

import { getDb } from "../../../database/sqlite.ts";

const GAME = "ROULETTE";

export type RouletteStatsDelta = {
  spins_played: number;

  baleh_bucks_won: number;
  baleh_bucks_lost: number;

  largest_win: number;
  largest_loss: number;

  bets_won: number;
  bets_lost: number;

  wins_by_category: Record<string, number>;
  losses_by_category: Record<string, number>;

  wins_by_target: Record<string, number>;
  losses_by_target: Record<string, number>;

  wins_by_result_number: Record<number, number>;
  losses_by_result_number: Record<number, number>;
};

export type RouletteStatsSummary = {
  spins_played: number;
  baleh_bucks_won: number;
  baleh_bucks_lost: number;
  net_profit: number;
  largest_win: number;
  largest_loss: number;
  bets_won: number;
  bets_lost: number;
};

export type RouletteStatsCounters = {
  wins_by_target: Record<string, number>;
  losses_by_target: Record<string, number>;
  result_number_wins: Record<number, number>;
  result_number_losses: Record<number, number>;
};

export class RouletteStatsService {
  createUserRouletteStats(discordId: string): boolean {
    logger.info('Ensuring: Creation of user\'s RouletteStats');
    
    if (!discordId) throw new Error('discordId is required to ensure roulette stats');

    const db = getDb();
    const result = db.prepare(ROULETTE_STATS_QUERIES.createUserRouletteStats).run(discordId);

    return !!result;
  }
  
  getSummaryByDiscordId(discordId: string): RouletteStatsSummary | null {
    const db = getDb();

    const row = db.prepare(`
      SELECT
        spins_played,
        baleh_bucks_won,
        baleh_bucks_lost,
        largest_win,
        largest_loss,
        bets_won,
        bets_lost
      FROM roulette_stats
      WHERE discord_id = ?
    `).get(discordId) as RouletteStatsSummary | undefined;

    return row ?? null;
  }

  /* ───────────────────────── COUNTERS ───────────────────────── */

  getCountersByDiscordId(
    discordId: string
  ): RouletteStatsCounters {
    const db = getDb();

    const rows = db.prepare(`
      SELECT stat_type, stat_key, count
      FROM casino_game_stats
      WHERE discord_id = ?
        AND game = ?
    `).all(discordId, GAME) as {
      stat_type: string;
      stat_key: string;
      count: number;
    }[];

    const wins_by_target: Record<string, number> = {};
    const losses_by_target: Record<string, number> = {};
    const result_number_wins: Record<number, number> = {};
    const result_number_losses: Record<number, number> = {};

    for (const row of rows) {
      const { stat_type, stat_key, count } = row;

      // COLOR / EVEN_ODD / NUMBER bet outcomes
      if (stat_type.endsWith("_WIN")) {
        if (stat_type === "RESULT_NUMBER_WIN") {
          result_number_wins[Number(stat_key)] = count;
        } else {
          wins_by_target[`${stat_type.replace("_WIN", "")}:${stat_key}`] = count;
        }
      }

      if (stat_type.endsWith("_LOSS")) {
        if (stat_type === "RESULT_NUMBER_LOSS") {
          result_number_losses[Number(stat_key)] = count;
        } else {
          losses_by_target[`${stat_type.replace("_LOSS", "")}:${stat_key}`] = count;
        }
      }
    }

    return {
      wins_by_target,
      losses_by_target,
      result_number_wins,
      result_number_losses,
    };
  }

  /* ───────────────────────── CONVENIENCE ───────────────────────── */

  /**
   * Single call used by profile rendering
   */
  getFullStatsByDiscordId(discordId: string) {
    const summary = this.getSummaryByDiscordId(discordId);
    const counters = this.getCountersByDiscordId(discordId);

    if (!summary) return null;

    return {
      ...summary,
      ...counters,
    };
  }

  /* ───────────────────────── SPECIFIC QUERIES ───────────────────────── */

  /**
   * 🎯 Most rolled (winning) number
   */
  getMostRolledWinningNumber(discordId: string): {
    number: number;
    wins: number;
  } | null {
    const db = getDb();

    const row = db.prepare(`
      SELECT stat_key, SUM(count) AS total
      FROM casino_game_stats
      WHERE discord_id = ?
        AND game = ?
        AND stat_type IN (
          'RESULT_NUMBER_WIN',
          'RESULT_NUMBER_LOSS'
        )
      GROUP BY stat_key
      ORDER BY count DESC
      LIMIT 1
    `).get(discordId, GAME) as
      | { stat_key: string; count: number }
      | undefined;

    if (!row) return null;

    return {
      number: Number(row.stat_key),
      wins: row.count,
    };
  }

  recordSpin(discordId: string, delta: RouletteStatsDelta) {
    this.updateSummary(discordId, delta);
    this.updateCounters(discordId, delta);
  }

  private updateSummary(discordId: string, d: RouletteStatsDelta) {
    const db = getDb();

    db.prepare(`
      UPDATE roulette_stats
      SET
        spins_played = spins_played + ?,

        baleh_bucks_won = baleh_bucks_won + ?,
        baleh_bucks_lost = baleh_bucks_lost + ?,

        largest_win = MAX(largest_win, ?),
        largest_loss = MAX(largest_loss, ?),

        bets_won = bets_won + ?,
        bets_lost = bets_lost + ?
      WHERE discord_id = ?
    `).run(
      d.spins_played,

      d.baleh_bucks_won,
      d.baleh_bucks_lost,

      d.largest_win,
      d.largest_loss,

      d.bets_won,
      d.bets_lost,

      discordId
    );
  }

  private updateCounters(discordId: string, d: RouletteStatsDelta) {
    const db = getDb();

    const insert = db.prepare(`
      INSERT INTO casino_game_stats
        (game, discord_id, stat_type, stat_key, count)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(game, discord_id, stat_type, stat_key)
      DO UPDATE SET count = count + excluded.count
    `);

    const tx = db.transaction(() => {
      this.insertStatGroup(insert, discordId, "CATEGORY_WIN", d.wins_by_category);
      this.insertStatGroup(insert, discordId, "CATEGORY_LOSS", d.losses_by_category);

      this.insertTargetGroup(insert, discordId, d.wins_by_target, "_WIN");
      this.insertTargetGroup(insert, discordId, d.losses_by_target, "_LOSS");

      this.insertNumberGroup(insert, discordId, "RESULT_NUMBER_WIN", d.wins_by_result_number);
      this.insertNumberGroup(insert, discordId, "RESULT_NUMBER_LOSS", d.losses_by_result_number);
    });

    tx();
  }

  private insertStatGroup(
    insert: any,
    discordId: string,
    statType: string,
    stats: Record<string, number>
  ) {
    for (const [key, count] of Object.entries(stats)) {
      insert.run(GAME, discordId, statType, key, count);
    }
  }

  private insertTargetGroup(
    insert: any,
    discordId: string,
    stats: Record<string, number>,
    suffix: "_WIN" | "_LOSS"
  ) {
    for (const [key, count] of Object.entries(stats)) {
      const [category, target] = key.split(":");

      insert.run(
        GAME,
        discordId,
        `${category}${suffix}`,
        target,
        count
      );
    }
  }

  private insertNumberGroup(
    insert: any,
    discordId: string,
    statType: string,
    stats: Record<number, number>
  ) {
    for (const [number, count] of Object.entries(stats)) {
      insert.run(GAME, discordId, statType, number, count);
    }
  }
}
