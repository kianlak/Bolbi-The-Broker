import { CASINO_GAMES } from '../constants/CASINO_GAMES.ts';

export type CasinoGameType = typeof CASINO_GAMES[number]['id'];
