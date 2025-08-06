import { atom } from "recoil";

export const ctaClicksState = atom({
  key: "ctaClicksState",
  default: {}, // e.g., { ctaId1: true, ctaId2: false }
});

export const authState = atom({
  key: "authState",
  default: {
    access_token: null,
    user: null,
  },
});
