import { StringSelectMenuInteraction, MessageFlags, AttachmentBuilder } from 'discord.js';

import { ROULETTE_BET_CATEGORIES } from '../constants/ROULETTE_BET_CATEOGIRES.ts';

import { buildCategoryExplanationEmbed } from '../ui/buildCategoryExplanationEmbed.ts';
import { getSession } from '../../../session/sessionManager.ts';
import { buildFixedChoiceButtons } from '../target/Fixed/ui/buildFixedChoicesButtons.ts';
import { showRouletteNumberModal } from '../target/Number/ui/showRouletteNumberModal.ts';
import { showSplitNumberModal } from '../target/Split/ui/showSplitBaseNumberModal.ts';
import { showRouletteStaticBetAmountModal } from '../target/Static/ui/showRouletteStaticBetAmountModal.ts';
import { buildDropdownTargetMenu } from '../target/Dropdown/ui/buildDropdownTargetMenu.ts';

export async function handleRouletteChooseBet(
  interaction: StringSelectMenuInteraction
) {
  const [, , , ownerId, sessionId] = interaction.customId.split(':');
  const rouletteImage = new AttachmentBuilder('./src/data/img/rouletteTable.png');
  
  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '❌ **Not your menu**',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.reply({
      content: '❌ **Session expired**',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const categoryId = interaction.values[0];
  const config = ROULETTE_BET_CATEGORIES.find(
    categories => categories.category === categoryId
  );

  if (!config) return;

  switch (config.targetType) {
    case 'FIXED':
      return interaction.update({
        embeds: [buildCategoryExplanationEmbed(config, interaction)],
        components: buildFixedChoiceButtons(
          config.category,
          ownerId,
          sessionId
        ),
        files: [rouletteImage]
      });

    case 'NUMBER_INPUT':
      return showRouletteNumberModal( 
        interaction,
        ownerId,
        sessionId
      );

    case 'SPLIT': {
      return showSplitNumberModal(
        interaction,
        ownerId,
        sessionId
      );
    }

    case 'STATIC':
      return showRouletteStaticBetAmountModal(
        interaction,
        config.category,
        config.label,
        ownerId,
        sessionId
      );

    case 'DROPDOWN':
    return interaction.update({
      embeds: [buildCategoryExplanationEmbed(config, interaction)],
      components: buildDropdownTargetMenu(
        config.category,
        ownerId,
        sessionId
      ),
    });
  }
}
