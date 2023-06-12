import { styled } from '@mui/styles';
import { Card, Typography, Link, Box, Avatar } from '@mui/material';
import { themeSettings as theme } from "../theme"

export const CardContainer = styled(Box)(({ theme }) => ({
  maxWidth: 320,
  borderRadius: "1rem",
  backgroundColor: "rgba(255, 255, 255, 1)",
  padding: "1rem",
  margin: "1rem",
  border:"6px solid rgb(54 84 114)",
  "&:hover": {
    backgroundColor: "rgb(172 195 254)",
  },
}));

export const PartnerLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "black",
}));

export const StyledAvatar = styled(Avatar) ({
  width: "120px",
  height: "120px",
  margin:"auto",
});

export const StyledTypography = styled(Typography) ({
 
  margin:"auto",
  textAlign:"center",
marginTop: "10px"
});

export const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const Icon = styled("span")({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "9999px",
  backgroundColor: "rgba(96, 165, 250, 1)",
  padding: "0.5rem",
  color: "rgba(255, 255, 255, 1)",
  
});

export const AlertText = styled(Typography)({
  fontWeight: 600,
  color: "rgba(107, 114, 128, 1)",
});

export const MessageText = styled(Typography)({
  marginTop: "1rem",
  color: "rgba(107, 114, 128, 1)",
});

export const ActionsContainer = styled(Box)({
  marginTop: "1.5rem",
  margin:"auto",

});

export const ActionLink = styled(Link)({
  textDecoration: "none",
});

export const ReadAction = styled(ActionLink)({
  display: "inline-block",
  borderRadius: "0.5rem",
  width: "100%",
  padding: "0.75rem 1.25rem",
  textAlign: "center",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 600,
  backgroundColor: "rgba(59, 130, 246, 1)",
  color: "rgba(255, 255, 255, 1)",
});

export const MarkAsReadAction = styled(ActionLink)({
  marginTop: "0.5rem",
  display: "inline-block",
  borderRadius: "0.5rem",
  width: "100%",
  padding: "0.75rem 1.25rem",
  textAlign: "center",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 600,
  backgroundColor: "rgba(249, 250, 251, 1)",
  color: "rgba(107, 114, 128, 1)",
  transition: "all .15s ease",
  "&:hover": {
    backgroundColor: "rgb(230, 231, 233)",
  },
});

