import { Github, Instagram, Linkedin, Twitter, Plus } from "lucide-react";
import Button from "../ui/Button";
import EditSocialLinks from "./EditSocialLinks";
import Link from "next/link";
import { ProfileDataResponse } from "@/app/server/getProfileData";

export default function UserCard({
  profileData,
}: {
  profileData?: ProfileDataResponse;
}) {
  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-heading/10 bg-[#121212] rounded-3xl text-heading">
      <div className="size-48">
        <img
          src="https://github.com/salvatoreDeploy.png"
          alt="Henrique Araujo GitHub"
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            Henrique Araujo
          </h3>
        </div>
        <p className="opacity-40">Desenvolvendo soluções para os clientes</p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <span className="uppercase text-xs font-medium">Links</span>
        <div className="flex gap-3">
          <Link
            href={`https://github.com/salvatoreDeploy`}
            target="_blank"
            className={`p-3 rounded-xl ${
              profileData?.socialMedias?.github
                ? "bg-[#4B2DBB] hover:opacity-80"
                : "bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            } `}
          >
            <Github />
          </Link>

          <Link
            href={`https://github.com/salvatoreDeploy`}
            target="_blank"
            className={`p-3 rounded-xl ${
              profileData?.socialMedias?.instagram
                ? "bg-[#4B2DBB] hover:opacity-80"
                : "bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            } `}
          >
            <Instagram />
          </Link>

          <Link
            href={`https://github.com/salvatoreDeploy`}
            target="_blank"
            className={`p-3 rounded-xl ${
              profileData?.socialMedias?.linkedin
                ? "bg-[#4B2DBB] hover:opacity-80"
                : "bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            } `}
          >
            <Linkedin />
          </Link>

          <Link
            href={`https://github.com/salvatoreDeploy`}
            target="_blank"
            className={`p-3 rounded-xl ${
              profileData?.socialMedias?.twitter
                ? "bg-[#4B2DBB] hover:opacity-80"
                : "bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            } `}
          >
            <Twitter />
          </Link>

          <EditSocialLinks socialMedias={profileData?.socialMedias} />
        </div>

        <div className="flex flex-col gap-3 w-full h-[172px]">
          <div className="w-full flex flex-col items-center gap-3">
            <Button className="w-full">Template SaaS - Compre Agora</Button>
            <button className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
