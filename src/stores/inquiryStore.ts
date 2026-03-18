import { create } from "zustand";

export interface InquiryItem {
  name: string;
  category: string;
  manufacturer: string;
  origin: string;
  desc: string;
}

interface InquiryStore {
  items: InquiryItem[];
  addItem: (item: InquiryItem) => void;
  removeItem: (name: string) => void;
  clearItems: () => void;
  hasItem: (name: string) => boolean;
  totalItems: number;
}

export const useInquiryStore = create<InquiryStore>((set, get) => ({
  items: [],
  totalItems: 0,
  addItem: (item) =>
    set((state) => {
      if (state.items.find((i) => i.name === item.name)) return state;
      const items = [...state.items, item];
      return { items, totalItems: items.length };
    }),
  removeItem: (name) =>
    set((state) => {
      const items = state.items.filter((i) => i.name !== name);
      return { items, totalItems: items.length };
    }),
  clearItems: () => set({ items: [], totalItems: 0 }),
  hasItem: (name) => get().items.some((i) => i.name === name),
}));
