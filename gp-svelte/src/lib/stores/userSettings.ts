import { persisted } from "svelte-persisted-store";

export const userSettings = persisted("user-settings", {
  constants: {
    d: 1.5,
    limit: 1,
  },
});
