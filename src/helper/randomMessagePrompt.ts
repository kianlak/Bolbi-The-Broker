export function randomMessagePrompt(prompts: string[]): string {
  return prompts[Math.floor(Math.random() * prompts.length)];
}
