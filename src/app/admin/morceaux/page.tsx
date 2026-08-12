import Link from "next/link";
import { tracks } from "@/lib/data/mock-data";
import { formatDuration } from "@/lib/utils";

export default function AdminMorceauxPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl uppercase">Morceaux</h1>
        <Link
          href="/admin/morceaux/nouveau"
          className="px-4 py-2 bg-accent text-background text-xs uppercase tracking-widest font-semibold"
        >
          + Nouveau
        </Link>
      </div>
      <div className="border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-elevated text-left">
            <tr>
              <th className="p-4 font-medium text-muted-foreground">Titre</th>
              <th className="p-4 font-medium text-muted-foreground">Artiste</th>
              <th className="p-4 font-medium text-muted-foreground">Genre</th>
              <th className="p-4 font-medium text-muted-foreground">Durée</th>
              <th className="p-4 font-medium text-muted-foreground">Statut</th>
              <th className="p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track) => (
              <tr key={track.id} className="border-t border-border hover:bg-surface-hover">
                <td className="p-4 font-medium">{track.title}</td>
                <td className="p-4 text-muted-foreground">{track.artist}</td>
                <td className="p-4">{track.genre}</td>
                <td className="p-4 tabular-nums">{formatDuration(track.duration)}</td>
                <td className="p-4">
                  <span className="text-xs uppercase tracking-widest text-accent">Publié</span>
                </td>
                <td className="p-4">
                  <Link href={`/admin/morceaux/${track.slug}`} className="text-accent hover:underline text-xs">
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
