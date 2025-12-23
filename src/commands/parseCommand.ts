const PREFIX = '+';

export type ParsedCommand = {
  command: string;
  args: string[];
  raw: string;
};

export function parseCommand(input: string): ParsedCommand | null {
  if (!input.startsWith(PREFIX)) return null;

  const tokens = input.slice(PREFIX.length).trim().split(/\s+/);
  if (tokens.length === 0) return null;

  const [command, ...args] = tokens;

  return {
    command,
    args,
    raw: input,
  };
}
