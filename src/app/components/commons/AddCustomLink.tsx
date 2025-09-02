"use client";

import { Plus } from "lucide-react";
import { Modal } from "../ui/modal";
import Button from "../ui/Button";
import { startTransition, useState } from "react";
import TextInput from "../ui/TextInput";
import { useParams, useRouter } from "next/navigation";
import { createCustomLink } from "@/app/server/createCustomLink";

type LinkCustomParam = {
  title: string;
  url: string;
};

export default function AddCustomLink() {
  const [isOpen, setIsOpen] = useState(false);
  const [linkCustom, setLinkCustom] = useState<LinkCustomParam>({
    title: "",
    url: "",
  });

  const router = useRouter();

  function handleOpenModal() {
    setIsOpen(true);
  }

  const { profileId } = useParams();

  if (!profileId) {
    return;
  }

  async function handleAddCustomLink() {
    await createCustomLink(profileId as string, linkCustom);

    startTransition(() => {
      setIsOpen(false);

      setLinkCustom({ title: "", url: "" });

      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
      >
        <Plus />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Content className="bg-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px] border border-secondary/60 ">
          <Modal.Title className="text-heading font-bold text-xl">
            Adicionar Link Pessoal
          </Modal.Title>
          <div className="flex flex-col gap-2">
            <p>Titulo do Link</p>
            <TextInput
              type="text"
              placeholder="Digite o Titulo"
              value={linkCustom.title}
              onChange={(e) =>
                setLinkCustom({ ...linkCustom, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>URL</p>
            <TextInput
              type="text"
              placeholder="Inserir a URL"
              value={linkCustom.url}
              onChange={(e) =>
                setLinkCustom({ ...linkCustom, url: e.target.value })
              }
            />
          </div>
          <div className="flex gap-4 justify-end">
            <Modal.Close className="font-bold text-heading">Voltar</Modal.Close>
            <Button onClick={handleAddCustomLink}>Salvar</Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
