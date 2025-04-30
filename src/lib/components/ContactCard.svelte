<script>
  import { createEventDispatcher } from 'svelte';
  // Import both the store and API
  import { contactsStore, contactsApi } from '$lib/stores/contactsStore.js';
  
  export let contact;
  const dispatch = createEventDispatcher();
  
  function deleteContact() {
    console.log("Delete clicked for:", contact); // Confirm handler works

    if (confirm(`Delete ${contact.name}?`)) {
      contactsStore.update(contacts => {
        console.log("Before delete:", contacts.length, "contacts");

        const updated = contacts.filter(c => c.id !== contact.id);
        console.log("After delete:", updated.length, "contacts");

        if (contacts.length === updated.length) {
          console.warn("No contact deleted. ID may not match.");
        }

        return updated;
      });
    }
  }
  
  function editContact() {
    console.log("Dispatching edit event for:", contact);
    dispatch('edit', contact);
  }
</script>

<div class="contact-card">
  <div class="contact-info">
    <h3>{contact.name}</h3>
    <p><strong>Phone:</strong> {contact.number}</p>
    {#if contact.email}
      <p><strong>Email:</strong> {contact.email}</p>
    {/if}
    {#if contact.note}
      <p><strong>Note:</strong> {contact.note}</p>
    {/if}
  </div>
  <div class="contact-actions">
    <button class="edit-btn" on:click={editContact}>Edit</button>
    <button class="delete-btn" on:click={deleteContact}>Delete</button>
  </div>
</div>

<style>
  .contact-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .contact-info {
    flex: 1;
  }
  
  .contact-info h3 {
    margin: 0 0 8px 0;
    color: #333;
  }
  
  .contact-info p {
    margin: 4px 0;
    color: #666;
  }
  
  .contact-actions {
    display: flex;
    gap: 8px;
  }
  
  .edit-btn {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .edit-btn:hover, .delete-btn:hover {
    opacity: 0.9;
  }
</style>