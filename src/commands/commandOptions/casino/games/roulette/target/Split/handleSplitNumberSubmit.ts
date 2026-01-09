import { AttachmentBuilder, ModalSubmitInteraction } from "discord.js";

import { getSplitOptions } from "../../helper/getSplitOptions.ts";
import { buildSplitExplanationEmbed } from "./ui/buildSplitExplanationEmbed.ts";
import { buildSplitOptionButtons } from "./ui/buildSplitOptionButtons.ts";
import { getSession } from "../../../../session/sessionManager.ts";
import { safeDeleteMessage } from "../../../../helper/safeDeleteMessage.ts";

export async function handleSplitNumberSubmit(
  interaction: ModalSubmitInteraction
) {
  await interaction.deferReply();

  const [, , , ownerId, sessionId] = interaction.customId.split(':');
  const rouletteImage = new AttachmentBuilder('./src/data/img/rouletteTable.png');
  

  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.editReply({ content: '❌ **Session expired**' });
    return;
  }

  const raw = interaction.fields
    .getTextInputValue('number')
    .trim();

  const base = Number(raw);
  if (!Number.isInteger(base) || base < 1 || base > 36) {
    await interaction.editReply({
      content: '❌ **Enter a valid number (1-36)**',
    });
    return;
  }

  const options = getSplitOptions(base);
  if (!options.length) {
    await interaction.editReply({
      content: '❌ **No valid split options**',
    });
    return;
  }

  const previousMessageId = session.activeMessageId;

  const reply = await interaction.editReply({
    embeds: [buildSplitExplanationEmbed(base, ownerId, interaction.user.displayAvatarURL())],
    components: buildSplitOptionButtons(
      base,
      options,
      ownerId,
      sessionId
    ),
    files: [rouletteImage],
  });

  session.activeMessageId = reply.id;

  await safeDeleteMessage(
    interaction.channel,
    interaction.user.username,
    previousMessageId
  );
}
