import { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const PageHero = ({ eyebrow, title, subtitle, children }: PageHeroProps) => (
  <section className="bg-secondary border-b border-border/60">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center max-w-3xl">
      <ScrollReveal>
        {eyebrow && (
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">{eyebrow}</p>
        )}
        <h1 className="font-heading text-4xl md:text-6xl font-light leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-lg leading-relaxed mt-5">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </ScrollReveal>
    </div>
  </section>
);

export default PageHero;
