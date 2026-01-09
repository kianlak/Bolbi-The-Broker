export const ROULETTE_QUERIES = {
  addBalance: `
    UPDATE users
    SET baleh_bucks = baleh_bucks + ?
    WHERE discord_id = ?;
  `,

  subtractBalance: `
    UPDATE users
    SET baleh_bucks = baleh_bucks - ?
    WHERE discord_id = ?;
  `,

  upsertRouletteStats: `
    INSERT INTO roulette_stats (
      discord_id,
      spins_played,
      baleh_bucks_won,
      baleh_bucks_lost,
      bets_won,
      bets_lost,
      largest_win,
      largest_loss
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (discord_id) DO UPDATE SET
      spins_played = spins_played + 1,
      baleh_bucks_won = baleh_bucks_won + excluded.baleh_bucks_won,
      baleh_bucks_lost = baleh_bucks_lost + excluded.baleh_bucks_lost,
      bets_won = bets_won + excluded.bets_won,
      bets_lost = bets_lost + excluded.bets_lost,
      largest_win = MAX(largest_win, excluded.largest_win),
      largest_loss = MAX(largest_loss, excluded.largest_loss);
  `,

  incrementSpinNumber: `
    INSERT INTO roulette_spin_stats (discord_id, spin_number, count)
    VALUES (?, ?, 1)
    ON CONFLICT (discord_id, spin_number)
    DO UPDATE SET count = count + 1;
  `,

  incrementBetStat: `
    INSERT INTO casino_game_stats (
      discord_id,
      game,
      bet_type,
      bet_key,
      count
    )
    VALUES (?, ?, ?, ?, 1)
    ON CONFLICT (discord_id, game, stat_type, stat_key)
    DO UPDATE SET count = count + 1;
  `,
};
