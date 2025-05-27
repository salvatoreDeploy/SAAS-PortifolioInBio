import { TRIAL_DAYS } from "@/config";
import Button from "./ui/Button";

export default function Princing() {
  return (
    <div className="my-[150px] flex flex-col items-center gap-14">
      <div className="flex flex-col items-center gap-6">
        <h3 className="text-4xl font-bold text-shadow-heading ">
          Um valor acessível a todos
        </h3>
        <p className="text-body text-xl text-center">
          Junte-se à comunidade de criadores profisisonais que já estão elevando
          a sua <br />
          presença online. Teste gratuitamente por{" "}
          <strong>{TRIAL_DAYS} dias</strong>, sem compromisso.
        </p>
      </div>
      <div className="flex items-end gap-9">
        <div className="w-[304px] p-8 flex flex-col gap-7 rounded-2xl border border-[#1E1E1E]">
          <div className="flex flex-col">
            <span className="text-heading font-bold text-2xl">Mensal</span>
            <span className="text-body">Apenas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-heading font-bold text-[48px]">R$ 9,90</span>
            <span className="text-headline">Mês</span>
          </div>
          <Button variant="secondary">Assinar</Button>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center items-center rounded-t-2xl p-2 w-[304px] bg-[linear-gradient(90deg,#4B2DBB_0%,#B5446B_100%)]">
            <span className="uppercase text-xs font-bold">Recomendado</span>
          </div>
          <div className="p-[1.6px] bg-[linear-gradient(90deg,#4B2DBB_0%,#B5446B_10%)] rounded-b-2xl">
            <div className="w-full bg-border-secondary p-8 flex flex-col gap-7 rounded-b-2xl">
              <div className="flex flex-col">
                <span className="text-headline font-bold text-2xl">
                  Vitalício
                </span>
                <span className="text-body">Economize com</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-heading font-bold text-[48px]">
                  R$ 99,00
                </span>
              </div>
              <Button variant="secondary">Assinar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
