import { ButtonInteraction } from "discord.js";
import { completed, getSession, setActiveMessageId } from "../../../session/sessionManager.ts";
import { deleteRouletteState, getRouletteState } from "../rouletteSessionStore.ts";
import { calculateRouletteResult } from "../helper/calculateRouletteResults.ts";
import { UserService } from "../../../../../../services/user/userService.ts";
import { buildSpinResultEmbed } from "../ui/buildSpinResultEmbed.ts";
import { buildNewRoundButtonRow } from "../ui/buildNewRoundButton.ts";
import { safeDeleteMessage } from "../../../helper/safeDeleteMessage.ts";
import { deriveRouletteStats } from "../helper/deriveRouletteStats.ts";
import { RouletteService } from "../../../../../../services/casino/roulette/rouletteService.ts";
import { logger } from "../../../../../../shared/logger.ts";

function spinRoulette(): number {
  return Math.floor(Math.random() * 38);
}

export async function handleRouletteSpin(
  interaction: ButtonInteraction
) {
  await interaction.deferReply();
  
  const [, , , ownerId, sessionId] = interaction.customId.split(':');
  
  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '❌ This roulette table is not yours.',
      ephemeral: true,
    });
    return;
  }

  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.editReply('❌ Session expired.');
    return;
  }

  const state = getRouletteState(sessionId);
  const roll = spinRoulette();

  const result = calculateRouletteResult(roll, state.bets);
  const derivedStats = deriveRouletteStats(result);

  const rouletteService = new RouletteService();
  rouletteService.applySpinResult(ownerId, result);
  
  const previousMessageId = session.activeMessageId;

  logger.info(`[${interaction.user.username}] User spun roulette\n`);

  const reply = await interaction.editReply({
    embeds: [buildSpinResultEmbed(result, interaction)],
    components: [
      buildNewRoundButtonRow(ownerId)
    ],
  });

  setActiveMessageId(ownerId, reply.id);

  await safeDeleteMessage(
    interaction.channel!,
    interaction.user.username,
    previousMessageId
  );

  completed(ownerId);
  deleteRouletteState(sessionId);
}
