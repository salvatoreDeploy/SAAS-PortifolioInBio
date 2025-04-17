import { ProjectCard } from "./commons/ProjectCard";
import { TotalVisits } from "./commons/TotalVisits";
import UserCard from "./commons/UserCard";
import Button from "./ui/Button";
import TextInput from "./ui/TextInput";

export default function Hero() {
  return (
    <div className="flex h-screen">
      <div className="w-full flex flex-col gap-2 mt-[35vh]">
        <h1 className="text-5xl font-bold text-heading leading-[64px]">
          Seus projetos e redes sociais em um unico link
        </h1>

        <h2 className="text-xl leading-6">
          Crie sua própria página de projetos e compartilhe eles com o mundo.
          <br />
          Acompanhe o engajamento com Analytics de cliques.
        </h2>

        <div className="flex items-center gap-2 w-full mt-[10vh]">
          <span className="text-heading text-xl">portifolioinbio.com</span>
          <TextInput placeholder="Seu link" />
          <Button>Criar agora</Button>
        </div>
      </div>
      <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative">
          <UserCard />
          <div className="absolute -bottom-[7%] -right-[45%]">
            <TotalVisits />
          </div>
          <div className="absolute top-[20%] -left-[45%] -z-10">
            <ProjectCard />
          </div>
          <div className="absolute -top-[10%] -left-[55%] -z-10">
            <ProjectCard />
          </div>
        </div>
      </div>
    </div>
  );
}
