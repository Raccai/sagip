import { writable } from "svelte/store";

const defaultData = {
  info: {
    name: "",
    age: "",
    sex: "",
    bloodType: "",
    height: "",
    weight: "",
    notes: "",
  },
  illnesses: [],
  pills: [],
  history: [] // { type: "surgery" | "illness" | "allergy", description: string}
};

const stored = typeof localStorage !== "undefined" ? localStorage.getItem("personalDetails") : null;
const parsed = stored ? JSON.parse(stored) : defaultData;

export const detailsStore = writable(parsed);

// Persist changes to localStorage
if (typeof localStorage !== "undefined") {
  detailsStore.subscribe((data) => {
    try {
      localStorage.setItem("personalDetails", JSON.stringify(data));
    } catch {
      console.error("Failed to save personal details to localStoragE: ", err);
    }
  })
}

// Future helper API functions (addPill, updatePill, etc.)