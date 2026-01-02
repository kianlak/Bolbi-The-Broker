import { MessageFlags, type StringSelectMenuInteraction } from 'discord.js';

import { logger } from '../../../../shared/logger.ts';

import { profileRenderRouter } from '../profileRenderRouter.ts';
import { buildProfileDropdownSelection } from '../ui/buildProfileDropdownSelection.ts';
import { buildProfileContextFromUser } from '../data/buildProfileContextFromUserId.ts';
import { buildProfileContextForTarget } from '../data/buildProfileContestForTarget.ts';

import type { ProfilePage } from '../types/ProfilePage.ts';
import type { UserContext } from '../../../../types/UserContext.ts';
import type { ProfileContext } from '../types/ProfileContext.ts';

export async function handleProfileMenu(interaction: StringSelectMenuInteraction) {
  try {
    const [, , viewerId, targetId] = interaction.customId.split(':');
    
    if (interaction.user.id !== viewerId) {
      await interaction.reply({
        content: '❌ **This profile menu is not yours**',
        flags: MessageFlags.Ephemeral
      });
      return;
    }
    
    const viewer: UserContext = { 
      id: interaction.user.id, 
      username: interaction.user.username 
    };
  
    const page = interaction.values[0] as ProfilePage;
  
    const profileContext: ProfileContext | null =
      viewerId === targetId
        ? await buildProfileContextFromUser(interaction.user)
        : await buildProfileContextForTarget(interaction.client, targetId);
  
    if (!profileContext) {
      await interaction.reply({
        content: '❌ **User profile not found**',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
  
    const menuRow = buildProfileDropdownSelection(viewerId, targetId);
    const embed = await profileRenderRouter(page, profileContext, viewer);
  
    if (!embed) {
      await interaction.reply({
        content: '❌ **No profile data found**',
        ephemeral: true,
      });
      return;
    }
  
    await interaction.update({
      embeds: [embed],
      components: [menuRow],
    });
  
    logger.success(`[${viewer.username}] User has loaded [${profileContext.user.username}] main profile`);
  } catch(error) {
    logger.error(`[${interaction.user.id}] Command "profile" has failed with `, error);
  }
}
