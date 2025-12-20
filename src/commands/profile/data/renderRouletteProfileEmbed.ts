import { EmbedBuilder } from 'discord.js';
import type { ProfileContext } from '../types/ProfileContext.ts';
import type { RouletteStats } from '../types/RouletteStats.ts';

export function renderRouletteProfileEmbed(
  ctx: ProfileContext,
  stats: RouletteStats
) {
  const redWins = stats.wins_by_target?.['COLOR:RED'] ?? 0;
  const redLosses = stats.losses_by_target?.['COLOR:RED'] ?? 0;

  const blackWins = stats.wins_by_target?.['COLOR:BLACK'] ?? 0;
  const blackLosses = stats.losses_by_target?.['COLOR:BLACK'] ?? 0;

  const redTotal = redWins + redLosses;
  const blackTotal = blackWins + blackLosses;


  const evenWins = stats.wins_by_target?.['EVEN_ODD:EVEN'] ?? 0;
  const evenLosses = stats.losses_by_target?.['EVEN_ODD:EVEN'] ?? 0;

  const oddWins = stats.wins_by_target?.['EVEN_ODD:ODD'] ?? 0;
  const oddLosses = stats.losses_by_target?.['EVEN_ODD:ODD'] ?? 0;

  const evenTotal = evenWins + evenLosses;
  const oddTotal = oddWins + oddLosses;


  const highWins = stats.wins_by_target?.['LOW_HIGH:HIGH'] ?? 0;
  const highLosses = stats.losses_by_target?.['LOW_HIGH:HIGH'] ?? 0;

  const lowWins = stats.wins_by_target?.['LOW_HIGH:LOW'] ?? 0;
  const lowLosses = stats.losses_by_target?.['LOW_HIGH:LOW'] ?? 0;

  const highTotal = highWins + highLosses;
  const lowTotal = lowWins + lowLosses;

  const dozenOneWins = stats.wins_by_target?.['DOZEN:DOZEN_1'] ?? 0;
  const dozenOneWLosses = stats.losses_by_target?.['DOZEN:DOZEN_1'] ?? 0;

  const dozenTwoWins = stats.wins_by_target?.['DOZEN:DOZEN_2'] ?? 0;
  const dozenTwoLosses = stats.losses_by_target?.['DOZEN:DOZEN_2'] ?? 0;

  const dozenThreeWins = stats.wins_by_target?.['DOZEN:DOZEN_3'] ?? 0;
  const dozenThreeLosses = stats.losses_by_target?.['DOZEN:DOZEN_3'] ?? 0;

  const dozenOneTotal = dozenOneWins + dozenOneWLosses;
  const dozenTwoTotal = dozenTwoWins + dozenTwoLosses;
  const dozenThreeTotal = dozenThreeWins + dozenThreeLosses;

  const columnOneWins = stats.wins_by_target?.['COLUMN:COLUMN_1'] ?? 0;
  const columnOneLosses = stats.losses_by_target?.['COLUMN:COLUMN_1'] ?? 0;

  const columnTwoWins = stats.wins_by_target?.['COLUMN:COLUMN_2'] ?? 0;
  const columnTwoLosses = stats.losses_by_target?.['COLUMN:COLUMN_2'] ?? 0;

  const columnThreeWins = stats.wins_by_target?.['COLUMN:COLUMN_3'] ?? 0;
  const columnThreeLosses = stats.losses_by_target?.['COLUMN:COLUMN_3'] ?? 0;

  const columnOneTotal = columnOneWins + columnOneLosses;
  const columnTwoTotal = columnTwoWins + columnTwoLosses;
  const columnThreeTotal = columnThreeWins + columnThreeLosses;

  const topRolled = getTopRolledNumber(stats.result_number_wins, stats.result_number_losses);

  let numberWins = 0;
  let numberLosses = 0;

  for (const [key, count] of Object.entries(stats.wins_by_target)) {
    if (key.startsWith('NUMBER:')) {
      numberWins += count;
    }
  }

  for (const [key, count] of Object.entries(stats.losses_by_target)) {
    if (key.startsWith('NUMBER:')) {
      numberLosses += count;
    }
  }

  const totalNumberBets = numberWins + numberLosses;

  let doubleStreeWins = 0;
  let doubleStreetLosses = 0;
  
  for (const [key, count] of Object.entries(stats.wins_by_target)) {
    if (key.startsWith('DOUBLE_STREET:')) {
      doubleStreeWins += count;
    }
  }

  for (const [key, count] of Object.entries(stats.losses_by_target)) {
    if (key.startsWith('DOUBLE_STREET:')) {
      doubleStreetLosses += count;
    }
  }

  const totalDoubleStreetBets = doubleStreeWins + doubleStreetLosses;

  let streeWins = 0;
  let streetLosses = 0;
  
  for (const [key, count] of Object.entries(stats.wins_by_target)) {
    if (key.startsWith('STREET:')) {
      streeWins += count;
    }
  }

  for (const [key, count] of Object.entries(stats.losses_by_target)) {
    if (key.startsWith('STREET:')) {
      streetLosses += count;
    }
  }

  const totalStreetBets = doubleStreeWins + doubleStreetLosses;

  return new EmbedBuilder()
    .setColor(0xe74c3c)
    .setAuthor({
      name: `${ctx.username}'s Roulette`,
      iconURL: ctx.avatarUrl,
    })
    .setThumbnail(ctx.avatarUrl)
    .addFields(
      {
        name: '🎡 Spins Played',
        value: `\`${stats.spins_played}\``,
        inline: true,
      },
      {
        name: '💰 Baleh Bucks Won',
        value: `\`${stats.baleh_bucks_won}\``,
        inline: true,
      },
      {
        name: '💸 Baleh Bucks Lost',
        value: `\`${stats.baleh_bucks_lost}\``,
        inline: true,
      },
      {
        name: '📈 Net Profit',
        value: `\`${stats.baleh_bucks_won - stats.baleh_bucks_lost}\``,
        inline: true,
      },
      {
        name: '🏆 Largest Win',
        value: `\`${stats.largest_win}\``,
        inline: true,
      },
      {
        name: '☠️ Largest Loss',
        value: `\`${stats.largest_loss}\``,
        inline: true,
      },
      {
        name: '✅ Bets Won',
        value: `\`${stats.bets_won}\``,
        inline: true,
      },
      {
        name: '❌ Bets Lost',
        value: `\`${stats.bets_lost}\``,
        inline: true,
      },
      {
        name: '🎯 Most Rolled',
        value: topRolled
          ? `\`${topRolled.number === 37 ? '00' : topRolled.number}\``
          : `\`—\``,
        inline: true,
      },
      {
        name: 'Number Bet Wins',
        value: totalNumberBets > 0
          ? `\`🔢 ${percent(numberWins, totalNumberBets)}\``
          : `\`0.0%\``,
        inline: true,
      },
      {
        name: 'Color Wins',
        value:
          `🟥 Red: ${winRateDisplay(redWins, redTotal)}\n` +
          `⬛ Black: ${winRateDisplay(blackWins, blackTotal)}`,
        inline: true,
      },
      {
        name: 'Even-Odd Wins',
        value:
          `⚪ Even: ${winRateDisplay(evenWins, evenTotal)}\n` +
          `⚫ Odd: ${winRateDisplay(oddWins, oddTotal)}`,
        inline: true,
      },
      {
        name: 'High-Low Wins',
        value:
          `⬆️ High: ${winRateDisplay(highWins, highTotal)}\n` +
          `⬇️ Low: ${winRateDisplay(lowWins, lowTotal)}`,
        inline: true,
      },
      {
        name: 'Dozen Wins',
        value:
          `1️⃣ 1st 12: ${winRateDisplay(dozenOneWins, dozenOneTotal)}\n` +
          `2️⃣ 2nd 12: ${winRateDisplay(dozenTwoWins, dozenTwoTotal)}\n` +
          `3️⃣ 3rd 12: ${winRateDisplay(dozenThreeWins, dozenThreeTotal)}`,
        inline: true,
      },
      {
        name: 'Column Wins',
        value:
          `1️⃣ Column 1: ${winRateDisplay(columnOneWins, columnOneTotal)}\n` +
          `2️⃣ Column 2: ${winRateDisplay(columnTwoWins, columnTwoTotal)}\n` +
          `3️⃣ Column 3: ${winRateDisplay(columnThreeWins, columnThreeTotal)}`,
        inline: true,
      },
      {
        name: 'Double Street Bet Wins',
        value: totalDoubleStreetBets > 0
          ? `\`🧩 ${percent(doubleStreeWins, totalDoubleStreetBets)}\``
          : `\`0.0%\``,
        inline: true,
      },
      {
        name: ' Street Bet Wins',
        value: totalStreetBets > 0
          ? `\`🧩 ${percent(streeWins, totalStreetBets)}\``
          : `\`0.0%\``,
        inline: true,
      },
    )
    .setFooter({ text: 'Bolbi The Broker • Roulette' })
    .setTimestamp();
}

function percent(part: number, total: number): string {
  if (total === 0) return `\`0.0%\``;
  return `${((part / total) * 100).toFixed(1)}%`;
}

function getTopRolledNumber(
  wins?: Record<number, number>,
  losses?: Record<number, number>
): { number: number; count: number } | null {
  if (!wins && !losses) return null;

  const totals: Record<number, number> = {};

  for (const [num, count] of Object.entries(wins ?? {})) {
    const n = Number(num);
    totals[n] = (totals[n] ?? 0) + count;
  }

  for (const [num, count] of Object.entries(losses ?? {})) {
    const n = Number(num);
    totals[n] = (totals[n] ?? 0) + count;
  }

  let topNumber: number | null = null;
  let topCount = 0;

  for (const [num, count] of Object.entries(totals)) {
    const n = Number(num);
    if (count > topCount) {
      topNumber = n;
      topCount = count;
    }
  }

  return topNumber !== null
    ? { number: topNumber, count: topCount }
    : null;
}

function winRateDisplay(wins: number, total: number): string {
  if (total === 0) return `\`0.0%\``;

  const rate = (wins / total) * 100;

  if (rate === 0) {
    return `\`0.0%\``;
  }

  return `\`${rate.toFixed(1)}%\``;
}

