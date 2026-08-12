import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  className,
  action,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-14",
        align === "center"
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={align === "center" ? "max-w-2xl" : undefined}>
        {eyebrow && (
          <span className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-accent">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "mt-3 text-base text-muted-foreground md:text-lg",
              align === "center" ? "mx-auto max-w-xl" : "max-w-xl",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
