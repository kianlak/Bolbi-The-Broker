import { logger } from '../../shared/logger.ts';

import { UserCardsRepository } from './userCardRepository.ts';

export class UserCardsService {
  private readonly repo: UserCardsRepository;

  constructor(repo?: UserCardsRepository) {
    this.repo = repo ?? new UserCardsRepository();
  }

  addCardToUser(
    discordId: string,
    packName: string,
    imageId: string,
    rarity: string,
    cardId: string,
    amount = 1
  ): void {
    logger.info(
      `[${discordId}] Adding card ${imageId} (x${amount}) from pack ${packName}`
    );

    this.repo.addUserCard(discordId, packName, imageId, rarity, amount, cardId,);
  }

  getUserCards(discordId: string) {
    return this.repo.getUserCardsByDiscordId(discordId);
  }

  getUserCardsByPack(
    discordId: string,
    packName: string
  ) {
    return this.repo.getUserCardsByPack(discordId, packName);
  }

  getOwnedPacks(discordId: string): string[] {
    return this.repo.getOwnedPacks(discordId);
  }

  getCardByCardId(cardId: string) {
    return this.repo.getUserCardByCardId(cardId);
  }
}
