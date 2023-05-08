import styled from "@emotion/styled";
import React, { useState } from "react";
import { useProSidebar } from "../../components/SidebarSrc";
import { Button, Typography } from "@mui/material";
import { Switch } from "./Switch";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import { useProfileQuery } from "../../redux/api/authApi";
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const StyledSidebarHeader = styled.div`
  height: auto;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  postion: absolute;
  right: 0;
  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const SidebarHeaderButton = styled(Button)({
  position: "absolute",
  right: 0,
});

const StyledLogo = styled.div<{ rtl?: boolean }>`
  width: 100%;
  margin-top: 5px;

  min-width: 35px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px;
  color: white;
  font-size: 24px;
  font-weight: 700;
  background-color: #009fdb;
  background: linear-gradient(45deg, rgb(77 121 226) 0%, rgb(90 225 255) 100%);
  ${({ rtl }) =>
    rtl
      ? `
      margin-left: 0px;
      margin-right: 0px;
      `
      : `
      margin-right: 10px;
      margin-left: 0px;
      `}
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  ...rest
}) => {
  const { rtl } = useProSidebar();
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

  const tokenValue = JSON.parse(localStorage.getItem("user") || "{}");
  const {
    data: dataProfile,
    isError,
    isSuccess,
    isLoading,
  } = useProfileQuery(tokenValue.token);

  const { login, name, email, phone, avatar } = dataProfile?.user ?? {};


  const [collapse, setCollapse] = useState(true);
  const handleCollapseSidebar = () => {
    if (collapse) {
      collapseSidebar(collapse);
      setCollapse(!collapse);
    } else {
      collapseSidebar(collapse);
      setCollapse(!collapse);
    }
  };

  return (
    <>
      <SidebarHeaderButton>
        <Button onClick={handleCollapseSidebar}>
          <MenuIcon />
        </Button>
      </SidebarHeaderButton>
      <div>
        <StyledLogo rtl={rtl}>AnyPet</StyledLogo>
      </div>
      <StyledSidebarHeader {...rest}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
    <Avatar
      alt="Avatar"
      src={avatar}
      sx={{ width: 100, height: 100 }}
    />
  </div>
  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
    <Typography variant="subtitle1" fontWeight={700} color="#0098e5">
      Dashboard : {login}
    </Typography>
  
  </div>
</div>

      </StyledSidebarHeader>
    </>
  );
};
