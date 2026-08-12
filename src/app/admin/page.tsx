import Link from "next/link";
import {
  Music,
  Video,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";
import { tracks, videos, artists, articles, services } from "@/lib/data/mock-data";

const stats = [
  { label: "Morceaux", value: tracks.length, icon: Music, href: "/admin/morceaux" },
  { label: "Vidéos", value: videos.length, icon: Video, href: "/admin/videos" },
  { label: "Artistes", value: artists.length, icon: Users, href: "/admin/artistes" },
  { label: "Articles", value: articles.length, icon: FileText, href: "/admin/articles" },
  { label: "Devis", value: 0, icon: MessageSquare, href: "/admin/devis" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase mb-2">
        DICHA STUDIO Admin
      </h1>
      <p className="text-muted-foreground mb-8">
        Tableau de bord — gestion de la plateforme
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border border-border bg-surface p-6 hover:border-accent transition-colors group"
          >
            <stat.icon className="w-6 h-6 text-accent mb-4" />
            <p className="text-3xl font-display font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground group-hover:text-foreground mt-1">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-accent" />
            <h2 className="font-display uppercase">Statistiques</h2>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>Lectures totales : {tracks.reduce((a, t) => a + (t.playCount ?? 0), 0).toLocaleString("fr-FR")}</li>
            <li>Morceau populaire : {tracks.sort((a, b) => (b.playCount ?? 0) - (a.playCount ?? 0))[0]?.title}</li>
            <li>Services actifs : {services.length}</li>
          </ul>
        </section>

        <section className="border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-accent" />
            <h2 className="font-display uppercase">Actions rapides</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <AdminLink href="/admin/morceaux/nouveau">+ Morceau</AdminLink>
            <AdminLink href="/admin/videos/nouveau">+ Vidéo</AdminLink>
            <AdminLink href="/admin/artistes/nouveau">+ Artiste</AdminLink>
            <AdminLink href="/admin/parametres">Paramètres</AdminLink>
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-xs uppercase tracking-widest border border-border hover:border-accent hover:text-accent transition-colors"
    >
      {children}
    </Link>
  );
}
