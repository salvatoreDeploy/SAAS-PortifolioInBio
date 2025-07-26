"use client";

import Button from "@/app/components/ui/Button";
import TextInput from "@/app/components/ui/TextInput";
import { createProfileLink } from "@/app/server/createProfileLink";
import { sanitizeLink } from "@/app/utils/sanitizeLink";
import { verifyLink } from "@/app/utils/verifyLink";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

export function CreateLinkForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [link, setLink] = useState("");

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value));

    setError("");
  }

  async function handleSubmitURL(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (link.length === 0) {
      return setError("Campo obrigatorio!");
    }

    const isLinkTaken = await verifyLink(link);

    if (isLinkTaken) {
      return setError("Desculpe, mas esta url ja esta em uso!");
    }

    const isLinkCreated = await createProfileLink(link);

    if (!isLinkCreated) {
      return setError("Desculpe, erro ao criar seu link");
    }

    router.push(`/${link}`);
  }

  return (
    <>
      <form
        onSubmit={handleSubmitURL}
        className="w-full flex items-center gap-2"
      >
        <span>projectin.com/</span>
        <TextInput value={link} onChange={handleLinkChange} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div>
        <span className="text-pink">{error}</span>
      </div>
    </>
  );
}
