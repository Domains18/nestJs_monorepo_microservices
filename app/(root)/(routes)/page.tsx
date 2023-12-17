"use client";

// Importing useEffect hook from React
import { useEffect } from "react";

// Importing custom hook useStoreModal
import { useStoreModal } from "@/hooks/use-store-modal";

// Component SetupPage
const SetupPage = () => {
  // Getting onOpen function from useStoreModal hook
  const onOpen = useStoreModal((state) => state.onOpen);
  // Getting isOpen state from useStoreModal hook
  const isOpen = useStoreModal((state) => state.isOpen);

  // useEffect hook to open the modal if it's not already open
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]); // Dependency array for useEffect, re-run if isOpen or onOpen changes

  return null; // Currently, the component doesn't render anything
};
 
// Exporting SetupPage as default
export default SetupPage;