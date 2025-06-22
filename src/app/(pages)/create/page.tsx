import Header from "@/app/components/Header";
import Button from "@/app/components/ui/Button";
import TextInput from "@/app/components/ui/TextInput";
import { Rocket } from "lucide-react";

export default function ProjectPageCreate() {
  return (
    <div>
      <Header />

      <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-heading">Escolha seu link</h1>
          <Rocket className="size-10" />
        </div>
        <form action="" className="w-full flex items-center gap-2">
          <span>projectin.com/</span>
          <TextInput />
          <Button className="w-[126px]">Criar</Button>
        </form>
        <div>
          <span className="text-pink">Error de exemplo</span>
        </div>
      </div>
    </div>
  );
}
