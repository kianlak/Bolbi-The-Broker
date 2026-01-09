import { EmbedBuilder } from 'discord.js';
import { UserService } from '../../../../../../../../services/user/userService.ts';
import { getRouletteState } from '../../../rouletteSessionStore.ts';
import { getSession } from '../../../../../session/sessionManager.ts';

export function buildSplitExplanationEmbed(
  base: number,
  ownerId: string,
  avatarUrl: string | null,
): EmbedBuilder {
  const userService = new UserService();
  const balance = userService.getUserBalance(ownerId);
  const session = getSession(ownerId);
  const sessionId = session?.sessionId;

  if (!sessionId) throw Error();

  const state = getRouletteState(sessionId);

  const available = balance - state.reserved;

  return new EmbedBuilder()
    .setTitle('✂️ Split')
    .setDescription(
      [
        `Choose a number to split with **${base}**.`,
      ].join('\n')
    )
    .setThumbnail(avatarUrl)
    .addFields(
      {
        name: `💰 Balance $${available}`,
        value: ``,
        inline: true,
      }
    )
    .setImage('attachment://rouletteTable.png')
    .setColor(0xc0392b);
}
