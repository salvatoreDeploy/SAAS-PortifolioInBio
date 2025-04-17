export function ProjectCard() {
  return (
    <div className="w-[430px] h-[132px] flex gap-5 bg-secondary p-3 rounded-[20px] border border-transparent hover:border-secondary">
      <div className="size-24 rounded-md overflow-hidden shrink-0">
        <img
          src="/project1.jpg"
          alt="Projeto numero 1"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="uppercase text-xs font-bold text-green">
          10 Cliques
        </span>
        <div className="flex flex-col">
          <span className="text-heading font-bold text-xl">Projeto 1</span>
          <span className="text-body text-sm">
            Descrição super detalhada do que o projeto faz
          </span>
        </div>
      </div>
    </div>
  );
}
