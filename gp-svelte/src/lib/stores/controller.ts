import { derived, writable } from "svelte/store";

function createControllerStore() {
  const { set, subscribe, update } = writable<"joy" | "gamepad">("joy");

  return {
    subscribe,
    toggle: () => update((val) => (val === "joy" ? "gamepad" : "joy")),
  };
}

export const controllerStore = createControllerStore();

function createNumericByteWritable(initialValue: number) {
  const { subscribe, set } = writable<number>(0);

  return {
    subscribe,
    set,
    reset: () => set(0),
  };
}

export const speedStore = createNumericByteWritable(0);
export const angularVelocityStore = createNumericByteWritable(0);

export const speedStoreDerived = derived(speedStore, (val) => {
  const clampedValue = Math.max(-1, Math.min(1, val));
  return Math.round((clampedValue + 1) * 127.5);
});

export const angularVelocityDerived = derived(angularVelocityStore, (val) => {
  const clampedValue = Math.max(-1, Math.min(1, val));
  return Math.round((clampedValue + 1) * 127.5);
});