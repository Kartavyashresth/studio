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
        <path d="M10 10l4 4m0-4l-4 4" />
        <path d="M4.2 19.8c-1.6-1.6-2-4.2-1.2-6.4s2.4-4 4.4-5.2" />
        <path d="M19.8 4.2c1.6 1.6 2 4.2 1.2 6.4s-2.4 4-4.4 5.2" />
        <path d="M4.2 4.2c1.6 1.6 4.2 2 6.4 1.2s4-2.4 5.2-4.4" />
        <path d="M19.8 19.8c-1.6-1.6-4.2-2-6.4-1.2s-4 2.4-5.2 4.4" />
    </svg>
  );
}
