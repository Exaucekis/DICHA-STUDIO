import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="section-padding flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p className="text-accent text-6xl font-display font-bold">404</p>
      <h1 className="font-display text-2xl uppercase mt-4">Page introuvable</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Button href="/" className="mt-8">
        Retour à l&apos;accueil
      </Button>
    </div>
  );
}
