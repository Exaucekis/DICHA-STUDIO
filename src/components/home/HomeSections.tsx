"use client";

import Link from "next/link";
import Image from "next/image";
import { visuals } from "@/lib/data/visuals";
import { tracks, videos, artists, services } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackCard } from "@/components/music/TrackCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArtImage } from "@/components/ui/ArtImage";
import { Reveal } from "@/components/ui/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function MusicSection() {
  return (
    <section className="section-padding">
      <div className="container-dicha">
        <Reveal>
          <SectionHeading
            eyebrow="Catalogue"
            title="Musique"
            subtitle="Trap, Amapiano, R&B, Sébène — le son DICHA STUDIO."
            action={
              <Button href="/musique" variant="outline" size="sm">
                Catalogue
              </Button>
            }
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {tracks.slice(0, 3).map((track, i) => (
            <Reveal key={track.id} delay={(i + 1) as 1 | 2 | 3}>
              <TrackCard track={track} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideosSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(3,167,168,0.08),_transparent_50%)]" />
      <div className="container-dicha relative">
        <Reveal>
          <SectionHeading
            eyebrow="Image"
            title="Vidéos"
            subtitle="Clips, teasers, coulisses et émissions."
            action={
              <Button href="/videos" variant="outline" size="sm">
                Toutes les vidéos
              </Button>
            }
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.slice(0, 3).map((video, i) => (
            <Reveal key={video.id} delay={(i + 1) as 1 | 2 | 3} variant="scale">
              <Link
                href={`/videos/${video.slug}`}
                className="lift-hover group block overflow-hidden border border-border-subtle hover:border-accent/40"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/10" />
                  <Badge className="absolute left-3 top-3" variant="accent">
                    {video.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold uppercase transition-colors group-hover:text-accent">
                    {video.title}
                  </h3>
                  {video.artist && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {video.artist}
                    </p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArtistsSection() {
  return (
    <section className="section-padding">
      <div className="container-dicha">
        <Reveal>
          <SectionHeading
            eyebrow="Roster"
            title="Artistes"
            subtitle="Les talents accompagnés par DICHA STUDIO."
            action={
              <Button href="/artistes" variant="outline" size="sm">
                Tous les artistes
              </Button>
            }
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist, i) => (
            <Reveal key={artist.id} delay={(Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5)}>
              <Link
                href={`/artistes/${artist.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden border border-border-subtle transition-colors duration-500 hover:border-accent"
              >
                <Image
                  src={artist.photoUrl}
                  alt={artist.photoAlt ?? artist.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 translate-y-1 p-6 transition-transform duration-500 group-hover:translate-y-0">
                  <Badge variant="accent">{artist.genre}</Badge>
                  <h3 className="mt-2 font-display text-2xl font-bold uppercase">
                    {artist.name}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BriefingSection() {
  return (
    <section className="section-padding border-y border-border bg-surface">
      <div className="container-dicha grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="left">
          <Badge variant="accent" className="mb-4">
            Émission
          </Badge>
          <h2 className="font-display text-4xl font-bold uppercase md:text-5xl">
            DICHA Briefing
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Le programme audiovisuel de DICHA STUDIO. Culture, musique, invités
            et coulisses du studio.
          </p>
          <Button href="/briefing" className="mt-8">
            Voir les épisodes
          </Button>
        </Reveal>
        <Reveal variant="scale" delay={2}>
          <Link
            href="/briefing"
            className="group relative block aspect-video overflow-hidden border border-border transition-colors duration-500 hover:border-accent/50"
          >
            <ArtImage
              src={visuals.briefing}
              alt="DICHA Briefing"
              overlay="warm"
              className="absolute inset-0"
              imageClassName="group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="container-dicha">
        <Reveal>
          <SectionHeading
            eyebrow="Studio"
            title="Services"
            subtitle="Production musicale, audiovisuelle et créative."
            action={
              <Button href="/services" variant="outline" size="sm">
                Nos prestations
              </Button>
            }
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service, i) => (
            <Reveal key={service.id} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <Link
                href={`/services/${service.slug}`}
                className="lift-hover group block border border-border-subtle bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-elevated"
              >
                <span className="font-display text-2xl font-bold text-accent opacity-40 transition-opacity group-hover:opacity-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold uppercase transition-colors group-hover:text-accent">
                  {service.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutPreview() {
  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <ArtImage
          src={visuals.studio}
          alt=""
          overlay="dark"
          className="absolute inset-0"
          sizes="100vw"
        />
      </div>
      <div className="container-dicha relative max-w-3xl text-center">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Identité"
            title="À propos"
            subtitle="DICHA MULTI SERVICES — structure créative et audiovisuelle dédiée à la production, la promotion et la diffusion de contenus musicaux et visuels."
          />
          <Button href="/a-propos" variant="outline">
            En savoir plus
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-accent-muted" />
      <div className="ambient-glow pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[110px]" />
      <div className="container-dicha relative text-center">
        <Reveal>
          <div className="mb-8 flex justify-center">
            <BrandLogo size="md" href={null} />
          </div>
          <h2 className="font-display text-3xl font-bold uppercase md:text-5xl">
            Un projet en tête ?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Contactez DICHA STUDIO pour discuter de votre production musicale ou
            audiovisuelle.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/devis" size="lg">
              Demander un devis
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Nous contacter
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
