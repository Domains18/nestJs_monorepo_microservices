// Importing the create function from zustand library
import { create } from "zustand";

// Defining an interface for the useStoreModalStore
interface useStoreModalStore{
    isOpen: boolean; // A boolean to track if the modal is open or not
    onOpen: () => void; // A function to open the modal
    onClose: () => void; // A function to close the modal
}

// Creating a Zustand store using the useStoreModalStore interface
export const useStoreModal = create<useStoreModalStore>((set) => ({
    isOpen: false, // Initial state of the modal is closed
    onOpen: () => set({ isOpen: true }), // Function to set the isOpen state to true, opening the modal
    onClose: () => set({ isOpen: false }) // Function to set the isOpen state to false, closing the modal
}))