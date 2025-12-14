import 'dotenv/config';
import axios from 'axios';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client(
  { intents: 
    [
      GatewayIntentBits.Guilds, 
      GatewayIntentBits.GuildMessages, 
      GatewayIntentBits.MessageContent
    ]
  }
)

client.on('ready', () => {
  console.log('bot is ready');
})