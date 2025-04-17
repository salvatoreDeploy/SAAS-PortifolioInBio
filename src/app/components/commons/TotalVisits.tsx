import { TrendingUp } from "lucide-react";

export function TotalVisits() {
  return (
    <div className="w-min whitespace-nowrap flex items-center gap-5 bg-secondary border border-heading/10 px-8 py-3 rounded-xl shadow-lg">
      <span className="font-bold text-heading">Total de Visitas</span>
      <div className="flex items-center gap-2 text-green">
        <span className="text-3xl font-bold">87</span>
        <TrendingUp />
      </div>
      {/* <div className="flex items-center gap-2">
        <button>Portal</button>
        <button>Sair</button>
      </div> */}
    </div>
  );
}
