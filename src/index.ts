import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { commandRouter } from './commandRouter.ts';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.DISCORD_BOT_TOKEN);

client.once('ready', () => {
  console.log('Bolbi has arrived');
});

client.on('messageCreate', async (message) => {
  console.log("message received");
  if (message.author.bot) return;

  if (message.channel.id === process.env.DISCORD_ALLOWED_CHANNEL_ID ||
      message.channel.id === process.env.DISCORD_ALLOWED_CHANNEL_ID_DEV) {
    await commandRouter(message);
  }

  return;
});