'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookUser, LayoutDashboard, ScrollText, BookMarked, Users, CheckSquare, Briefcase, Calendar, FileText } from 'lucide-react';

import { cn } from '@/lib/utils';
import { NexusLogo } from '@/components/nexus-logo';

const studentNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/activities', label: 'Activities', icon: ScrollText },
  { href: '/records', label: 'Academic Records', icon: BookMarked },
  { href: '/portfolio', label: 'Portfolio', icon: BookUser },
  { href: '/placements', label: 'Placements', icon: Briefcase },
  { href: '/events', label: 'Events', icon: Calendar },
];

const facultyNavItems = [
    { href: '/faculty/dashboard', label: 'Faculty Dashboard', icon: Users },
    { href: '/faculty/verification', label: 'Verification Requests', icon: CheckSquare },
    { href: '/faculty/reports', label: 'Accreditation Reports', icon: FileText },
];

export function MainNav() {
  const pathname = usePathname();
  const isFaculty = pathname.startsWith('/faculty');
  const navItems = isFaculty ? facultyNavItems : studentNavItems;

  const renderNavLinks = (isMobile = false) => (
    <nav className={cn('flex flex-col gap-2', isMobile ? 'p-4' : 'px-2 pt-4')}>
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            {
              'bg-muted text-primary': pathname.startsWith(href),
            }
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block w-64">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold">
              <NexusLogo className="h-6 w-6" />
              <span>Nexus</span>
            </Link>
          </div>
          <div className="flex-1">{renderNavLinks()}</div>
        </div>
      </div>

      {/* Mobile Sheet (kept in SiteHeader) */}
    </>
  );
}
