import { RouletteBetCategory } from "../../types/RouletteBetCategory.ts";

export type DropdownOption = {
  label: string;
  value: string;
};

export function getDropdownOptions(
  category: RouletteBetCategory
): DropdownOption[] {
  switch (category) {
    case RouletteBetCategory.STREET:
      return Array.from({ length: 12 }, (_, i) => {
        const start = i * 3 + 1;
        const end = start + 2;

        return {
          label: `${start}-${end}`,
          value: `STREET_${start}_${end}`,
        };
      });

    case RouletteBetCategory.DOUBLE_STREET:
      return Array.from({ length: 11 }, (_, i) => {
        const start = i * 3 + 1;
        const end = start + 5;

        return {
          label: `${start}-${end}`,
          value: `DOUBLE_STREET_${start}_${end}`,
        };
      });

    case RouletteBetCategory.CORNER: {
      const options: DropdownOption[] = [];

      for (let row = 0; row < 11; row++) {
        for (let col = 0; col < 2; col++) {
          const topLeft = row * 3 + col + 1;

          const numbers = [
            topLeft, 
            topLeft + 1, 
            topLeft + 3,
            topLeft + 4,
          ];

          const min = Math.min(...numbers);
          const max = Math.max(...numbers);

          options.push({
            label: numbers.join(', '),
            value: `CORNER_${min}_${max}`,
          });
        }
      }

      return options;
    }

    default:
      return [];
  }
}
