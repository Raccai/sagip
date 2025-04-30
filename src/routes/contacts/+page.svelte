<script>
    import ContactForm from '$lib/components/ContactForm.svelte';
    import ContactCard from '$lib/components/ContactCard.svelte';
    import { contactsStore } from '$lib/stores/contactsStore.js';

    let editingContact = null;
    let showFormModal = false;

    function openEditModal(contact) {
        editingContact = contact;
        showFormModal = true;
    }
    function closeEditModal() {
        editingContact = null;
        showFormModal = false;
    }

</script>

{#if showFormModal}
    <button class="modal-backdrop" on:click={closeEditModal} aria-label="Close" type="button">
        <dialog class="modal-content" open on:click|stopPropagation on:keydown={(e) => e.key === 'Escape' && closeEditModal()} aria-label="Edit Contact">
            <ContactForm {editingContact} />
        </dialog>
    </button>
{/if}

<div class="contact-list-cont">
    {#each $contactsStore as contact (contact.id)}
        <ContactCard {contact} on:edit={openEditModal} />
    {/each}
</div>

<div class="add-contact-btn-cont">
    <button class="add-contact-btn" on:click={() => showFormModal = true}>
        Add Contact
    </button>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        max-width: 500px;
        width: 100%;
    }

    .contact-list-cont {
        padding: 80px 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;

    }

    .add-contact-btn-cont {
        position: fixed;
        bottom: 80px; 
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: 50; /* Must be below your modal z-index if any */
        pointer-events: none; /* So clicks pass through if needed */
    }

    .add-contact-btn {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        pointer-events: auto; /* Enable click inside fixed container */
    }
    .add-contact-btn:active {
        background-color: #0056b3;
    }
</style>