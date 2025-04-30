<script>
  import { contactsApi } from '$lib/stores/contactsStore.js';
  import { createEventDispatcher, onMount } from 'svelte';
  
  export let editingContact = null;
  const dispatch = createEventDispatcher();
  
  let name = "";
  let number = "";
  let email = "";
  let note = "";
  
  // Initialize form data whenever editingContact changes
  $: if (editingContact) {
    console.log("Editing contact:", editingContact);
    name = editingContact.name || "";
    number = editingContact.number || "";
    email = editingContact.email || "";
    note = editingContact.note || "";
  } else {
    name = "";
    number = "";
    email = "";
    note = "";
  }
  
  onMount(() => {
    console.log("Component mounted, editingContact:", editingContact);
    if (editingContact) {
      name = editingContact.name || "";
      number = editingContact.number || "";
      email = editingContact.email || "";
      note = editingContact.note || "";
    }
  });
  
  function handleSubmit(event) {
    // Prevent default form submission
    event.preventDefault();
    
    if (!name || !number) {
      alert("Please fill in all required fields.");
      return;
    }
    
    if (editingContact) {
      // Update existing contact
      contactsApi.updateContact({
        ...editingContact,
        name,
        number,
        email,
        note
      });
      console.log("Contact updated:", editingContact.id);
    } else {
      // Add new contact
      const newContact = {
        id: crypto.randomUUID(),
        name,
        number,
        email,
        note
      };
      contactsApi.addContact(newContact);
      console.log("New contact added:", newContact.id);
    }
    
    // Close the modal after submission
    dispatch("close");
  }

  function resetForm() {
    name = "";
    number = "";
    email = "";
    note = "";
  }
</script>

{#if editingContact}
  <p>Editing: {editingContact.name}</p>
{:else}
  <p>Adding new contact</p>
{/if}

<form on:submit={handleSubmit}>
  <div class="form-group">
    <label for="name">Name *</label>
    <input
      id="name"
      type="text"
      placeholder="Name"
      bind:value={name}
      required
    >
  </div>
  
  <div class="form-group">
    <label for="number">Phone Number *</label>
    <input
      id="number"
      type="text"
      placeholder="Phone Number"
      bind:value={number}
      required
    >
  </div>
  
  <div class="form-group">
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      placeholder="Email"
      bind:value={email}
    >
  </div>
  
  <div class="form-group">
    <label for="note">Note</label>
    <textarea
      id="note"
      placeholder="Note"
      bind:value={note}
    ></textarea>
  </div>
  
  <div class="buttons">
    {#if editingContact}
      <button type="submit" class="add-update">Update Contact</button>
    {:else}
      <button type="submit" class="add-update">Add Contact</button>
    {/if}
    <button type="button" class="reset" on:click={resetForm}>Reset</button>
    <button type="button" class="close" on:click={() => dispatch("close")}>Close</button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  label {
    font-weight: bold;
    font-size: 14px;
  }
  
  input, textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    justify-content: flex-end;
  }
  
  .add-update {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .reset {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .close {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .add-update:hover {
    background-color: #0069d9;
  }
  
  .reset:hover {
    background-color: #5a6268;
  }
  
  .close:hover {
    background-color: #c82333;
  }
</style>