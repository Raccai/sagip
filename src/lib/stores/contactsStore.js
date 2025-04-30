// $lib/stores/contactsStore.js
import { writable } from 'svelte/store';

// Create a writable store for contacts
const contactsStore = writable([]);

// Export functions to manipulate the store
export const contactsApi = {
  subscribe: contactsStore.subscribe,
  
  addContact: (contact) => {
    if (!contact || !contact.id || !contact.name || !contact.number) {
      console.error("Invalid contact data", contact);
      return false;
    }
    
    contactsStore.update(contacts => {
      // Ensure the contact has an ID to avoid duplicates
      if (!contact.id) {
        contact.id = crypto.randomUUID();
      }
      console.log("Adding contact:", contact);
      return [contact, ...contacts];
    });
    return true;
  },
  
  updateContact: (updatedContact) => {
    if (!updatedContact || !updatedContact.id) {
      console.error("Invalid contact data for update", updatedContact);
      return false;
    }
    
    let updated = false;
    contactsStore.update(contacts => {
      const index = contacts.findIndex(c => c.id === updatedContact.id);
      if (index !== -1) {
        contacts[index] = { ...updatedContact };
        updated = true;
        console.log("Updated contact:", updatedContact.id);
      } else {
        console.warn("Contact not found for update:", updatedContact.id);
      }
      return [...contacts]; // Return a new array to trigger reactivity
    });
    return updated;
  },
  
  deleteContact: (id) => {
    if (!id) {
      console.error("Invalid ID for deletion");
      return false;
    }
    
    let deleted = false;
    contactsStore.update(contacts => {
      console.log("Deleting contact:", id);
      const beforeCount = contacts.length;
      const filtered = contacts.filter(contact => contact.id !== id);
      const afterCount = filtered.length;
      console.log(`Contacts count: ${beforeCount} → ${afterCount}`);
      
      if (beforeCount === afterCount) {
        console.warn("No contact was deleted! ID not found:", id);
      } else {
        deleted = true;
        console.log("Contact successfully deleted:", id);
      }
      return filtered;
    });
    return deleted;
  },
  
  // For testing purposes
  setDummyData: () => {
    const dummyContacts = [
      { id: "1", name: "John Doe", number: "123-456-7890", email: "john@example.com" },
      { id: "2", name: "Jane Smith", number: "098-765-4321", email: "jane@example.com" }
    ];
    contactsStore.set(dummyContacts);
    console.log("Set dummy data:", dummyContacts.length, "contacts");
    return true;
  },
  
  // Get all contacts
  getAllContacts: () => {
    let contacts = [];
    contactsStore.subscribe(value => {
      contacts = value;
    })();
    return contacts;
  },
  
  // Debug: print all contacts to console
  debugPrintContacts: () => {
    contactsStore.subscribe(contacts => {
      console.log("--- Current Contacts ---");
      contacts.forEach((contact, index) => {
        console.log(`[${index}] ID: ${contact.id}, Name: ${contact.name}`);
      });
      console.log("------------------------");
    })();
  }
};

// Initialize with some test data in development
if (typeof window !== 'undefined') {
  try {
    // Try to load from localStorage first
    const stored = localStorage.getItem('contacts');
    if (stored) {
      try {
        const parsedContacts = JSON.parse(stored);
        if (Array.isArray(parsedContacts) && parsedContacts.length > 0) {
          contactsStore.set(parsedContacts);
          console.log("Loaded", parsedContacts.length, "contacts from localStorage");
        } else {
          // If no valid contacts in localStorage, set dummy data
          contactsApi.setDummyData();
        }
      } catch (parseError) {
        console.error("Failed to parse contacts from localStorage:", parseError);
        contactsApi.setDummyData();
      }
    } else {
      // If no localStorage data, set dummy data
      contactsApi.setDummyData();
    }
    
    // Set up localStorage persistence
    contactsStore.subscribe(contacts => {
      try {
        localStorage.setItem('contacts', JSON.stringify(contacts));
        console.log("Saved", contacts.length, "contacts to localStorage");
      } catch (e) {
        console.error("Failed to save contacts to localStorage:", e);
      }
    });
  } catch (e) {
    console.error("Error initializing contacts store:", e);
    // Fallback to dummy data if there's an error
    contactsApi.setDummyData();
  }
}

// Export both the store and the API
export { contactsStore };