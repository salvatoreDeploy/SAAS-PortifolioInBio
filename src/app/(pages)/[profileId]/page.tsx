import { ProjectCard } from "@/app/components/commons/ProjectCard";
import { TotalVisits } from "@/app/components/commons/TotalVisits";
import UserCard from "@/app/components/commons/UserCard";
import { auth } from "@/app/lib/auth";
import { getProfileData } from "@/app/server/getProfileData";
import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewProject } from "./newProject";
import { getProfileProjectData } from "@/app/server/getProfileProjectsData";
import { generateSignedDownloadUrl } from "@/app/server/createProject";

type ProfilePageParams = {
  params: Promise<{ profileId: string }>;
};

export default async function ProfilePage({ params }: ProfilePageParams) {
  const { profileId } = await params;

  const profileData = await getProfileData(profileId);

  if (!profileData) {
    return notFound();
  }

  const projects = await getProfileProjectData(profileId);

  const session = await auth();

  const isOwner = profileData.userId === session?.user?.id;

  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-tertiary">
        <span>Voce esta usando a versão trial</span>
        <Link href={`/${profileId}/upgrade`}>
          <button className="text-green font-bold">
            Faça o upgrade agora!
          </button>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center h-min">
        <UserCard />
      </div>

      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={await generateSignedDownloadUrl(project.imagePath)}
          />
        ))}

        {isOwner && <NewProject projectId={profileId} />}
      </div>

      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  );
}
