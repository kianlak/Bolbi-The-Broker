import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

export function buildCornerTargetMenu(ownerId: string) {
  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`roulette:target:CORNER:${ownerId}`)
      .setPlaceholder('Choose a corner (4 numbers)')
      .addOptions(
        { label: '1-2-4-5', value: 'C_1_5' },
        { label: '2-3-5-6', value: 'C_2_6' },

        { label: '4-5-7-8', value: 'C_4_8' },
        { label: '5-6-8-9', value: 'C_5_9' },

        { label: '7-8-10-11', value: 'C_7_11' },
        { label: '8-9-11-12', value: 'C_8_12' },

        { label: '10-11-13-14', value: 'C_10_14' },
        { label: '11-12-14-15', value: 'C_11_15' },

        { label: '13-14-16-17', value: 'C_13_17' },
        { label: '14-15-17-18', value: 'C_14_18' },

        { label: '16-17-19-20', value: 'C_16_20' },
        { label: '17-18-20-21', value: 'C_17_21' },

        { label: '19-20-22-23', value: 'C_19_23' },
        { label: '20-21-23-24', value: 'C_20_24' },

        { label: '22-23-25-26', value: 'C_22_26' },
        { label: '23-24-26-27', value: 'C_23_27' },

        { label: '25-26-28-29', value: 'C_25_29' },
        { label: '26-27-29-30', value: 'C_26_30' },

        { label: '28-29-31-32', value: 'C_28_32' },
        { label: '29-30-32-33', value: 'C_29_33' },

        { label: '31-32-34-35', value: 'C_31_35' },
        { label: '32-33-35-36', value: 'C_32_36' },
      )
  );
}
