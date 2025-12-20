import { ModalSubmitInteraction } from 'discord.js';
import { UserService } from '../../../../helper/services/UserService/userService.ts';
import { getOrCreateSession } from '../rouletteSession.ts';
import { showRouletteDashboard } from '../showRouletteDashboard.ts';


const TABLE_LIMIT = 100_000;
const userService = new UserService();

export async function handleRouletteWagerSubmit(
  interaction: ModalSubmitInteraction
): Promise<void> {
  const [, , category, target, ownerId] =
    interaction.customId.split(':');

  // 🔒 Ownership check
  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }

  // 🔢 Parse wager input (strict)
  const raw = interaction.fields.getTextInputValue('amount').trim();

  if (!/^\d+$/.test(raw)) {
    await interaction.reply({
      content: '❌ Wager must be a whole number.',
      ephemeral: true,
    });
    return;
  }

  const amount = Number(raw);

  if (amount <= 0) {
    await interaction.reply({
      content: '❌ Wager must be greater than 0.',
      ephemeral: true,
    });
    return;
  }

  if (amount > TABLE_LIMIT) {
    await interaction.reply({
      content:
        `❌ Table limit is **${TABLE_LIMIT.toLocaleString()} Baleh Bucks**.`,
      ephemeral: true,
    });
    return;
  }

  // 💰 Balance lookup
  userService.ensureUser(ownerId);
  const balance = userService.getBalanceByDiscordId(ownerId);

  // 🎯 Session + committed bets
  const session = getOrCreateSession(ownerId);

  const currentCommitted = session.bets.reduce(
    (sum, bet) => sum + bet.amount,
    0
  );

  const remaining = balance - currentCommitted;

  if (amount > remaining) {
    await interaction.reply({
      content:
        `❌ Insufficient funds for this bet.\n\n` +
        `**Balance:** ${balance.toLocaleString()}\n` +
        `**Already wagered:** ${currentCommitted.toLocaleString()}\n` +
        `**Remaining:** ${remaining.toLocaleString()}`,
      ephemeral: true,
    });
    return;
  }

  // ✅ Commit / merge bet
  const existing = session.bets.find(
    b =>
      b.category === category &&
      String(b.target) === String(target)
  );

  if (existing) {
    existing.amount += amount;
  } else {
    session.bets.push({
      category: category as any,
      target: target as any,
      amount,
    });
  }

  // 🔄 Refresh dashboard
  await showRouletteDashboard(interaction);
}
