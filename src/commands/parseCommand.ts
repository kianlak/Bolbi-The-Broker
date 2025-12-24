const COMMAND_PREFIX = '+';

export type ParsedCommand = {
  command: string;
  args: string[];
  raw: string;
};

export function parseCommand(input: string): ParsedCommand | null {
  if (!input.startsWith(COMMAND_PREFIX)) return null;

  if (input.length === 1 || /\s/.test(input[1])) {
    return null;
  }

  const tokens = input
    .slice(COMMAND_PREFIX.length)
    .split(/\s+/);

  const [command, ...args] = tokens;

  if (!command) return null;

  return {
    command: command.toLowerCase(),
    args: args,
    raw: input,
  };
}
