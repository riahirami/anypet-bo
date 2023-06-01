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
import { InkBottle } from "../../icons/InkBottle";
import { Book } from "../../icons/Book";
import { Calendar } from "../../icons/Calendar";
import { PATHS } from "../../routes/Path";
import { Link } from "react-router-dom";

import { menuItemStyles, themes } from "./SideBar.style";
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
export const Playground: React.FC<Props> = ({
  mode: theme,
  handleThemeChange,
  hasImage,
  handleImageChange,
}) => {
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
                <Link to={PATHS.PROFILE}>
                  <MenuItem icon={<Book />}>
                    Profil
                  </MenuItem></Link>
                <SubMenu
                  label="Advertise"
                  icon={<Diamond />}
                  suffix={
                    <Badge variant="danger" shape="circle">
                      {data?.count}
                    </Badge>
                  }
                >
                  <Link to={PATHS.Advertise}><MenuItem>
                    {" "}
                    List advertises
                  </MenuItem></Link>
                  <Link to={"myadvertises/" + id}>  <MenuItem
                    suffix={
                      <Badge variant="danger" shape="circle">
                        {data?.count}
                      </Badge>
                    }
                  >
                    {" "}
                    My advertises
                  </MenuItem></Link>
                  <Link to={PATHS.AddAdvertise}>
                    <MenuItem>
                      {" "}
                      Add advertise
                    </MenuItem></Link>
                </SubMenu>
                <Link to={PATHS.CONVERSATIONS}>
                  <MenuItem icon={<Service />}>
                    {" "}
                    Conversations
                  </MenuItem></Link>

                <Link to={PATHS.MYRESERVATIONS}>
                  <MenuItem icon={<Calendar />}> Reservations</MenuItem></Link>
              </Menu>
            </div>
            <SidebarFooter collapsed={collapsed} />
          </div>
        </Sidebar>
      </div>
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
                <Link to={PATHS.PROFILE}>
                  {" "}
                  <MenuItem icon={<Book />}>Profil</MenuItem>
                </Link>
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
                    <Link to={PATHS.Advertise}>List advertises</Link>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <Link to={PATHS.AddAdvertise}>Add advertise</Link>
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
                    <Link to={PATHS.ManageAds}>Advertises requests </Link>
                  </MenuItem>
                </SubMenu>
                <Link to={PATHS.MYRESERVATIONS}>
                  <MenuItem> Reservations</MenuItem></Link>
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
                  <MenuItem>
                    {" "}
                    <Link to={PATHS.CONVERSATIONS}> Conversations</Link>
                  </MenuItem>
                  <Link to={PATHS.MYRESERVATIONS}>
                    <MenuItem> Reservations</MenuItem></Link>
                </SubMenu>

                <Menu menuItemStyles={menuItemStyles}>
                  <Link to={PATHS.Users}>
                    {" "}
                    <MenuItem icon={<Calendar />}>Users</MenuItem>
                  </Link>
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
