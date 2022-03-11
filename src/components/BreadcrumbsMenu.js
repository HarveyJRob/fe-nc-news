import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink, Route, Routes, MemoryRouter, useLocation } from "react-router-dom";

const BreadcrumbsMenu = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="nav-breadcrumbs">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="black" href="/">
          <HomeIcon sx={{ mr: 0.75 }} fontSize="inherit" />
          Home
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            // <Typography key={value} color="GrayText.primary">
            <Typography key={value} color="black">
              {value}
            </Typography>
          ) : (
            <Link key={value} underline="hover" color="black" href={to}>
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </nav>
  );
};

export { BreadcrumbsMenu };
