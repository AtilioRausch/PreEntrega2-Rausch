import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CartWidget from "../CartWidget/CartWidget";
import LateralList from "../Menu/LateralList";
import { useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import {
  Box,
  Button,
  Collapse,
  SwipeableDrawer,
  useScrollTrigger,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import DiscountIcon from "@mui/icons-material/Discount";
import ComputerIcon from "@mui/icons-material/Computer";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Link } from "react-router-dom";

const HideOnScroll = ({ isSmallScreen, children }) => {
  const trigger = useScrollTrigger();

  return <Collapse in={!isSmallScreen || !trigger}>{children}</Collapse>;
};

const navLinks = [
  {
    title: "Oportunities",
    path: "/products/oportunities",
    icon: <DiscountIcon sx={{ color: "yellow" }} />,
  },
  {
    title: "Mac",
    path: "/products/mac",
    icon: <ComputerIcon sx={{ color: "#55C1FF" }} />,
  },
  {
    title: "iPad",
    path: "/products/ipad",
    icon: <TabletMacIcon sx={{ color: "#55C1FF" }} />,
  },
  {
    title: "iPhone",
    path: "/products/iphone",
    icon: <PhoneIphoneIcon sx={{ color: "#55C1FF" }} />,
  },
];

export default function Header({ count }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <header>
      <nav>
        <AppBar sx={{ width: "100vw", position: "fixed" }}>
          <Toolbar
            sx={{
              minHeight: { xs: "10px" },
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <HideOnScroll isSmallScreen={isSmallScreen}>
              <Box
                sx={{
                  width: "95vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    visibility: { md: "hidden" },
                    alignItems: "center",
                  }}
                >
                  <IconButton color="secondary" onClick={() => setOpen(true)}>
                    <MenuIcon color="secondary" />
                  </IconButton>
                  <Typography
                    sx={{ display: { xs: "none", sm: "block" } }}
                    variant="h6"
                    color={"secondary"}
                  >
                    Menu
                  </Typography>
                </Box>
                <Box component={"div"}>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="h1"
                      sx={{
                        boxShadow: "none",
                        textDecoration: "none",
                        fontSize: {
                          xs: "2rem",
                          sm: "2.5rem",
                          md: "4.5rem",
                          lg: "6rem",
                        },
                        color: "white",
                      }}
                    >
                      THE CAVE
                    </Typography>
                  </Link>
                </Box>
                <CartWidget color="secondary" />
              </Box>
            </HideOnScroll>
            <SwipeableDrawer
              PaperProps={{ style: { backgroundColor: "#090C02" } }}
              open={open}
              onOpen={() => setOpen(true)}
              anchor="left"
              onClose={() => setOpen(false)}
            >
              <LateralList list={navLinks} onClose={setOpen} />
            </SwipeableDrawer>
            <Box
              sx={{
                height: "4rem",
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                columnGap: "3rem",
              }}
            >
              {navLinks.map((item) => (
                <Link to={item.path} key={item.title}>
                  <Button
                    endIcon={item.icon}
                    sx={{ fontSize: { xs: "1.5rem" }, color: "white" }}
                    color="inherit"
                    key={item.title}
                  >
                    {item.title}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </nav>
    </header>
  );
}
