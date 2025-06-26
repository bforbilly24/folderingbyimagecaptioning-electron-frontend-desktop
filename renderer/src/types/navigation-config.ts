// Navigation route configuration
export interface NavigationRoute {
  to: string;
  label: string;
  iconKey: 'home' | 'image' | 'folder';
}

// Pure data configuration without JSX
export const navigationRoutes: NavigationRoute[] = [
  {
    to: "/",
    label: "Home",
    iconKey: 'home'
  },
  {
    to: "/image",
    label: "Upload Images", 
    iconKey: 'image'
  },
  {
    to: "/folder",
    label: "Upload Folder",
    iconKey: 'folder'
  }
];

// Icon size configurations
export const iconSizes = {
  default: "size-5",
  mobile: "size-6"
} as const;
