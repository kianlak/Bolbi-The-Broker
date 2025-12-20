import { Message } from 'discord.js';
import { logger } from '../../shared/logger.ts';
import { buildProfileContext } from './data/buildProfileContext.ts';
import { buildProfileMenu } from './data/buildProfileMenu.ts';
import { renderProfilePage } from './profileRouter.ts';
import type { ProfilePage } from './types/ProfilePage.ts';



export async function profile(message: Message) {
  try {
    const ctx = buildProfileContext(message);
    const menuRow = buildProfileMenu(ctx.userId);

    const reply = await message.reply({
      embeds: [await renderProfilePage('main', ctx)],
      components: [menuRow],
    });

    const collector = reply.createMessageComponentCollector({
      time: 60_000,
    });

    collector.on('collect', async interaction => {
      if (interaction.user.id !== ctx.userId) {
        await interaction.reply({
          content: '❌ This profile is not yours.',
          ephemeral: true,
        });
        return;
      }

      if (!interaction.isStringSelectMenu()) return;

      const page = interaction.values[0] as ProfilePage;

      await interaction.update({
        embeds: [await renderProfilePage(page, ctx)],
        components: [menuRow],
      });
    });

    collector.on('end', async () => {
      menuRow.components[0].setDisabled(true);
      await reply.edit({ components: [menuRow] });
    });

    logger.success(`${ctx.username}'s profile command complete`);
  } catch (error) {
    logger.error(
      `profile command failed:\n\t${(error as Error).message}`
    );
  }
}
