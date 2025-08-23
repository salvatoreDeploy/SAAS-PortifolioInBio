import { ProjectData } from "@/app/server/getProfileProjectsData";

interface ProjectCardParams {
  project: ProjectData;
  isOwner: boolean;
  img: string;
}

export function ProjectCard({ project, isOwner, img }: ProjectCardParams) {
  return (
    <div className="w-[340px] h-[132px] flex gap-5 bg-secondary p-3 rounded-[20px] border border-transparent hover:border-secondary">
      <div className="size-24 rounded-md overflow-hidden shrink-0">
        <img
          src={img}
          alt="Projeto numero 1"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        {isOwner && (
          <span className="uppercase text-xs font-bold text-green">
            {project.totalVisits || 0} Cliques
          </span>
        )}
        <div className="flex flex-col">
          <span className="text-heading font-bold text-xl">Projeto 1</span>
          <span className="text-body text-sm">
            {project.projectDescription}
          </span>
        </div>
      </div>
    </div>
  );
}
