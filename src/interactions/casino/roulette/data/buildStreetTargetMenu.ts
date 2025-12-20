import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

export function buildStreetTargetMenu(ownerId: string) {
  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`roulette:target:STREET:${ownerId}`)
      .setPlaceholder('Choose a Street (3 numbers)')
      .addOptions([
        { label: '1-3', value: 'S_1_3' },
        { label: '4-6', value: 'S_4_6' },
        { label: '7-9', value: 'S_7_9' },
        { label: '10-12', value: 'S_10_12' },
        { label: '13-15', value: 'S_13_15' },
        { label: '16-18', value: 'S_16_18' },
        { label: '19-21', value: 'S_19_21' },
        { label: '22-24', value: 'S_22_24' },
        { label: '25-27', value: 'S_25_27' },
        { label: '28-30', value: 'S_28_30' },
        { label: '31-33', value: 'S_31_33' },
        { label: '34-36', value: 'S_34_36' },
      ])
  );
}
