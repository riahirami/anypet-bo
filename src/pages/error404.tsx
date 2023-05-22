import React from "react";
import { Grid,Button, Typography } from "@mui/material";
import { amber } from "@mui/material/colors";
import { PATHS } from "routes/Path";
import { Link } from "react-router-dom";

const primary = amber[300];

export default function Unauthorized() {
  return (
    <>
     <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} textAlign="center">
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">
          You are not authorized to access this page!
        </Typography>
        <Button variant="contained"><Link to={PATHS.PROFILE}>
            Back Home
            </Link>
            </Button>
      </Grid>
    </Grid>
  );
    </>
  );
}
