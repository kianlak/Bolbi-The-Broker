export type RouletteBetWinRates = {
  COLOR: {
    RED: string;
    BLACK: string;
  };

  EVEN_ODD: {
    EVEN: string;
    ODD: string;
  };

  LOW_HIGH: {
    LOW: string;
    HIGH: string;
  };

  DOZEN: {
    FIRST: string;
    SECOND: string;
    THIRD: string;
  };

  COLUMN: {
    FIRST: string;
    SECOND: string;
    THIRD: string;
  };

  OTHER: {
    DOUBLE_STREET: string;
    TOP_LINE: string;
    CORNER: string;
    STREET: string;
    ROW: string;
    SPLIT: string;
    SINGLE: string;
  };
}
