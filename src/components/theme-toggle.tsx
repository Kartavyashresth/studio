'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <DropdownMenuItem onSelect={() => setTheme('light')}>
        <Sun className="mr-2 h-4 w-4" />
        <span>Light</span>
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => setTheme('dark')}>
        <Moon className="mr-2 h-4 w-4" />
        <span>Dark</span>
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => setTheme('system')}>
        <Sun className="mr-2 h-4 w-4" />
        <span>System</span>
      </DropdownMenuItem>
    </>
  );
}
