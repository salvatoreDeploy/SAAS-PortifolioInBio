"use client";

import { Github, Plus, Instagram, Twitter, Linkedin } from "lucide-react";
import { Modal } from "../ui/modal";
import { startTransition, useState } from "react";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { useParams, useRouter } from "next/navigation";
import { createSocialLinks } from "@/app/server/createSocialLinks";

export default function EditSocialLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const [github, setGithub] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const router = useRouter();

  function handleOpenModal() {
    setIsOpen(true);
  }

  const { profileId } = useParams();

  if (!profileId) {
    return;
  }

  async function handleAddSocialLink() {
    await createSocialLinks({
      profileId: profileId as string,
      github,
      instagram,
      linkedin,
      twitter,
    });

    startTransition(() => {
      setIsOpen(false);

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
            Adicionar rede social
          </Modal.Title>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full">
              <Github />
              <TextInput
                type="text"
                placeholder="Link do GitHub"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Instagram />
              <TextInput
                type="text"
                placeholder="Link do Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Twitter />
              <TextInput
                type="text"
                placeholder="Link do Twiter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Linkedin />
              <TextInput
                type="text"
                placeholder="Link do Linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <Modal.Close className="font-bold text-heading">Voltar</Modal.Close>
            <Button onClick={handleAddSocialLink}>Salvar</Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
