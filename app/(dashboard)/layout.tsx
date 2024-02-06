import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/ModeToggle';
import { Separator } from '@/components/ui/separator';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const links = [
  { name: 'Journal', href: '/journal' },
  { name: 'History', href: '/history' },
  { name: 'Home', href: '/' },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      <div className="h-full">
        <header className="h-[80px]">
          <div className="h-full w-full px-3 sm:px-6 flex items-center justify-between">
            <UserButton afterSignOutUrl="/" />
            <nav className="flex flex-row mx-1 sm:mx-3 gap-2 sm:gap-4">
              {links.map((link) => (
                <Button
                  asChild
                  variant="ghost"
                  key={link.href}
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              ))}
            </nav>
            <ModeToggle />
          </div>
          <Separator />
        </header>
        <div className="h-[calc(100vh-80px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
