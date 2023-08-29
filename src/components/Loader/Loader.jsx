import "./Loader.scss";
import { Box, CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <Box className="loader">
      <CircularProgress color={"secondary"} />
    </Box>
  );
};

export default Loader;
