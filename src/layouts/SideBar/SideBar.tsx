import React, { useState, useEffect } from "react";
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
import { } from "../../components/SidebarSrc/PackageBadges";
import { SidebarHeader } from "../../components/SidebarSrc/SidebarHeader";

import { Diamond } from "../../icons/Diamond";
import { BarChart } from "../../icons/BarChart";
import { Global } from "../../icons/Global";
import { Book } from "../../icons/Book";
import { Calendar } from "../../icons/Calendar";
import { PATHS } from "../../routes/Path";

import { themes } from "./SideBar.style";
import { Props } from "components/Topbar/TopbarProps.type";

import { hexToRgba } from "../../core/services/helpers";
import { useProfileQuery } from "redux/api/authApi";
import { Spinner } from "./../../components/Spinner/spinner";
import { getToken, getCurrentUser } from "core/utils/functionHelpers";
import { useSelector, useDispatch } from "react-redux";
import { getMyAds } from "redux/slices/adsSlice";
import { useGetAdsQuery, useGetMyAdsQuery } from "redux/api/adsApi";
import { parametersListing } from "core/models/parametersListing.model";
import { Service } from "icons/Service";
import { User } from "icons/User";
import { Message } from "icons/Message";
import CustomLink from "components/CustomLink/CustomLink"


