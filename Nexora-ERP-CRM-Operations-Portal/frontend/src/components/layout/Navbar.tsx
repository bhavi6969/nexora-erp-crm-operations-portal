import { Bell, User, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useAuth();

  return (
    <header className="border-b border-[#c5c6cd] bg-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-[#5F6B76] hover:text-[#1F2933] mr-2"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <div className="hidden h-9 w-48 items-center rounded border border-[#c5c6cd] bg-[#eff4ff] px-3 text-sm text-slate-500 sm:flex">
              Search...
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button aria-label="Notifications" className="relative p-2 text-slate-600 transition-colors hover:text-slate-950">
            <Bell className="h-5 w-5 md:h-6 md:w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-[#DC2626] rounded-full" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d5e3fd] text-[#091426]">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-[#0d1c2f]">{user?.name || "Admin User"}</p>
              <p className="text-[10px] text-[#75777d]">{user?.role || "Administrator"}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}