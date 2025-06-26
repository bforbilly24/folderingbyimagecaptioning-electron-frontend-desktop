import { useRouterState, Link } from "@tanstack/react-router";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuList
} from "@/components/ui/shadcn/navigation-menu";
import { MobileNav, MobileNavIcon } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { NavLinkItem } from "@/types/navigation";
import { navigationRoutes } from "@/config/navigation";
import { createNavigationLinks } from "@/utils/navigation";
import { cn } from "@/lib/cn";

// Generate navigation links with icons
const navigationLinks = createNavigationLinks(navigationRoutes);

interface NavbarProps {
  className?: string;
}

function MobileNavLink({ link }: { link: NavLinkItem }) {
  const router = useRouterState();
  const isActive = router.location.pathname === link.to;
  
  return (
    <Link 
      to={link.to} 
      className={cn(
        "size-full flex items-center justify-center rounded-lg transition-all duration-200",
        isActive 
          ? "bg-blue-500 text-white shadow-lg" 
          : "bg-white hover:bg-blue-50 text-gray-700 border border-gray-200"
      )}
    >
      {link.mobileIcon || link.icon}
    </Link>
  );
}

export function Navbar({ className }: NavbarProps) {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden md:flex bg-white border-b border-gray-200 px-4 py-3 ${className || ''}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img src="/favicon.ico" alt="Foldering App" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-800">Foldering App</span>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <NavLink to={link.to} icon={link.icon}>
                    {link.label}
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <img src="/favicon.ico" alt="Foldering App" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-800">Foldering App</span>
            </div>
          </div>
        </nav>
        
        {/* Mobile Dock Navigation */}
        <div className="fixed bottom-6 left-1/2 transform w-fit -translate-x-1/2 z-50  px-4">
          <MobileNav className='w-full'>
            {navigationLinks.map((link) => (
              <MobileNavIcon key={link.to} className="bg-white">
                <MobileNavLink link={link} />
              </MobileNavIcon>
            ))}
          </MobileNav>
        </div>
      </div>
    </>
  );
}