export const Playground: React.FC<Props> = ({
  mode: theme,
  handleThemeChange,
  hasImage,
  handleImageChange,
}) => {

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
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
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

  const tokenValue = getToken();

  const currentUser = getCurrentUser();
  const id = currentUser?.user?.id;
  const { data: dataProfile } = useProfileQuery(tokenValue.token);

  const [parameters, setParameters] = useState<parametersListing>({
    page: 1,
    perPage: "4",
    orderBy: undefined,
    orderDirection: undefined,
    keyword: undefined,
    date: undefined,
    status: "0",
  });
  const { data: DataAds } = useGetAdsQuery(parameters);

  const { firstname, lastname, email, phone, avatar, role_id } =
    dataProfile?.user ?? {};

  const { data, isSuccess, isLoading } = useGetMyAdsQuery(id);

  const [role, setRole] = useState(role_id);
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (tokenValue) setRole(role_id);
  }, []);

  if (currentUser?.user?.role_id === 1)
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Sidebar
          image="https://demos.themeselection.com/chameleon-admin-template/app-assets/images/backgrounds/04.jpg"
          breakPoint="lg"
          backgroundColor={hexToRgba(
            themes[theme].sidebar.backgroundColor,
            hasImage == "false" ? 0.7 : 1
          )}
          rootStyles={{
            color: themes[theme].sidebar.color,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SidebarHeader
              style={{ marginBottom: "24px", marginTop: "16px" }}
            />
            <div style={{ flex: 1, marginBottom: "32px" }}>
              <Menu menuItemStyles={menuItemStyles}>
                <CustomLink to={PATHS.PROFILE}>
                  <MenuItem icon={<Book />}>
                    Profil
                  </MenuItem></CustomLink>
                <SubMenu
                  label="Advertise"
                  icon={<Diamond />}
                  suffix={
                    <Badge variant="danger" shape="circle">
                      {data?.count}
                    </Badge>
                  }
                >
                  <CustomLink to={PATHS.Advertise}><MenuItem>
                    {" "}
                    List advertises
                  </MenuItem></CustomLink>
                  <CustomLink to={"myadvertises/" + id}>  <MenuItem
                    suffix={
                      <Badge variant="danger" shape="circle">
                        {data?.count}
                      </Badge>
                    }
                  >
                    {" "}
                    My advertises
                  </MenuItem></CustomLink>
                  <CustomLink to={PATHS.AddAdvertise}>
                    <MenuItem>
                      {" "}
                      Add advertise
                    </MenuItem></CustomLink>
                </SubMenu>
                <CustomLink to={PATHS.CONVERSATIONS}>
                  <MenuItem icon={<Message />}>
                    {" "}
                    Conversations
                  </MenuItem></CustomLink>

                <CustomLink to={PATHS.MYRESERVATIONS}>
                  <MenuItem icon={<Calendar />}> Reservations</MenuItem></CustomLink>
              </Menu>
            </div>
            <SidebarFooter collapsed={collapsed} />
          </div>
        </Sidebar >
      </div >
    );

  if (currentUser?.user?.role_id === 2)
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Sidebar
          image="https://demos.themeselection.com/chameleon-admin-template/app-assets/images/backgrounds/04.jpg"
          // breakPoint="lg"
          backgroundColor={hexToRgba(
            themes[theme].sidebar.backgroundColor,
            hasImage == "false" ? 0.7 : 1
          )}
          rootStyles={{
            color: themes[theme].sidebar.color,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SidebarHeader
              style={{ marginBottom: "24px", marginTop: "16px" }}
            />
            <div style={{ flex: 1, marginBottom: "32px" }}>
              <Menu menuItemStyles={menuItemStyles} style={{
                color:
                  themes[theme].sidebar.color
              }}>
                <SubMenu label="Statistics" icon={<BarChart />} >
                  <MenuItem >
                    <CustomLink to={PATHS.StatsHome}> Home</CustomLink>
                  </MenuItem>
                  <MenuItem>
                    <CustomLink to={PATHS.Stats}> Advertises</CustomLink>
                  </MenuItem>
                </SubMenu>

                <CustomLink to={PATHS.PROFILE}>
                  {" "}
                  <MenuItem icon={<Book fill={themes[theme].sidebar.color}/>} >Profil</MenuItem>
                </CustomLink>
                <SubMenu
                  label="Advertise"
                  icon={<Diamond />}
                  suffix={
                    <Badge variant="danger" shape="circle">
                      {DataAds?.data?.length}
                    </Badge>
                  }
                >
                  <MenuItem>
                    {" "}
                    <CustomLink to={PATHS.Advertise}>List advertises</CustomLink>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <CustomLink to={PATHS.AddAdvertise}>Add advertise</CustomLink>
                  </MenuItem>
                  <MenuItem
                    suffix={
                      <Badge variant="danger" shape="circle">
                        {DataAds?.data?.length}
                      </Badge>
                    }
                  >
                    {" "}
                    {/* TODO :  change the badge value*/}
                    <CustomLink to={PATHS.ManageAds}>Advertises requests </CustomLink>
                  </MenuItem>
                </SubMenu>
                <CustomLink to={PATHS.MYRESERVATIONS}>
                  <MenuItem icon={<Calendar fill={themes[theme].sidebar.color} />}> Reservations</MenuItem></CustomLink>
                <SubMenu label="Categories" icon={<Global />}>
                  <MenuItem>
                    {" "}
                    <CustomLink to={PATHS.Categories}>List categories</CustomLink>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <CustomLink to={PATHS.AddCategories}>Add categories</CustomLink>
                  </MenuItem>
                </SubMenu>
                <SubMenu
                  label="Messages"
                  icon={<Message />}
                  suffix={<Badge variant="success">New</Badge>}
                >
                  <MenuItem>
                    {" "}
                    <CustomLink to={PATHS.CONVERSATIONS}> Conversations</CustomLink>
                  </MenuItem>


                </SubMenu>

                <Menu menuItemStyles={menuItemStyles}>
                  <CustomLink to={PATHS.Users}>
                    {" "}
                    <MenuItem icon={<User fill={themes[theme].sidebar.color}/>}>Users</MenuItem>
                  </CustomLink>
                </Menu>

                <SubMenu
                  label="Partners"
                  icon={<Service />}

                >
                  <CustomLink to={PATHS.ADDPARTNER}>
                    {" "}
                    <MenuItem >Add Partners</MenuItem>
                  </CustomLink>
                  <CustomLink to={PATHS.LISTPARTNER}>
                    {" "}
                    <MenuItem >list Partners</MenuItem>
                  </CustomLink>
                </SubMenu>
              </Menu>
            </div>
            <SidebarFooter collapsed={collapsed} />
          </div>
        </Sidebar>
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar
        image="https://demos.themeselection.com/chameleon-admin-template/app-assets/images/backgrounds/04.jpg"
        breakPoint="lg"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage == "false" ? 0.7 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Spinner />
        </div>
      </Sidebar>
    </div>
  );
};
