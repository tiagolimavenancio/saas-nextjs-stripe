import logoSvg from "@/app/assets/logo.svg";
import Image from "next/image";

export default function Logo({ alt }: { alt?: string }) {
  return <Image src={logoSvg} alt={alt ?? "Logotipo"} />;
}
