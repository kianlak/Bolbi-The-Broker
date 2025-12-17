import type { Interaction } from 'discord.js';

export async function editRouletteMessage(
  interaction: Interaction,
  payload: {
    embeds?: any[];
    components?: any[];
    content?: string;
  }
): Promise<void> {
  // Button / Select menu
  if (interaction.isMessageComponent()) {
    await interaction.update(payload);
    return;
  }

  // Modal submit
  if (interaction.isModalSubmit()) {
    await interaction.deferReply();
    await interaction.editReply(payload);
    return;
  }

  // Entry command
  if (interaction.isChatInputCommand()) {
    await interaction.reply(payload);
    return;
  }
}
