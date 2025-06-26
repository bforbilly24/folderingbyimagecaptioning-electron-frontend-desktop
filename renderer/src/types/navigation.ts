import { ReactNode } from 'react';

export interface NavLinkItem {
  to: string;
  label: string;
  icon: ReactNode;
  mobileIcon?: ReactNode;
}

export interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  icon?: ReactNode;
}

export interface MobileNavProps {
  links: NavLinkItem[];
  className?: string;
}

export interface DesktopNavProps {
  links: NavLinkItem[];
  className?: string;
}
