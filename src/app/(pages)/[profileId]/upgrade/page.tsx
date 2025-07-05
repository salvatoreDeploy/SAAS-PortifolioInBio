import Header from "@/app/components/Header";
import Button from "@/app/components/ui/Button";

export default function UpgradePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Header />
      <h1 className="text-2xl font-bold">Upgrade your plan</h1>
      <div className="flex gap-4">
        <Button>R$ 9,90 /mês</Button>
        <Button>R$ 99,90 vitalicio</Button>
      </div>
    </div>
  );
}
