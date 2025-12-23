import type { CommandContext } from '../types.ts';

export async function enforceArgs(
  ctx: CommandContext,
  minArgs?: number,
  maxArgs?: number,
  usage?: string
): Promise<boolean> {
  const argCount = ctx.args.length;

  if (minArgs !== undefined && argCount < minArgs) {
    await ctx.message.reply(
      usage
        ? `❌ Not enough arguments.\nUsage: \`${usage}\``
        : '❌ Not enough arguments.'
    );
    return false;
  }

  if (maxArgs !== undefined && argCount > maxArgs) {
    await ctx.message.reply(
      usage
        ? `❌ Too many arguments.\nUsage: \`${usage}\``
        : '❌ Too many arguments.'
    );
    return false;
  }

  return true;
}
