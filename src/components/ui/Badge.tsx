import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
        variant === "default" && "bg-surface-elevated text-muted-foreground",
        variant === "accent" && "bg-accent-muted text-accent",
        variant === "outline" && "border border-border text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
