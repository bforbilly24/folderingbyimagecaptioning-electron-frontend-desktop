// src/utils/navigation.tsx
import { IconHome, IconPhoto, IconFolderOpen } from '@tabler/icons-react'
import { NavLinkItem } from '@/types/navigation'
import { NavigationRoute } from '@/config/navigation'

const iconMap = {
  home: {
    desktop: <IconHome className="size-5" />,
    mobile: <IconHome className="size-6" />
  },
  photo: {
    desktop: <IconPhoto className="size-5" />,
    mobile: <IconPhoto className="size-6" />
  },
  folder: {
    desktop: <IconFolderOpen className="size-5" />,
    mobile: <IconFolderOpen className="size-6" />
  }
} as const

export function createNavigationLinks(routes: NavigationRoute[]): NavLinkItem[] {
  return routes.map(route => ({
    to: route.to,
    label: route.label,
    icon: iconMap[route.iconName].desktop,
    mobileIcon: iconMap[route.iconName].mobile
  }))
}
