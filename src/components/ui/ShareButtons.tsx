"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 flex-wrap">
        <Share2 className="w-4 h-4 text-muted-foreground" />
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors px-2 py-1 border border-border hover:border-accent"
          >
            {link.name}
          </a>
        ))}
        <button
          onClick={copyLink}
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors px-2 py-1 border border-border hover:border-accent flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" /> Copié
            </>
          ) : (
            <>
              <Link2 className="w-3 h-3" /> Copier
            </>
          )}
        </button>
      </div>
    </div>
  );
}
