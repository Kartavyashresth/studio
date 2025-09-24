'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookUser, LayoutDashboard, ScrollText, BookMarked, Users, CheckSquare, Briefcase, Calendar, FileText, Building, Search, FileStack, UserCog, Cog, BarChart, UserPlus, GraduationCap, Percent } from 'lucide-react';

import { cn } from '@/lib/utils';
import { NexusLogo } from '@/components/nexus-logo';

const studentNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/activities', label: 'Activities', icon: ScrollText },
  { href: '/records', label: 'Academic Records', icon: BookMarked },
  { href: '/attendance', label: 'Attendance', icon: Percent },
  { href: '/courses', label: 'Courses', icon: GraduationCap },
  { href: '/portfolio', label: 'Portfolio', icon: BookUser },
  { href: '/placements', label: 'Placements', icon: Briefcase },
  { href: '/events', label: 'Events', icon: Calendar },
];

const facultyNavItems = [
    { href: '/faculty/dashboard', label: 'Faculty Dashboard', icon: Users },
    { href: '/faculty/verification', label: 'Verification Requests', icon: CheckSquare },
    { href: '/faculty/reports', label: 'Accreditation Reports', icon: FileText },
];

const employerNavItems = [
    { href: '/employer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/employer/postings', label: 'Job Postings', icon: Building },
    { href: '/employer/search', label: 'Candidate Search', icon: Search },
    { href: '/employer/applications', label: 'Applications', icon: FileStack },
];

const adminNavItems = [
    { href: '/institute-admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/institute-admin/faculty-management', label: 'Faculty Management', icon: UserPlus },
    { href: '/institute-admin/user-management', label: 'User Management', icon: UserCog },
    { href: '/institute-admin/system-configuration', label: 'System Configuration', icon: Cog },
    { href: '/institute-admin/reports', label: 'Data & Reports', icon: BarChart },
];


export function MainNav() {
  const pathname = usePathname();
  const isFaculty = pathname.startsWith('/faculty');
  const isEmployer = pathname.startsWith('/employer');
  const isAdmin = pathname.startsWith('/institute-admin');
  
  const navItems = isAdmin
    ? adminNavItems
    : isFaculty 
    ? facultyNavItems 
    : isEmployer
    ? employerNavItems
    : studentNavItems;

  const renderNavLinks = (isMobile = false) => (
    <nav className={cn('flex flex-col gap-2', isMobile ? 'p-4' : 'px-2 pt-4')}>
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:scale-[1.03] active:scale-[0.98]',
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
