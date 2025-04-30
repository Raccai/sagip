<script>
    import { contactsStore } from '$lib/stores/contactsStore.js';
    import { createEventDispatcher, onMount } from 'svelte';

    export let editingContact = null;
    const dispatch = createEventDispatcher();

    let name = "";
    let number = "";
    let email = "";
    let note = "";

    onMount(() => {
        if (editingContact) {
            name = editingContact.name;
            number = editingContact.number;
            email = editingContact.email;
            note = editingContact.note;
        }
    });

    function updateContact() {
        if (!name || !number) {
            alert("Please fill in all required fields.");
            return;
        }

        const updatedContact = {
            ...editingContact,
            name,
            number,
            email,
            note
        };

        contactsStore.update((contacts) => {
            const index = contacts.findIndex(contact => contact.id === editingContact.id);
            if (index !== -1) {
                contacts[index] = updatedContact;
            }
            return contacts;
        });

        // Reset form
        name = "";
        number = "";
        email = "";
        note = "";

        dispatch('close');
    }

    function addContact() {
        if (!name || !number) {
            alert("Please fill in all required fields.");
            return;
        }

        const newContact = {
            id: crypto.randomUUID(),
            name,
            number,
            email,
            note
        }

        contactsStore.update((contacts) => [newContact, ...contacts]);

        // Reset form
        name = "";
        number = "";
        email = "";
        note = "";
    }
</script>

<form on:submit={addContact}>
    <input 
        type="text"
        placeholder="Name"
        bind:value={name}
        required
    >
    <input 
        type="text"
        placeholder="Number"
        bind:value={number}
        required    
    >
    <input 
        type="email"
        placeholder="Email"
        bind:value={email}
    >
    <textarea 
        placeholder="Note"
        bind:value={note}
    ></textarea>
    <div class="buttons">
        <button type="submit">Add Contact</button>
        <button type="reset" on:click={() => { name = ""; number = ""; email = ""; note = ""; }}>Reset</button>
        <button type="button" class="close" on:click={() => dispatch("close")}>
            Close
        </button>
    </div>
</form>

<style>
    /* your styles go here */
</style>