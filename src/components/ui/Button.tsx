import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-hover font-semibold tracking-wide shadow-[0_0_0_0_rgba(3,167,168,0)] hover:shadow-[0_8px_32px_-8px_rgba(3,167,168,0.55)]",
  secondary:
    "bg-surface-elevated text-foreground hover:bg-surface-hover border border-border",
  ghost: "text-foreground hover:bg-surface-hover",
  outline:
    "border border-border text-foreground hover:border-accent hover:text-accent hover:bg-accent/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-none transition-all duration-300 uppercase tracking-widest disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
