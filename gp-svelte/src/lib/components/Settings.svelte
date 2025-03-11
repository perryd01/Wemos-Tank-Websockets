<script lang="ts">
  import { userSettings } from "../stores/userSettings";
  import ButtonBase from "./ButtonBase.svelte";
  import Settings from "./icons/settings.svelte";

  const label = "Settings";
  const activeColor = "#5E239D";

  function handleClick() {
    if (dialogRef) {
      dialogRef.showModal();
    }
  }

  let dialogRef = $state<HTMLDialogElement | null>(null);
  const active = $derived(dialogRef?.open ?? false);

  let d = $state($userSettings.constants.d);
  let limit = $state($userSettings.constants.limit);

  $effect(() => {
    $userSettings.constants.d = d;
  });

  $effect(() => {
    $userSettings.constants.limit = limit;
  });
</script>

<ButtonBase {active} {activeColor} {label} {handleClick} icon={Settings} />

<dialog class="z-50" bind:this={dialogRef}>
  <div class="content">
    <header>This is an open dialog window</header>

    <section>
      <span>d</span>
      <input
        min="0.1"
        max="10"
        step="0.1"
        class="border-2 rounded-md"
        type="number"
        bind:value={d}
      />
    </section>
    <section>
      <span>limit</span>
      <input
        min="0.1"
        max="1"
        step="0.1"
        class="border-2 rounded-md"
        type="number"
        bind:value={limit}
      />
    </section>
    <section></section>

    <footer>
      <button onclick={() => dialogRef?.close()}>close</button>
    </footer>
  </div>
</dialog>

<style lang="postcss">
  dialog {
    @apply absolute top-0 left-0 rounded-lg z-[9999];
  }

  section {
    @apply py-2;
  }

  .content {
    @apply bg-white p-4 rounded-lg flex flex-col size-full;
  }

  footer > button {
    @apply bg-gray-900 text-white p-2 rounded-lg;
  }

  ::backdrop {
    background-color: black;
    opacity: 0.55;
  }
</style>
