import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CartWidget from "../CartWidget/CartWidget";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function SpeedDialBottom() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const actions = [
    { icon: <CartWidget sx={{ color: "primary" }} />, name: "Cart" },
    { icon: <ArrowUpwardIcon />, name: "Top" },
  ];

  const handleScrollTop = () => {
    if (!isMobile) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        height: 320,
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        flexGrow: 1,
        zIndex: "100",
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<KeyboardArrowUpIcon />} />}
        onClick={handleScrollTop}
      >
        {actions.map((actions) => (
          <SpeedDialAction
            key={actions.name}
            icon={actions.icon}
            tooltipTitle={actions.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
