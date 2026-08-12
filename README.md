# DICHA STUDIO

Site Next.js de DICHA STUDIO — musique, visuels et culture.

## Stack

- Next.js 16 (App Router) + React 19 + Tailwind CSS 4
- Prisma 7 + PostgreSQL (`pg` adapter)
- Déploiement cible : [Vercel](https://vercel.com)

## Développement local

```bash
npm install
cp .env.example .env
# renseigner DATABASE_URL (PostgreSQL)
npm run db:generate
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Le contenu public actuel s’appuie sur des données mock ; Prisma est prêt pour brancher la base.

## Déploiement Vercel

1. Importer le repo GitHub : [Exaucekis/DICHA-STUDIO](https://github.com/Exaucekis/DICHA-STUDIO)
2. Framework : **Next.js** (détecté automatiquement via `vercel.json`)
3. Build Command : `npm run build` (`prisma generate && next build`)
4. Install Command : `npm install` (lance aussi `postinstall` → `prisma generate`)
5. Ajouter les variables d’environnement (Production + Preview) :

| Variable | Obligatoire | Description |
| --- | --- | --- |
| `DATABASE_URL` | Oui* | URL PostgreSQL (`sslmode=require` recommandé) |
| `NEXT_PUBLIC_SITE_URL` | Oui | URL publique (`https://….vercel.app` ou domaine custom) |
| `AUTH_SECRET` | Recommandé | Secret aléatoire long |
| `NEXT_PUBLIC_ACCENT_COLOR` | Non | `#03A7A8` (couleur logo) |
| `BLOB_READ_WRITE_TOKEN` | Non | Si vous utilisez Vercel Blob |

\* Même si le front tourne encore sur du mock, `prisma generate` / le client généré nécessitent la config Prisma. Fournissez une URL Postgres valide (Neon, Prisma Postgres, Supabase, etc.).

6. Deploy → vérifier le build dans les logs Vercel.

### Base de données

Après le premier deploy réussi :

```bash
# localement, pointant vers la DATABASE_URL de prod/preview
npx prisma db push
# ou plus tard : npx prisma migrate deploy
```

### Domaine

Dans Vercel → Project → Domains, ajouter le domaine custom et mettre à jour `NEXT_PUBLIC_SITE_URL`.

## Scripts utiles

| Script | Rôle |
| --- | --- |
| `npm run dev` | Serveur local |
| `npm run build` | Build production (Prisma + Next) |
| `npm run db:generate` | Génère le client Prisma |
| `npm run db:push` | Pousse le schéma vers la DB |
| `npm run lint` | ESLint |

## Contact

Téléphone / WhatsApp : **0977 893 094**
