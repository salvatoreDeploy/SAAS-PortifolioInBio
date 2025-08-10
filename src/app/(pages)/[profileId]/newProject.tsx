"use client";

import Button from "@/app/components/ui/Button";
import { Modal } from "@/app/components/ui/modal";
import TextArea from "@/app/components/ui/TextArea";
import TextInput from "@/app/components/ui/TextInput";
import { ArrowUpFromLine, Plus } from "lucide-react";
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
        <Modal.Content className="bg-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 border border-secondary/60 w-full max-w-[680px]">
          <Modal.Title className="text-heading font-bold text-xl">
            Novo projeto
          </Modal.Title>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-tertiary overflow-hidden">
                <button className="w-full h-full">100x100</button>
              </div>
              <button className="text-heading flex gap-2">
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="ImageInput"
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-name"
                  className="text-heading font-bold"
                >
                  Titulo do Projeto
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="text-heading font-bold"
                >
                  Descrição
                </label>
                <TextArea
                  id="project-description"
                  placeholder="Dê uma breve descrição do projeto"
                  className="h-36"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-heading font-bold">
                  URL do projeto
                </label>
                <TextInput
                  id="project-url"
                  placeholder="Digite a URL do projeto"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <Modal.Close className="font-bold text-heading">Voltar</Modal.Close>
            <Button>Salvar</Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
