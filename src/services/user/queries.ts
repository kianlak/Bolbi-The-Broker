export const USER_QUERIES = {
  ensureUser: `
    INSERT INTO users (discord_id)
    VALUES (?)
    ON CONFLICT(discord_id) DO NOTHING
    RETURNING discord_id;
  `,

  getLastBegAtByDiscordId: `
    SELECT last_beg_at
    FROM users
    WHERE discord_id = ?;
  `,

  addBalehBucksByDiscordId: `
    UPDATE users
    SET baleh_bucks = baleh_bucks + ?
    WHERE discord_id = ?;
  `,

  subtractBalehBucksByDiscordId: `
    UPDATE users
    SET baleh_bucks = baleh_bucks - ?
    WHERE discord_id = ?;
  `,

  updateLastBegAtByDiscordId: `
    UPDATE users
    SET last_beg_at = ?
    WHERE discord_id = ?;
  `,

  incrementNumberOfBegsByDiscordId: `
    UPDATE users
    SET number_of_begs = number_of_begs + 1
    WHERE discord_id = ?;
  `,

  incrementBegProfitByDiscordId: `
    UPDATE users
    SET beg_profit = beg_profit + ?
    WHERE discord_id = ?;
  `,

  getUserByDiscordId: `
    SELECT 
      id, 
      discord_id, 
      baleh_bucks, 
      last_beg_at,
      number_of_begs,
      beg_profit,
      number_cards_collected
    FROM users
    WHERE discord_id = ?;
  `,

  getBalehBucksByDiscordId: `
    SELECT baleh_bucks
    FROM users
    WHERE discord_id = ?;
  `,

  incrementNumberOfCardsCollected: `
    UPDATE users
    SET number_cards_collected = number_cards_collected + ?
    WHERE discord_id = ?
  `,

  getNumberOfCardsCollectedByDiscordId: `
    SELECT number_cards_collected
    FROM users
    WHERE discord_id = ?
  `,
};
