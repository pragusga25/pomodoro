'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function CollapsibleCard({
  title,
  children,
  defaultExpanded = true,
}: CollapsibleCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-card text-card-foreground rounded-lg border shadow-sm h-fit">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button variant="ghost" size="sm">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div
        className={cn(
          'transition-all duration-200 ease-in-out',
          isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
        )}
      >
        {children}
      </div>
    </div>
  );
}
