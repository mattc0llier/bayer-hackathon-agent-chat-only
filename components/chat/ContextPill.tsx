'use client';

import { FileTextIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContextPillProps {
  title: string;
  onRemove: () => void;
  className?: string;
}

export function ContextPill({ title, onRemove, className }: ContextPillProps) {
  return (
    <div
      className={cn(
        "group relative flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-1 text-sm text-foreground transition-all hover:bg-muted",
        className
      )}
    >
      <FileTextIcon className="size-3.5 text-muted-foreground" />
      <span className="max-w-[150px] truncate">{title}</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-0.5 rounded-sm p-0.5 opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100"
        aria-label="Remove context"
      >
        <XIcon className="size-3" />
      </button>
    </div>
  );
}
