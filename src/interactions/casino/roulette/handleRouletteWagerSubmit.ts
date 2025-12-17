import { ModalSubmitInteraction } from 'discord.js';
import { getOrCreateSession } from './rouletteSession.ts';
import { showRouletteDashboard } from './showRouletteDashboard.ts';

export async function handleWagerSubmit(
  interaction: ModalSubmitInteraction
): Promise<void> {
  const [, , category, target, ownerId] =
    interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }

  const amountRaw =
    interaction.fields.getTextInputValue('amount');
  const amount = Number(amountRaw);

  if (!Number.isFinite(amount) || amount <= 0) {
    await interaction.reply({
      content: '❌ Invalid wager amount.',
      ephemeral: true,
    });
    return;
  }

  const session = getOrCreateSession(ownerId);

  const existingBet = session.bets.find(
    bet =>
      bet.category === category &&
      String(bet.target) === String(target)
  );

  if (existingBet) {
    existingBet.amount += amount;
  } else {
    // ➕ New bet
    session.bets.push({
      category: category as any,
      target: target as any,
      amount,
    });
  }


  await showRouletteDashboard(interaction);

  return;
}
