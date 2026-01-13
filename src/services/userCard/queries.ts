export const USER_CARDS_QUERIES = {
  addUserCard: `
    INSERT INTO user_cards
      (discord_id, pack_id, image_id, rarity, quantity, card_id)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(discord_id, image_id)
    DO UPDATE SET quantity = quantity + excluded.quantity
  `,

  getUserCardsByDiscordId: `
    SELECT
      pack_id,
      image_id,
      rarity,
      quantity,
      card_id
    FROM user_cards
    WHERE discord_id = ?
    ORDER BY pack_id, rarity
  `,

  getUserCardsByPack: `
    SELECT
      pack_id,
      image_id,
      rarity,
      quantity,
      card_id
    FROM user_cards
    WHERE discord_id = ?
      AND pack_id = ?
    ORDER BY image_id
  `,

  getOwnedPacksByDiscordId: `
    SELECT DISTINCT pack_id
    FROM user_cards
    WHERE discord_id = ?
    ORDER BY pack_id
  `,

  getUserCardByCardId: `
    SELECT
      pack_id,
      image_id,
      rarity,
      card_id,
      quantity
    FROM user_cards
    WHERE card_id = ?
  `,
};
