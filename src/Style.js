import { Paper, styled } from "@mui/material";

export const ContentHeader = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 50,
  lineHeight: "60px",
  width: "100%",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 10,
  gap: 3,
  position: "sticky",
  top: 80,
  //   background: theme.palette.background.default,
  //   boxShadow: theme.shadows[2],
}));

export const MainContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "8px",
}));

export const RightContent = styled("div")(({ theme }) => ({
  marginTop: "80px",
  padding: "0 15px",
  //   overflowY: "auto",
}));
