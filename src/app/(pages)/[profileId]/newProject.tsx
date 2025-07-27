"use client";

import { Modal } from "@/app/components/ui/modal";
import { Plus } from "lucide-react";
import { useState } from "react";

type NewProjectProps = {
  projectId: string;
};

export function NewProject({ projectId }: NewProjectProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="w-[340px] h-[132px] rounded-[20px] bg-secondary flex items-center gap-2 justify-center hover:border border-dashed border-secondary"
      >
        <Plus className="size-10 text-green" />
        <span>Novo projeto</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="border p-10">Hello Modal</div>
      </Modal>
    </>
  );
}
