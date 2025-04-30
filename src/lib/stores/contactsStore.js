import { browser } from '$app/environment';
import { writable } from 'svelte/store';

let initialContacts = [];

if (browser) {
    const storedContacts = localStorage.getItem('contacts');
    initialContacts = storedContacts ? JSON.parse(storedContacts) : [];
}

export const contactsStore = writable(initialContacts);

if (browser) {
    contactsStore.subscribe((contacts) => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    });
}