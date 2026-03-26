import { create } from "zustand";

interface MetaStore {
  unlockedCards: string[];
  unlockCard: (cardId: string) => void;
}

export const useMetaStore = create<MetaStore>((set) => ({
  unlockedCards: ["defender_sentry", "structure_barricade"],
  unlockCard: (cardId: string) =>
    set((state) => ({
      unlockedCards: state.unlockedCards.includes(cardId)
        ? state.unlockedCards
        : [...state.unlockedCards, cardId],
    })),
}));