"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, buildWhatsappLink, whatsappMessages } from "@/lib/site-data";
import { CtaButton } from "./CtaButton";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <a
          href="#topo"
          className="font-display text-lg tracking-tight text-ink md:text-xl"
        >
          Silas Freire
          <span className="ml-1.5 text-brass-dim">Advocacia</span>
        </a>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-stone transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CtaButton
            href={buildWhatsappLink(whatsappMessages.default)}
            className="!px-5 !py-2.5 text-sm"
          >
            WhatsApp
          </CtaButton>
        </div>

        <button
          type="button"
          className="p-2 text-ink lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegação móvel"
          className="border-t border-ink/10 bg-paper px-5 py-5 lg:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaButton
            href={buildWhatsappLink(whatsappMessages.default)}
            className="mt-5 w-full"
          >
            Falar no WhatsApp
          </CtaButton>
        </nav>
      )}
    </header>
  );
}
