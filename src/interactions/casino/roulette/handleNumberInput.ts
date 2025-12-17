import { ModalSubmitInteraction, EmbedBuilder } from 'discord.js';
import { buildConfirmNumberTarget } from './data/buildConfirmNumberTarget.ts';

export async function handleNumberInput(
  interaction: ModalSubmitInteraction
): Promise<void> {
  const [, , ownerId] = interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }

  const raw = interaction.fields
    .getTextInputValue('number')
    .trim();

  const value = raw === '00' ? 37 : Number(raw);

  if (
    !Number.isInteger(value) ||
    value < 0 ||
    value > 37
  ) {
    await interaction.reply({
      content: '❌ Invalid number. Enter 0–36 or 00.',
      ephemeral: true,
    });
    return;
  }

  const embed = new EmbedBuilder()
    .setTitle('🎯 Number Selected')
    .setDescription(
      `You selected **${
        value === 37 ? '00' : value
      }**.\n\nClick below to enter your wager.`
    )
    .setColor(0xf1c40f);

  // ✅ Modal → reply / editReply (NOT showModal)
  await interaction.reply({
    embeds: [embed],
    components: [
      buildConfirmNumberTarget(ownerId, value),
    ],
  });

  return;
}
