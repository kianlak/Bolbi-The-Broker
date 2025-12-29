import type { CommandContext } from "../types/CommandContext.ts";

export async function enforceArgs(
  commandContext: CommandContext,
  minArgs?: number,
  maxArgs?: number,
  usage?: string
): Promise<boolean> {
  const argCount = commandContext.args?.length ?? 0;

  if (minArgs !== undefined && argCount < minArgs) {
    await commandContext.message.reply(
      usage
        ? `❌ Not enough arguments\nUsage: \`${usage}\``
        : '❌ Not enough arguments',
    );

    return false;
  }

  if (maxArgs !== undefined && argCount > maxArgs) {
    await commandContext.message.reply(
      usage
        ? `❌ Too many arguments\nUsage: \`${usage}\``
        : '❌ Too many arguments'
    );

    return false;
  }

  return true;
}
