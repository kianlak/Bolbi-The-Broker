export const ACHIEVEMENT_QUERIES = {
  getTier: `
    SELECT tier
    FROM user_achievements
    WHERE discord_id = ? AND achievement_id = ?
  `,
  
  setTier: `
    INSERT INTO user_achievements (discord_id, achievement_id, tier)
    VALUES (?, ?, ?)
    ON CONFLICT(discord_id, achievement_id)
    DO UPDATE SET tier = excluded.tier
  `,
};
