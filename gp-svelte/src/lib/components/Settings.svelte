<script lang="ts">
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

  const speed = $state(1);
</script>

<ButtonBase {active} {activeColor} {label} {handleClick} icon={Settings} />

<dialog class="z-50" bind:this={dialogRef}>
  <div class="content">
    <section>This is an open dialog window</section>
    <section>
      <div class="flex flex-col">
        <label for="points">Speed restriction:</label>
        <output for="points">{speed}</output>
        <div class="flex flex-row w-full">
          <span>max limit</span>
          <input
            class="w-full"
            type="range"
            id="points"
            name="points"
            min="0"
            max="1"
            step="0.1"
          />
          <span>no limit</span>
        </div>
      </div>
    </section>

    <footer>
      <button>save</button>
      <button onclick={() => dialogRef?.close()}>close</button>
    </footer>
  </div>
</dialog>

<style lang="postcss">
  dialog {
    @apply absolute top-0 left-0 rounded-lg z-[9999];
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
