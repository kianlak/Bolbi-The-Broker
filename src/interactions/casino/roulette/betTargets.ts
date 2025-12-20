export type RouletteColorTarget = 'RED' | 'BLACK';
export type RouletteEvenOddTarget = 'EVEN' | 'ODD';
export type RouletteLowHighTarget = 'LOW' | 'HIGH';
export type RouletteDozenTarget = 'DOZEN_1' | 'DOZEN_2' | 'DOZEN_3';
export type RouletteColumnTarget = 'COLUMN_1' | 'COLUMN_2' | 'COLUMN_3';
export type RouletteNumberTarget = number;
export type RouletteDoubleStreetTarget =
  | 'DS_1_6'
  | 'DS_4_9'
  | 'DS_7_12'
  | 'DS_10_15'
  | 'DS_13_18'
  | 'DS_16_21'
  | 'DS_19_24'
  | 'DS_22_27'
  | 'DS_25_30'
  | 'DS_28_33'
  | 'DS_31_36';
export type RouletteStreetTarget =
  | 'S_1_3'
  | 'S_4_6'
  | 'S_7_9'
  | 'S_10_12'
  | 'S_13_15'
  | 'S_16_18'
  | 'S_19_21'
  | 'S_22_24'
  | 'S_25_27'
  | 'S_28_30'
  | 'S_31_33'
  | 'S_34_36';

export type RouletteBetTarget =
  | RouletteColorTarget
  | RouletteEvenOddTarget
  | RouletteNumberTarget
  | RouletteLowHighTarget
  | RouletteDozenTarget
  | RouletteColumnTarget
  | RouletteDoubleStreetTarget;
