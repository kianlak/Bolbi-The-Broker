export const ROULETTE_STATS_QUERIES = {
  createUserRouletteStats: `
    INSERT INTO roulette_stats (discord_id)
    VALUES (?)
    ON CONFLICT(discord_id) DO NOTHING
  `,

  getRouletteStatsByDiscordId: `
    SELECT
      spins_played,
      baleh_bucks_won,
      baleh_bucks_lost,
      (baleh_bucks_won - baleh_bucks_lost) AS net_profit,
      largest_win,
      largest_loss,
      bets_won,
      bets_lost
    FROM roulette_stats
    WHERE discord_id = ?
  `,

  updateRouletteStatsByDiscordId: `
    UPDATE roulette_stats
    SET
      spins_played = spins_played + 1,
      baleh_bucks_won  = baleh_bucks_won  + ?,
      baleh_bucks_lost = baleh_bucks_lost + ?,
      largest_win  = MAX(largest_win, ?),
      largest_loss = MAX(largest_loss, ?)
    WHERE discord_id = ?;
  `,
};
