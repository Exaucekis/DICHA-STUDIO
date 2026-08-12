import Image from "next/image";
import { cn } from "@/lib/utils";

interface ArtImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: "dark" | "warm" | "accent" | "none";
  kenBurns?: boolean;
  aspect?: string;
}

export function ArtImage({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = "100vw",
  overlay = "dark",
  kenBurns = false,
  aspect,
}: ArtImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-elevated",
        aspect,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover transition-transform duration-[1.2s] ease-out",
          kenBurns && "animate-ken-burns",
          imageClassName,
        )}
      />
      {overlay !== "none" && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none",
            overlay === "dark" &&
              "bg-gradient-to-t from-black/80 via-black/20 to-black/30",
            overlay === "warm" &&
              "bg-gradient-to-br from-black/70 via-teal-950/30 to-black/50",
            overlay === "accent" &&
              "bg-gradient-to-t from-black/90 via-black/40 to-accent/15",
          )}
        />
      )}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
