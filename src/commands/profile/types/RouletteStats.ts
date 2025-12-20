export type RouletteStats = {
  spins_played: number;
  baleh_bucks_won: number;
  baleh_bucks_lost: number;
  largest_win: number;
  largest_loss: number;
  bets_won: number;
  bets_lost: number;

  wins_by_target: Record<string, number>;
  losses_by_target: Record<string, number>;
  number_bet_wins?: Record<number, number>;
  result_number_wins?: Record<number, number>;
  result_number_losses?: Record<number, number>;
};