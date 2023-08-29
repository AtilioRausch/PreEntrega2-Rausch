import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CanvasComponent from "../Model/Canvas";
import { ComputerModel } from "../Model/ComputerModel";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  canvasContainer: {
    overflow: "hidden",
    height: "100%",
  },
}));

export default function Presentation() {
  const classes = useStyles();
  return (
    <Box
      component={"div"}
      sx={{ height: "100vh", overflow: "hidden", paddingTop: "14rem" }}
    >
      <Typography
        position={"relative"}
        zIndex={"15"}
        variant="h1"
        color="primary"
        sx={{ textAlign: "center", fontSize: "5rem", marginTop: "3rem" }}
      >
        Ve más allá de la realidad
      </Typography>
      <Grid container sx={{ height: "30rem" }}>
        <Grid
          item
          xs={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Typography
            position={"relative"}
            variant="h2"
            color="primary"
            sx={{ textAlign: "center", fontSize: "3rem", marginBottom: "2rem" }}
          >
            Somos los mayores provedores de Apple en Latinoamérica
          </Typography>
          <Typography
            position={"relative"}
            variant="h5"
            color="primary"
            sx={{ textAlign: "center" }}
          >
            {`Adquiera nuestros productos desde cualquier punto del país`}
            <br />
            {`Disfrute de las mejores ofertas en dispositivos Apple`}
            <br />
            {`Tecnología de punta al alcance de su mano`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2.5rem",
            }}
          >
            <Button variant="outlined" sx={{ marginRight: "1rem" }}>
              Leer más
            </Button>
            <Link to={"/products/all"}>
              <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
                Conoce los productos!
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={5} className={classes.canvasContainer}>
          <CanvasComponent>
            <ComputerModel />
          </CanvasComponent>
        </Grid>
      </Grid>
    </Box>
  );
}
