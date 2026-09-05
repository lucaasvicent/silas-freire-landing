import Link from "next/link";
import { WhatsappIcon } from "./WhatsappIcon";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

const variantStyles: Record<string, string> = {
  solid: "bg-brass text-ink hover:bg-brass-light",
  outline:
    "border border-ink/15 text-ink hover:border-ink/30 bg-transparent",
  ghost: "border border-ivory/25 text-ivory hover:border-ivory/50 bg-transparent",
};

export function CtaButton({
  href,
  children,
  variant = "solid",
  className = "",
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[0.95rem] font-medium transition-colors duration-200 ${variantStyles[variant]} ${className}`}
    >
      <WhatsappIcon className="h-4 w-4" />
      {children}
    </Link>
  );
}
