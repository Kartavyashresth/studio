'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, type ChangeEvent, useEffect } from 'react';
import {
  Menu,
  LayoutDashboard,
  ScrollText,
  BookUser,
  BookMarked,
  Users,
  CheckSquare,
  Briefcase,
  Calendar,
  FileText,
  Building,
  Search,
  FileStack,
  UserCog, 
  Cog, 
  BarChart, 
  UserPlus,
  Camera,
  LogOut,
  GraduationCap,
  Percent,
  ClipboardCheck,
  GalleryVertical
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { user as staticUser } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NexusLogo } from './nexus-logo';
import { ThemeToggle } from './theme-toggle';

const studentNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/activities', label: 'Activities', icon: ScrollText },
  { href: '/records', label: 'Academic Records', icon: BookMarked },
  { href: '/results', label: 'Exam Results', icon: ClipboardCheck },
  { href: '/attendance', label: 'Attendance', icon: Percent },
  { href: '/courses', label: 'Courses', icon: GraduationCap },
  { href: '/portfolio', label: 'Portfolio', icon: BookUser },
  { href: '/placements', label: 'Placements', icon: Briefcase },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/gallery', label: 'Gallery', icon: GalleryVertical },
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

const AVATAR_STORAGE_KEY = 'nexus-user-avatar';

export function SiteHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const [avatarUrl, setAvatarUrl] = useState(staticUser.avatarUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedAvatar = localStorage.getItem(AVATAR_STORAGE_KEY);
        if (storedAvatar) {
            setAvatarUrl(storedAvatar);
        }
    }, []);

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

    const pageTitle = navItems.find(item => pathname.startsWith(item.href))?.label || 'Nexus';

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const newAvatarUrl = e.target.result as string;
            setAvatarUrl(newAvatarUrl);
            localStorage.setItem(AVATAR_STORAGE_KEY, newAvatarUrl);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const handleAvatarClick = () => {
      fileInputRef.current?.click();
    };
    
    const handleLogout = () => {
        router.push('/login');
    }
    
    const handleProfileClick = () => {
        if (isFaculty) {
            router.push('/faculty/dashboard');
        } else if (isEmployer) {
            router.push('/employer/dashboard');
        } else if (isAdmin) {
            router.push('/institute-admin/dashboard');
        } else {
            router.push('/portfolio');
        }
    };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
      <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          className="hidden" 
          accept="image/*"
      />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-headline text-lg font-semibold"
            >
              <NexusLogo className="h-6 w-6" />
              <span>Nexus</span>
            </Link>
          </div>
          <nav className="grid gap-2 text-lg font-medium p-4">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  {
                    'bg-muted text-primary': pathname.startsWith(href),
                  }
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="w-full flex-1">
        <h1 className="font-headline text-xl md:text-2xl">{pageTitle}</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Image
              src={avatarUrl}
              width={36}
              height={36}
              alt={staticUser.name}
              data-ai-hint="profile picture"
              className="rounded-full"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleAvatarClick}>
            <Camera className="mr-2 h-4 w-4" />
            <span>Change Picture</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleProfileClick}>Profile</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push('/settings')}>Settings</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <ThemeToggle />
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
