export const USER_QUERIES = {
  ensureUser: `
    INSERT INTO users (discord_id)
    VALUES (?)
    ON CONFLICT(discord_id) DO NOTHING;
  `,

  getUserByDiscordId: `
    SELECT id, discord_id, baleh_bucks
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
};
