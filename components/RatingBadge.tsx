import { Star } from "lucide-react";
import { business } from "@/lib/site-data";

type RatingBadgeProps = {
  tone?: "dark" | "light";
  className?: string;
};

export function RatingBadge({ tone = "light", className = "" }: RatingBadgeProps) {
  const textColor = tone === "dark" ? "text-ivory/90" : "text-stone";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} className="fill-brass text-brass" />
        ))}
      </div>
      <p className={`text-sm ${textColor}`}>
        <span className="font-medium">{business.rating.value}</span> no Google,
        com {business.rating.count} avaliações
      </p>
    </div>
  );
}
