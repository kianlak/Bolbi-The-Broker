export const USER_QUERIES = {
  ensureUser: `
    INSERT INTO users (discord_id)
    VALUES (?)
    ON CONFLICT(discord_id) DO NOTHING;
  `,

  getUserByDiscordId: `
    SELECT 
      id, 
      discord_id, 
      baleh_bucks, 
      last_beg_at,
      number_of_begs,
      beg_profit
    FROM users
    WHERE discord_id = ?;
  `,

  getLastBegAtByDiscordId: `
    SELECT last_beg_at
    FROM users
    WHERE discord_id = ?;
  `,

  recordBeg: `
    UPDATE users
    SET last_beg_at = ?
    WHERE discord_id = ?;
  `,

  addBalehBucks: `
    UPDATE users
    SET baleh_bucks = baleh_bucks + ?
    WHERE discord_id = ?;
  `,

  getBalehBucksByDiscordId: `
    SELECT baleh_bucks
    FROM users
    WHERE discord_id = ?;
  `,

  incrementNumberOfBegs: `
    UPDATE users
    SET number_of_begs = number_of_begs + 1
    WHERE discord_id = ?;
  `,

  incrementBegProfit: `
    UPDATE users
    SET beg_profit = beg_profit + ?
    WHERE discord_id = ?;
  `,
};
