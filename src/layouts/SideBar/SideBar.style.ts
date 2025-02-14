import { MenuItemStyles } from "components/SidebarSrc/Menu";
import { menuClasses } from "components/SidebarSrc/utils/utilityClasses";
import { hexToRgba } from "core/services/helpers";

export const themes = {
    light: {
      sidebar: {
        backgroundColor: "#ffffff",
        color: "#000000",
      },
      menu: {
        menuContent: "#fbfcfd",
        icon: "#0098e5",
        hover: {
          backgroundColor: "#c5e4ff",
          color: "#44596e",
        },
        disabled: {
          color: "#9fb6cf",
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: "#0b2948",
        color: "#ffffff",
      },
      menu: {
        menuContent: "#082440",
        icon: "#59d0ff",
        hover: {
          backgroundColor: "#00458b",
          color: "#b6c8d9",
        },
        disabled: {
          color: "#3e5e7e",
        },
      },
    },
  };
  
 