import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg" | "hero";

/** Logo plus large que haut (icône + wordmark intégré) — 1024×682 */
const sizes: Record<LogoSize, { width: number; height: number; className: string }> = {
  sm: { width: 120, height: 80, className: "h-10 w-auto" },
  md: { width: 200, height: 133, className: "h-14 w-auto sm:h-16" },
  lg: { width: 280, height: 186, className: "h-20 w-auto sm:h-24" },
  hero: {
    width: 520,
    height: 346,
    className: "h-36 w-auto sm:h-44 md:h-52 lg:h-60",
  },
};

interface BrandLogoProps {
  size?: LogoSize;
  href?: string | null;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  onClick?: () => void;
}

export function BrandLogo({
  size = "md",
  href = "/",
  className,
  imageClassName,
  priority = false,
  onClick,
}: BrandLogoProps) {
  const s = sizes[size];

  const mark = (
    <Image
      src="/brand/logo-dicha.png"
      alt="DICHA STUDIO"
      width={s.width}
      height={s.height}
      priority={priority}
      className={cn(
        s.className,
        "object-contain drop-shadow-[0_0_32px_rgba(3,167,168,0.45)]",
        imageClassName,
      )}
    />
  );

  if (href === null) {
    return <span className={cn("inline-flex", className)}>{mark}</span>;
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center transition-transform duration-500 hover:scale-[1.03]",
        className,
      )}
      aria-label="DICHA STUDIO — Accueil"
    >
      {mark}
    </Link>
  );
}
