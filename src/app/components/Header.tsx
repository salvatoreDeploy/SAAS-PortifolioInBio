import { Auth } from "../server/manage-auth";
import { auth } from "../lib/auth";
import Button from "./ui/Button";

export default async function Header() {
  const session = await auth();

  return (
    <div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto flex items-center justify-between py-10">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="ProjectInBio logo imagem" />

        <h3 className="text-heading text-2xl font-bold">PortifolioInBio</h3>
      </div>

      <div className="flex items-center gap-4">
        {session && <Button>Minha página</Button>}
        <form action={Auth}>
          <Button>{session ? "Sair" : "Login"}</Button>
        </form>
      </div>
    </div>
  );
}
