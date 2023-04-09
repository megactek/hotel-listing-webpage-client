import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { Link as Lnk } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Hotels
          </Typography>
          <nav>
            <Lnk to="/">
              <Link
                variant="button"
                color="text.primary"
                sx={{ my: 1, mx: 1.5 }}
              >
                Find Hotels
              </Link>
            </Lnk>
            <Lnk to="/favorites">
              <Link
                variant="button"
                color="text.primary"
                sx={{ my: 1, mx: 1.5 }}
              >
                Saved Hotels
              </Link>
            </Lnk>
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
