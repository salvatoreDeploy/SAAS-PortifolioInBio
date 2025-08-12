"use client";

import Button from "@/app/components/ui/Button";
import { Modal } from "@/app/components/ui/modal";
import TextArea from "@/app/components/ui/TextArea";
import TextInput from "@/app/components/ui/TextInput";
import { createProject } from "@/app/server/createProject";
import { compressFile } from "@/app/utils/compressFile";
import { ArrowUpFromLine, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { startTransition, useState } from "react";

type NewProjectProps = {
  projectId: string;
};

export function NewProject({ projectId }: NewProjectProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleTriggerImageInput(id: string) {
    document.getElementById(id)?.click();
  }

  function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      const imageURL = URL.createObjectURL(file);

      return imageURL;
    }

    return null;
  }

  async function handleCreateProject() {
    setIsCreatingProject(true);

    const imageInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;

    if (!imageInput.files) {
      return;
    }

    const compressedFile = await compressFile(Array.from(imageInput.files));

    const formData = new FormData();

    formData.append("file", compressedFile[0]);
    formData.append("profileId", projectId);
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectUrl", projectUrl);

    await createProject(formData);

    startTransition(() => {
      setIsOpen(false);
      setIsCreatingProject(false);
      setProjectName(""), setProjectImage("");
      setProjectUrl("");
      setProjectDescription("");

      router.refresh();
    });
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
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt="Imagem do projeto"
                    className="object-center object-cover"
                  />
                ) : (
                  <button
                    onClick={() => handleTriggerImageInput("imageInput")}
                    className="w-full h-full"
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                className="text-heading flex gap-2"
                onClick={() => handleTriggerImageInput("imageInput")}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProjectImage(handleImageInput(e))}
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
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
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
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-heading font-bold">
                  URL do projeto
                </label>
                <TextInput
                  id="project-url"
                  placeholder="Digite a URL do projeto"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <Modal.Close className="font-bold text-heading">Voltar</Modal.Close>
            <Button onClick={handleCreateProject}>
              Salvar
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
