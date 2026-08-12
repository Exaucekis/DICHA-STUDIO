export function AdminPlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h1 className="font-display text-2xl uppercase mb-4">{title}</h1>
      <p className="text-muted-foreground">
        {description ??
          "Module CMS connecté au schéma Prisma. Configurez DATABASE_URL pour persister les données."}
      </p>
    </div>
  );
}
