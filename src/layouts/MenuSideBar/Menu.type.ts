
export type MenuItem = {
    id: number; // Unique ID for each menu item
    label: string;
    link: string;
  };
  
  export  type SubMenuItem = {
    id: number; // Unique ID for each sub-menu item
    parentId: number; // ID of the parent menu item
    label: string;
    link: string;
  };
  
  export   type Props = {
    mode: string;
    handleThemeChange: () => void;
    hasImage: string;
    handleImageChange: () => void;
    menuItems: MenuItem[];
    subMenuItems: SubMenuItem[];
  };
  