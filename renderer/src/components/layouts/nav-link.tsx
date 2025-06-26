import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/cn";
import { NavLinkProps } from "@/types/navigation";

export function NavLink({ to, children, className, icon }: NavLinkProps) {
  const router = useRouterState();
  const isActive = router.location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-blue-500 text-white font-medium shadow-lg" 
          : "hover:bg-gray-100 text-gray-700",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="hidden sm:inline">{children}</span>
    </Link>
  );
}
