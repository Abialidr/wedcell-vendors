import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Person from "@mui/icons-material/Person";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Colours from "../constants.js/Colors";
import { useRouter } from "next/router";

const BottomNav = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  var role;
  if (typeof window !== "undefined") {
    let local = localStorage.getItem("role");
    role = local ? JSON.parse(local).role : null;
  }

  useEffect(() => {
    if (router.pathname.includes("/vendors")) {
      setValue(2);
    } else if (router.pathname.includes("/venue")) {
      setValue(1);
    } else if (router.pathname.includes("/products")) {
      setValue(3);
    } else if (
      router.pathname.includes("/customer-login") ||
      router.pathname.includes("/vendor-login")
    ) {
      setValue(4);
    } else {
      setValue(0);
    }
  }, [router]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: "1000",
        // paddingLeft: "8vw",
        // paddingRight: "8vw",
        display: { xs: "flex", md: "none" },
        justifyContent: "center",

        // bgcolor: "red",
        // width: "100%",
        ".MuiBottomNavigation-root": {
          paddingX: 10,
          width: "95vw",
          //   marginX: "8vw",
        },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          localStorage.setItem("navTab", newValue);
          if (newValue === 0) {
            router.push("/");
          } else if (newValue === 1) {
            router.push("/venue");
          } else if (newValue === 2) {
            router.push("/vendors");
          } else if (newValue === 3) {
            router.push("/products");
          } else if (newValue === 4) {
            router.push(
              role === "User" ? "/user-dashboard" : "/customer-login"
            );
          }
        }}
      >
        <BottomNavigationAction
          sx={{
            "&:focus": {
              color: Colours.Champagne_Gold.Dark,
            },
          }}
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          sx={{
            "&:focus": {
              color: Colours.Champagne_Gold.Dark,
            },
          }}
          label="Venues"
          icon={<LocationCityIcon />}
        />
        <BottomNavigationAction
          sx={{
            "&:focus": {
              color: Colours.Champagne_Gold.Dark,
            },
          }}
          label="Vendors"
          icon={<StorefrontIcon />}
        />
        <BottomNavigationAction
          sx={{
            "&:focus": {
              color: Colours.Champagne_Gold.Dark,
            },
          }}
          label="Shop"
          icon={<ShoppingBagIcon />}
        />
        <BottomNavigationAction
          sx={{
            "&:focus": {
              color: Colours.Champagne_Gold.Dark,
            },
          }}
          label="Planning"
          icon={<Person />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
