import { ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  label: string;
  aspect?: string;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Placeholder visual explícito para fotos reais que o cliente ainda precisa
 * fornecer (ex.: foto do advogado, foto do escritório). Nunca substituir por
 * uma foto de banco de imagens sem identificação — isso violaria a regra de
 * não inventar fotos da empresa.
 */
export function ImagePlaceholder({
  label,
  aspect = "aspect-[4/5]",
  tone = "dark",
  className = "",
}: ImagePlaceholderProps) {
  const toneStyles =
    tone === "dark"
      ? "border-ivory/25 bg-ink-soft/60"
      : "border-ink/20 bg-ink/[0.03]";
  const iconColor = tone === "dark" ? "text-ivory/40" : "text-ink/30";
  const labelColor = tone === "dark" ? "text-ivory/40" : "text-stone-light";
  const textColor = tone === "dark" ? "text-ivory/70" : "text-stone";

  return (
    <div
      className={`${aspect} flex flex-col items-center justify-center gap-3 border border-dashed px-6 text-center ${toneStyles} ${className}`}
      role="img"
      aria-label={`Espaço reservado para: ${label}`}
    >
      <ImageIcon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
      <p className={`text-xs ${labelColor}`}>Substituir por foto real</p>
      <p className={`max-w-[14rem] text-sm ${textColor}`}>{label}</p>
    </div>
  );
}
