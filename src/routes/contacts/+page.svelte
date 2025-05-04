<script>
  import { contactsStore } from '$lib/stores/contactsStore.js';
  import ContactCard from '$lib/components/contacts-components/ContactCard.svelte';
  import ContactForm from '$lib/components/contacts-components/ContactForm.svelte';
  
  let showAddForm = false;
  let currentEditingContact = null;
  let filterType = "all"; // Default view, unfiltered
  
  function handleEdit(event) {
    currentEditingContact = event.detail;
    showAddForm = true;
  }
  
  function closeForm() {
    showAddForm = false;
    currentEditingContact = null;
  }
</script>

<main>
  <div class="header">
    <h1>Contact Manager</h1>
    <button class="add-button" on:click={() => { showAddForm = true; currentEditingContact = null; }}>
      Add Contact
    </button>
  </div>
  
  {#if showAddForm}
    <div class="modal-overlay">
      <div class="modal-content">
        <ContactForm 
          editingContact={currentEditingContact} 
          on:close={closeForm} 
        />
      </div>
    </div>
  {/if}

  <div class="chip-filter">
    {#each ["all", "primary", "secondary"] as type}
      <button
        class="chip"
        class:active={filterType === type}
        on:click={() => filterType = type}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    {/each}
  </div>
  
  <div class="contacts-list">
    {#if $contactsStore.length === 0}
      <p class="no-contacts">No contacts found. Add your first contact!</p>
    {:else}
      {#each $contactsStore.filter(contact => {
        if (filterType === "all") return true;
        return contact.type === filterType;
      }) as contact (contact.id)}
        <ContactCard {contact} on:edit={handleEdit}/>
      {/each}
    {/if}
  </div>
</main>
  
<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 80px 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .add-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .add-button:hover {
    background-color: #0069d9;
  }
  
  .contacts-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .no-contacts {
    text-align: center;
    color: #666;
    margin-top: 40px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
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
</style>