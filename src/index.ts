import 'dotenv/config';
import axios from 'axios';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once('ready', () => {
  console.log('Bolbi the Broker has arrived');
});

client.login(process.env.DISCORD_BOT_TOKEN);