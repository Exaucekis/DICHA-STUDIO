import { Button } from "@/components/ui/Button";
import { ArtImage } from "@/components/ui/ArtImage";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { visuals } from "@/lib/data/visuals";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-24 sm:items-center sm:pb-0 sm:pt-0 md:min-h-[92vh]">
      <ArtImage
        src={visuals.hero}
        alt="Univers musical DICHA STUDIO"
        priority
        kenBurns
        overlay="accent"
        className="absolute inset-0"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/55" />
      <div className="ambient-glow pointer-events-none absolute -left-10 bottom-10 h-72 w-72 rounded-full bg-accent/20 blur-[110px]" />
      <div className="ambient-glow pointer-events-none absolute right-0 top-20 h-56 w-56 rounded-full bg-accent/10 blur-[90px]" />

      <div className="container-dicha relative z-10 section-padding !py-0 sm:!py-16">
        <div className="max-w-3xl">
          <div className="hero-animate hero-delay-1 mb-6 sm:mb-8">
            <BrandLogo size="hero" href={null} priority />
          </div>

          <p className="hero-animate hero-delay-2 max-w-md font-display text-xl uppercase tracking-[0.12em] text-foreground/90 sm:text-2xl md:text-3xl">
            Music · Visuals · Culture
          </p>

          <p className="hero-animate hero-delay-3 mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            Création musicale et audiovisuelle pour artistes, créateurs et
            passionnés.
          </p>

          <div className="hero-animate hero-delay-4 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Button href="/musique" size="lg">
              Écouter maintenant
            </Button>
            <Button href="/devis" variant="outline" size="lg">
              Lancer un projet
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-white/10">
          <div className="h-full w-full origin-top bg-gradient-to-b from-accent to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
