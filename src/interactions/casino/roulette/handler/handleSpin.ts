import { ButtonInteraction } from 'discord.js';
import { deleteSession, getOrCreateSession } from '../rouletteSession.ts';
import { spinWheel } from '../engine/spinWheel.ts';
import { resolveBets } from '../engine/resolveBets.ts';
import { buildSpinResultEmbed } from '../data/buildSpinResultEmbed.ts';
import { buildPostRoundActions } from '../data/buildPostRoundActions.ts';
import { RouletteStatsService } from '../../../../services/casino/roulette/rouletteService.ts';
import { UserService } from '../../../../services/user/userService.ts';


const userService = new UserService();

export async function handleSpin(
  interaction: ButtonInteraction
): Promise<void> {
  const [, , ownerId] = interaction.customId.split(':');

  // Ownership check
  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }

  const session = getOrCreateSession(ownerId);
  const rouletteStatsService = new RouletteStatsService();

  if (session.bets.length === 0) {
    await interaction.reply({
      content: '❌ You have no bets placed.',
      ephemeral: true,
    });
    return;
  }

  const totalWager = session.bets.reduce(
    (sum, bet) => sum + bet.amount,
    0
  );

  userService.subtractBalehBucks(ownerId, totalWager);

  const result = spinWheel();
  const resolved = resolveBets(session.bets, result);



  const totalPayout = resolved.reduce(
    (sum, r) => sum + r.payout,
    0
  );

  if (totalPayout > 0) {
    userService.addBalehBucks(ownerId, totalPayout);
  }


  let balehBucksWon = 0;
  let balehBucksLost = 0;

  for (const r of resolved) {
    if (r.won) {
      balehBucksWon += r.payout;
    } else {
      balehBucksLost += r.bet.amount;
    }
  }

  const net = balehBucksWon - balehBucksLost;


let betsWon = 0;
let betsLost = 0;

const winsByCategory: Record<string, number> = {};
const lossesByCategory: Record<string, number> = {};

const winsByTarget: Record<string, number> = {};
const lossesByTarget: Record<string, number> = {};

for (const r of resolved) {
  const category = r.bet.category;
  const targetKey = `${category}:${r.bet.target}`;

  if (r.won) {
    betsWon++;

    winsByCategory[category] =
      (winsByCategory[category] ?? 0) + 1;

    winsByTarget[targetKey] =
      (winsByTarget[targetKey] ?? 0) + 1;
  } else {
    betsLost++;

    lossesByCategory[category] =
      (lossesByCategory[category] ?? 0) + 1;

    lossesByTarget[targetKey] =
      (lossesByTarget[targetKey] ?? 0) + 1;
  }
}

const winsByResultNumber: Record<number, number> = {};
const lossesByResultNumber: Record<number, number> = {};

let hasWin = false;
let hasLoss = false;

for (const r of resolved) {
  if (r.won) {
    hasWin = true;
  } else {
    hasLoss = true;
  }

  if (hasWin && hasLoss) break;
}

if (hasWin) {
  winsByResultNumber[result] =
    (winsByResultNumber[result] ?? 0) + 1;
}

if (hasLoss) {
  lossesByResultNumber[result] =
    (lossesByResultNumber[result] ?? 0) + 1;
}

  rouletteStatsService.recordSpin(ownerId, {
    spins_played: 1,

    baleh_bucks_won: balehBucksWon,
    baleh_bucks_lost: balehBucksLost,

    largest_win: balehBucksWon,
    largest_loss: balehBucksLost,

    bets_won: betsWon,
    bets_lost: betsLost,

    wins_by_category: winsByCategory,
    losses_by_category: lossesByCategory,

    wins_by_target: winsByTarget,
    losses_by_target: lossesByTarget,

    wins_by_result_number: winsByResultNumber,
    losses_by_result_number: lossesByResultNumber,
  });

  deleteSession(ownerId);

  await interaction.update({
    embeds: [
      buildSpinResultEmbed(
        result, 
        resolved,
        interaction.user.tag,
        interaction.user.displayAvatarURL()
      )
    ],
    components: [
      buildPostRoundActions(ownerId),
    ],
  });
}
