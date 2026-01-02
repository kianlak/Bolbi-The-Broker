import type { CommandContext } from "../types/CommandContext.ts";

export async function enforceArgs(
  commandContext: CommandContext,
  minArgs?: number,
  maxArgs?: number,
  usage?: string
): Promise<boolean> {
  const argCount = commandContext.args?.length ?? 0;

  if (minArgs !== undefined && argCount < minArgs) {
    await commandContext.message.reply(`❌ **Not enough arguments**\nUsage: \`${usage}\``);

    return false;
  }

  if (maxArgs !== undefined && argCount > maxArgs) {
    await commandContext.message.reply(`❌ **Too many arguments**\nUsage: \`${usage}\``);

    return false;
  }

  return true;
}
