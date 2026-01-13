export const CARD_MARKET_QUERIES = {
  getAllUserCards: `
    SELECT image_id, rarity, quantity
    FROM user_cards
  `,
};