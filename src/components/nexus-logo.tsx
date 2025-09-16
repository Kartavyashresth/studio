import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function NexusLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn("text-primary", props.className)}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l7 7" />
      <path d="M15 3l-1.5 1.5" />
      <path d="M21 9l-1.5-1.5" />
      <path d="M9 21l1.5-1.5" />
      <path d="M3 15l1.5 1.5" />
    </svg>
  );
}
