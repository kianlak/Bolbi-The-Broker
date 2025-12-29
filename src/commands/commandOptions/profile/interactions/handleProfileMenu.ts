import { MessageFlags, type StringSelectMenuInteraction } from 'discord.js';
import type { ProfilePage } from '../types/ProfilePage.ts';
import { profileRenderRouter } from '../profileRouter.ts';
import { buildProfileDropdownSelection } from '../data/buildProfileDropdownSelection.ts';
import { buildProfileContextFromUser } from '../data/buildProfileContextFromUserId.ts';
import { buildProfileContextForTarget } from '../data/buildProfileContestForTarget.ts';

export async function handleProfileMenu(interaction: StringSelectMenuInteraction) {
  const [, , viewerId, targetId] = interaction.customId.split(':');

  if (interaction.user.id !== viewerId) {
    await interaction.reply({
      content: '❌ This profile menu is not yours.',
      flags: MessageFlags.Ephemeral
    });
    return;
  }

  const page = interaction.values[0] as ProfilePage;

  const ctx =
    viewerId === targetId
      ? await buildProfileContextFromUser(interaction.user)
      : await buildProfileContextForTarget(
          interaction.client,
          targetId
        );

  if (!ctx) {
    await interaction.reply({
      content: '❌ User profile not found.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const menuRow = buildProfileDropdownSelection(viewerId, targetId);
  const embed = await profileRenderRouter(page, ctx);

  if (!embed) {
    await interaction.reply({
      content: '❌ No profile data found.',
      ephemeral: true,
    });
    return;
  }

  await interaction.update({
    embeds: [embed],
    components: [menuRow],
  });
}
