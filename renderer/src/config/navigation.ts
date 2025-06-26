// src/config/navigation.ts
export interface NavigationRoute {
  to: string
  label: string
  iconName: 'home' | 'photo' | 'folder'
}

export const navigationRoutes: NavigationRoute[] = [
  {
    to: "/",
    label: "Home",
    iconName: "home"
  },
  {
    to: "/image",
    label: "Upload Images", 
    iconName: "photo"
  },
  {
    to: "/folder",
    label: "Upload Folder",
    iconName: "folder"
  }
]
