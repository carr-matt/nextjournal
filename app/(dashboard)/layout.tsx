import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const links = [
  { name: 'Journal', href: '/journal' },
  { name: 'History', href: '/history' },
  { name: 'Home', href: '/' },
];

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <div className="h-full">
        <header className="h-[80px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-items-start">
            <UserButton />
            <nav className="flex flex-row mx-3">
              {links.map((link) => (
                <Button
                  asChild
                  variant="ghost"
                  className="mx-4"
                  key={link.href}
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              ))}
            </nav>
          </div>
        </header>
        <div className="h-[calc(100vh-80px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
