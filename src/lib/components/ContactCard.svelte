<script>
    import createEventDispatcher from 'svelte';

    export let contact;
    const dispatch = createEventDispatcher();
</script>

<div class="contact-card">
    <div class="title-icon">
        <h2>{contact.name}</h2>
    </div>

    <div class="number">
        <h4>
            <strong>{contact.number}</strong>
        </h4>
    </div>

    <div class="email">
        <h5>Email:</h5>
        <p>{contact.email}</p>
    </div>

    <div class="note">
        <h5>Note:</h5>
        <p>{contact.note}</p>
    </div>

    <div class="buttons">
        <button class="copy-num" on:click={() => navigator.clipboard.writeText(contact.number)}>
            Copy Number
        </button>
        <button class="delete-contact" on:click={() => contactsStore.update(contacts => contacts.filter(c => c.id !== contact.id))}>
            Delete
        </button>
        <button class="edit-contact" on:click={() => dispatch('edit', contact)}>
            Edit
        </button>
    </div>
</div>

<style>
    /* your styles go here */
</style>