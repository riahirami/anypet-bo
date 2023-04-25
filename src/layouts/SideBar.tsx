import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  menuClasses,
  MenuItemStyles,
} from "../components/SidebarSrc";

import { Switch } from "../components/SidebarSrc/Switch";
import { SidebarFooter } from "../components/SidebarSrc/SidebarFooter";
import { Badge } from "../components/SidebarSrc/Badge";
import { PackageBadges } from "../components/SidebarSrc/PackageBadges";
import { SidebarHeader } from "../components/SidebarSrc/SidebarHeader";

import { Diamond } from "../icons/Diamond";
import { BarChart } from "../icons/BarChart";
import { Global } from "../icons/Global";
import { InkBottle } from "../icons/InkBottle";
import { Book } from "../icons/Book";
import { Calendar } from "../icons/Calendar";
import { PATHS } from "../routes/Path";
import { Link } from "react-router-dom";

import {Typography} from '@mui/material'
export type Theme = "light" | "dark";

export const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
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

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Playground: React.FC = () => {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

  const [isRTL, setIsRTL] = useState<boolean>(false);
  const [hasImage, setHasImage] = useState<boolean>(false);
  const DarkLight = localStorage.getItem("theme") as Theme;
  const [theme, setTheme] = useState<Theme> (DarkLight);

  // handle on RTL change event
  const handleRTLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRTL(e.target.checked);
  };

  useEffect(()=>{
    const DarkLight = localStorage.getItem("theme") as Theme;
    setTheme(DarkLight);
    console.log("sidbar theme:"+DarkLight)
  },[])

  // handle on theme change event
  // const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTheme(e.target.checked ? "dark" : "light");
  //   console.log({theme});
  //   localStorage.setItem("theme",theme);
  // };

  // handle on image change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasImage(e.target.checked);
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
        <div style={{ marginBottom: 16 }}>
              {/* <Switch
                id="theme"
                checked={theme === "dark"}
                onChange={handleThemeChange}
                label="Dark theme"
              /> */}
            </div>
      <Sidebar
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={isRTL}
        breakPoint="lg"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <SidebarHeader  style={{ marginBottom: "24px", marginTop: "16px" }} />
          <div style={{ flex: 1, marginBottom: "32px" }} >

            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<Book />}>
                <Link to={PATHS.PROFILE}>Profil</Link>
              </MenuItem>
              <SubMenu
                label="Advertise"
                icon={<Diamond />}
                suffix={
                  <Badge variant="danger" shape="circle">
                    6
                  </Badge>
                }
              >
                <MenuItem>
                  {" "}
                  <Link to={PATHS.AddAdvertise}>Add advertise</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to={PATHS.Advertise}>List advertises</Link>
                </MenuItem>
              </SubMenu>
              <SubMenu label="Categories" icon={<Global />} >
                <MenuItem>
                  {" "}
                  <Link to={PATHS.AddCategories}>Add categories</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to={PATHS.Categories}>List categories</Link>
                </MenuItem>
              </SubMenu>
              <SubMenu label="Messages" icon={<InkBottle />}>
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
              </SubMenu>

              <Menu menuItemStyles={menuItemStyles}>
                <MenuItem
                  icon={<Calendar />}
                  suffix={<Badge variant="success">New</Badge>}
                >
                  Messages
                </MenuItem>
              </Menu>

              <SubMenu label="Statistics" icon={<BarChart />}>
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
              </SubMenu>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>
      {/* <main>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <button className="sb-button" onClick={() => toggleSidebar()}>
                Toggle
              </button>
            )}
          </div>
          <div style={{ marginBottom: "48px" }}>
            <Typography variant="h4" fontWeight={600}>
              React Pro Sidebar
            </Typography>
            <Typography variant="body2">
              React Pro Sidebar provides a set of components for creating high
              level and customizable side navigation
            </Typography>
            <PackageBadges />
          </div>

          <div style={{ padding: "0 8px" }}>
            <div style={{ marginBottom: 16 }}>
              <Switch
                id="collapse"
                checked={collapsed}
                onChange={() => collapseSidebar()}
                label="Collapse"
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Switch
                id="rtl"
                checked={isRTL}
                onChange={handleRTLChange}
                label="RTL"
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Switch
                id="theme"
                checked={theme === "dark"}
                onChange={handleThemeChange}
                label="Dark theme"
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Switch
                id="image"
                checked={hasImage}
                onChange={handleImageChange}
                label="Image"
              />
            </div>
          </div>
        </div>
      </main> */}
    </div>
  );
};
