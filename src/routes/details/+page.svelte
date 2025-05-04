<script>
  import { detailsStore } from "$lib/stores/detailsStore.js";
  import { get } from "svelte/store";

  let showIllnessForm = false;
  let showPillForm = false;
  let showHistoryForm = false;

  let info = { ...get(detailsStore).info};
  let section = "info";

  let newIllness = "";

  function updateInfo() {
    detailsStore.update(data => ({
      ...data,
      info: { ...info }
    }));
  }

  function addIllness() {
    if (!newIllness.trim()) return;
    detailsStore.update(data => ({
      ...data,
      illnesses: [...data.illnesses, newIllness.trim()]
    }));
    newIllness = "";
    showIllnessForm = false;
  }

  function removeIllness(index) {
    detailsStore.update(data => {
      const updated = [...data.illnesses];
      updated.splice(index, 1);
      return { ...data, illnesses: updated};
    });
  }
</script>

<main>
  <h1>Personal Details</h1>
  
  <div class="chip-filter">
    {#each ["info", "illnesses", "pills", "history"] as tab}
      <button
        class="chip"
        class:active={section === tab}
        on:click={() => section = tab}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    {/each}
  </div>

  {#if section === "info"}
    <section>
      <h2>Personal Info</h2>
      <button on:click={() => showIllnessForm = true}>Add Illness</button>

      <form on:input={updateInfo}>
        <div class="form-row">
          <label for="name">Full Name</label>
          <input type="text" id="name" bind:value={info.name} />
        </div>

        <div class="form-row">
          <label for="age">Age</label>
          <input type="number" id="age" bind:value={info.age} />
        </div>

        <div class="form-row">
          <label for="sex">Sex</label>
          <select id="sex" bind:value={info.sex}>
            <option value="">--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-row">
          <label for="blood">Blood Type</label>
          <input type="text" id="blood" placeholder="e.g. O+" bind:value={info.bloodType} />
        </div>

        <div class="form-row">
          <label for="height">Height in cm</label>
          <input type="number" id="height" bind:value={info.height} />
        </div>

        <div class="form-row">
          <label for="weight">Weight in kg</label>
          <input type="number" id="weight" bind:value={info.weight} />
        </div>

        <div class="form-row">
          <label for="notes">Emergenct Notes</label>
          <textarea id="notes" placeholder="e.g. Allergic to penicillin" bind:value={info.notes}></textarea>
        </div>
      </form>
    </section>
  {:else if section ==="illnesses"}
    <section>
      <h2>Current Illnesses</h2>
      <button on:click={() => showIllnessForm = true}>Add Illness</button>

      {#if showIllnessForm}
        <input 
          placeholder="e.g. Asthma"
          bind:value={newIllness}
          on:keydown={(e) => e.key === "Enter" && addIllness()}
        />
        <button on:click={addIllness}>Save</button>
        <button on:click={() => {showIllnessForm = false; newIllness = ""}}>Cancel</button>
      {/if}

      {#if $detailsStore.illnesses.length > 0}
        <ul>
          {#each $detailsStore.illnesses as illness, i}
            <li>
              {illness} 
              <button on:click={() => removeIllness(i)}>✕</button>
            </li>
          {/each}
        </ul>
      {:else}
        <p>No illnesses listed</p>
      {/if}
    </section>
  {:else if section ==="pills"}
    <section>
      <h2>Pills to Tale</h2>
      <button on:click={() => showPillForm = true}>Add Pill</button>
      <!-- Add Pill Form Later -->
    </section>
  {:else if section ==="history"}
    <section>
      <h2>Medical History</h2>
      <button on:click={() => showHistoryForm = true}>Add History</button>
      <!-- Add Medical History Form Later -->
    </section>
  {/if}


</main>

<style>
  main {
    max-width: 600px;
    margin: auto;
    padding: 80px 20px;
  }

  section {
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  input {
    padding: 0.5rem;
    margin-right: 0.5rem;
  }

  button {
    margin-right: 0.5rem;
  }

  .chip-filter {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 8px;
    margin-bottom: 16px;
    scrollbar-width: none;
  }

  .chip-filter::-webkit-scrollbar {
    display: none;
  }

  .chip {
    white-space: nowrap;
    border: 1px solid #ccc;
    padding: 6px 12px;
    border-radius: 20px;
    background-color: #f0f0f0;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease-in-out;
  }

  .chip:hover {
    background-color: #e0e0e0;
  }

  .chip.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-row {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: bold;
    margin-bottom: 4px;
  }

  input, select, textarea {
    padding: 10px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
</style>