"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  loading,
  onConfirm,
}) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Modal
      title="Are you sure?"
      isOpen={isOpen}
      onClose={onClose}
      description="This Action is irreversible"
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
        {loading ? <div className="spinner" /> : ""}
            {loading ? "Deleting ..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};
