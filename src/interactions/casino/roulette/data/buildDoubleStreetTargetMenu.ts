import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

export function buildDoubleStreetTargetMenu(ownerId: string) {
  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`roulette:target:DOUBLE_STREET:${ownerId}`)
      .setPlaceholder('Choose a Double Street (6 numbers)')
      .addOptions([
        { label: '1-6', value: 'DS_1_6' },
        { label: '4-9', value: 'DS_4_9' },
        { label: '7-12', value: 'DS_7_12' },
        { label: '10-15', value: 'DS_10_15' },
        { label: '13-18', value: 'DS_13_18' },
        { label: '16-21', value: 'DS_16_21' },
        { label: '19-24', value: 'DS_19_24' },
        { label: '22-27', value: 'DS_22_27' },
        { label: '25-30', value: 'DS_25_30' },
        { label: '28-33', value: 'DS_28_33' },
        { label: '31-36', value: 'DS_31_36' },
      ])
  );
}
