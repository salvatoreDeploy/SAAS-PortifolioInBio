"use client";

import { ProjectCard } from "@/app/components/commons/ProjectCard";
import { TotalVisits } from "@/app/components/commons/TotalVisits";
import UserCard from "@/app/components/commons/UserCard";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();

  const profileId = params.profileId;

  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-tertiary">
        <span>Voce esta usando a versão trial</span>
        <button className="text-green font-bold">Faça o upgrade agora!</button>
      </div>
      <div className="w-1/2 flex justify-center h-min">
        <UserCard />
      </div>

      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />

        {/* Separar em outro componente */}
        <button className="w-[340px] h-[132px] rounded-[20px] bg-secondary flex items-center gap-2 justify-center hover:border border-dashed border-secondary">
          <Plus className="size-10 text-green" />
          <span>Novo projeto</span>
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  );
}
