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
        <path d="M12 2L2 12h7l-1 10 11-12h-7l1-8z" />
    </svg>
  );
}
