import { CARD_BASE_PRICES } from "./constants/CARD_BASE_PRICES.ts";
import { RARITY_FLOORS } from "./constants/RARITY_FLOORS.ts";
import { SELL_RATE } from "./constants/SELL_RATE.ts";
import { CARD_FINISH_MULTIPLIERS } from "./constants/CARD_FINISH_MULTIPLIERS.ts";

import { CardMarketRepository } from "./cardMarketRepository.ts";

import type { CardFinish } from "../../commands/commandOptions/use/cards/types/CardFinish.ts";
import type { CardRarity } from "../../commands/commandOptions/use/cards/types/CardRarity.ts";

export class CardMarketService {
  private readonly repo = new CardMarketRepository();

  getMarketPrice(input: {
    rarity: CardRarity;
    finish: CardFinish;
    cardTemplateId: string;
  }): number {
    const { rarity, finish, cardTemplateId } = input;

    const base = CARD_BASE_PRICES[rarity];
    const finishMultiplier = CARD_FINISH_MULTIPLIERS[finish];

    const totalCards = this.repo.getTotalCardsInCirculation();
    const copies = this.repo.getCopiesOfCard(cardTemplateId);

    const scarcityRatio =
      totalCards === 0 ? 1 : copies / totalCards;

    const scarcityMultiplier = Math.max(
      0.25,
      1 / Math.sqrt(scarcityRatio + 0.01)
    );

    let price =
      base *
      scarcityMultiplier *
      finishMultiplier;

    const floor = base * RARITY_FLOORS[rarity];
    price = Math.max(price, floor);

    return Math.floor(price);
  }

  getSellPrice(input: {
    rarity: CardRarity;
    finish: CardFinish;
    cardTemplateId: string;
  }): number {
    return Math.floor(
      this.getMarketPrice(input) * SELL_RATE
    );
  }
}