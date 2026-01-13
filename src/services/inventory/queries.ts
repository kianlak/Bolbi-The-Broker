export const INVENTORY_QUERIES = {
  addItem: `
    INSERT INTO user_inventory (discord_id, item_id, quantity)
    VALUES (?, ?, ?)
    ON CONFLICT(discord_id, item_id)
    DO UPDATE SET quantity = quantity + excluded.quantity
  `,

  getInventory: `
    SELECT
      item_id,
      quantity
    FROM user_inventory
    WHERE discord_id = ?
  `,
};