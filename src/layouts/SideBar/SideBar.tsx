import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  menuClasses,
  MenuItemStyles,
} from "../../components/SidebarSrc";

import { SidebarFooter } from "../../components/SidebarSrc/SidebarFooter";
import { Badge } from "../../components/SidebarSrc/Badge";
import {  } from "../../components/SidebarSrc/PackageBadges";
import { SidebarHeader } from "../../components/SidebarSrc/SidebarHeader";

import { Diamond } from "../../icons/Diamond";
import { BarChart } from "../../icons/BarChart";
import { Global } from "../../icons/Global";
import { InkBottle } from "../../icons/InkBottle";
import { Book } from "../../icons/Book";
import { Calendar } from "../../icons/Calendar";
import { PATHS } from "../../routes/Path";
import { Link } from "react-router-dom";

import {themes} from "./SideBar.style"
import { Props } from "components/Topbar/TopbarProps.type";

import { hexToRgba} from "../../core/services/helpers";



export const Playground: React.FC<Props> = ({
  mode: theme,
  handleThemeChange,
  hasImage,
  handleImageChange
}) => {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

  const [isRTL, setIsRTL] = useState<boolean>(false);

  // const [hasImage, setHasImage] = useState<boolean>(false);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setHasImage(e.target.checked);
  // };

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
     
      <Sidebar
        image="https://demos.themeselection.com/chameleon-admin-template/app-assets/images/backgrounds/04.jpg"
        rtl={isRTL}
        breakPoint="lg"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage=="false" ? 0.7 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
        
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <SidebarHeader  style={{ marginBottom: "24px", marginTop: "16px" }} />
          <div style={{ flex: 1, marginBottom: "32px" }}>
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
                  <Link to={PATHS.Advertise}>List advertises</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to={PATHS.AddAdvertise}>Add advertise</Link>
                </MenuItem>
                <MenuItem
                  suffix={
                    <Badge variant="danger" shape="circle">
                      6
                    </Badge>
                  }
                >
                  {" "}
                  {/* TODO :  change the badge value*/}
                  <Link to={PATHS.ManageAds}>Advertises requests </Link>
                </MenuItem>
              </SubMenu>
              <SubMenu label="Categories" icon={<Global />}>
                <MenuItem>
                  {" "}
                  <Link to={PATHS.Categories}>List categories</Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to={PATHS.AddCategories}>Add categories</Link>
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="Messages"
                icon={<InkBottle />}
                suffix={<Badge variant="success">New</Badge>}
              >
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
              </SubMenu>

              <Menu menuItemStyles={menuItemStyles}>
                <MenuItem icon={<Calendar />}>
                  <Link to={PATHS.Users}>Users</Link>
                </MenuItem>
              </Menu>
              <SubMenu label="Statistics" icon={<BarChart />}>
                <MenuItem>
                  <Link to={PATHS.StatsHome}> Home</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={PATHS.Stats}> Advertises</Link>
                </MenuItem>
              </SubMenu>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>

      
    </div>
  );
};
