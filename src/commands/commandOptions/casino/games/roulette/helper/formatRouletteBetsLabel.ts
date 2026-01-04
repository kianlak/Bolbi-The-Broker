import type { RouletteBet } from '../types/RouletteBet.ts';
import { RouletteBetCategory } from '../types/RouletteBetCategory.ts';

export function formatRouletteBetLabel(bet: RouletteBet): string {
  function extractIndex(selection: string): number | null {
    const match = selection.match(/_(\d+)$/);
    return match ? Number(match[1]) : null;
  }

  switch (bet.category) {
    case RouletteBetCategory.COLOR:
      return bet.selection === 'RED' ? 'Red' : 'Black';

    case RouletteBetCategory.EVEN_ODD:
      return bet.selection === 'EVEN' ? 'Even' : 'Odd';

    case RouletteBetCategory.LOW_HIGH:
      return bet.selection === 'LOW' ? 'Low (1-18)' : 'High (19-36)';

    case RouletteBetCategory.DOZEN: {
      const index = extractIndex(bet.selection);
      if (index === 1) return '1st 12 (1-12)';
      if (index === 2) return '2nd 12 (13-24)';
      if (index === 3) return '3rd 12 (25-36)';
      
      return 'Dozen';
    }

    case RouletteBetCategory.COLUMN: {
      const index = extractIndex(bet.selection);
      return index ? `Column ${index}` : 'Column';
    }

    case RouletteBetCategory.NUMBER:
      return `Single Number ${bet.selection}`;

    default:
      return `${bet.category} ${bet.selection}`;
  }
}
