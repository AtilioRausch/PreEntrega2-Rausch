import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function LateralList({ list, onClose }) {
  const handleMenuClose = () => {
    onClose(false);
  };

  return (
    <Box>
      <IconButton
        onClick={handleMenuClose}
        sx={{ position: "absolute", top: "1rem", right: "1rem" }}
      >
        <CloseIcon color="secondary" />
      </IconButton>
      <Typography
        variant={"h6"}
        sx={{ position: "absolute", top: "1.3rem", left: "1rem" }}
      >
        Menu
      </Typography>
      <List
        component="nav"
        sx={{ display: "flex", flexDirection: "column", marginTop: "4rem" }}
      >
        {list.map((item) => (
          <Link key={item.title} to={item.path}>
            <ListItemButton
              color="inherit"
              sx={{
                display: "flex",
                color: "white",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "1.5rem",
              }}
            >
              <ListItemIcon
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText sx={{ textDecoration: "none" }}>
                {item.title}
              </ListItemText>
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
}
