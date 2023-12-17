"use client";

// Importing StoreModal component from the modals directory
import { StoreModal } from "@/components/modals/store-modal";

// Importing useEffect and useState hooks from React
import { useEffect, useState } from "react";

// ModalProvider component
export const ModalProvider = () => {
  // State to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // useEffect hook to handle the hydration error especially on the client side
  // This hook runs once after the first render, setting isMounted to true
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not yet mounted, render nothing
  if (!isMounted) {
    return null;
  }

  // Once the component is mounted, render the StoreModal component
  return (
    <>
      <StoreModal />
    </>
  );
};
