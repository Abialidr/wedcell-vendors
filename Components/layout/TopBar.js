import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { VenuesModal } from "./topbar modal/VenuesModal";
import { VendorsModal } from "./topbar modal/VendorsModal";
import { ShopModal } from "./topbar modal/ShopModal";
import { LocationsModal } from "./topbar modal/LocationsModal";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Dashboard/Dashboard.module.css";
import axios from "axios";
import Popover from "@mui/material/Popover";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import SearchIcon from "@material-ui/icons/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  ListItem,
  Slide,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
} from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import MobileMenu from "./MobileDrawerMenu";

import {
  selectLocation,
  selectUser,
  location as setLocation,
  user,
} from "../../redux/reducer/appEssentials";
import { PROXY,S3PROXY } from "../../config";
import { useRouter } from "next/router";
import useWindowSize from "@rooks/use-window-size";
import WorkIcon from "@mui/icons-material/Work";
import EditIcon from "@mui/icons-material/Edit";
import StarRateIcon from "@mui/icons-material/StarRate";
const SearchModal = (props) => {
  const { innerWidth } = useWindowSize();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <Dialog
      fullScreen
      open={props.open}
      // onClose={props.handleClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
    >
      <DialogContent>
        <TextField
          // value={input}
          label="Search Venue & Vendors"
          onChange={(e) => props.setInput(e.target.value)}
          sx={{
            paddingRight: "5px",
            margin: "10px auto",
            borderColor: "white",
            backgroundColor: "white",
          }}
          margin="dense"
          fullWidth
          value={props.input}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={props.searchData}>
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <List>
          {props.list?.map((option, index) => (
            <ListItem
              button
              key={index}
              onClick={(e) => {
                router.push(option.link);
                props.handleClose();
              }}
            >
              <ListItemText primary={option.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#B6255A",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            // borderRadius: 20,
            borderColor: "#b6255a",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderRadius: "0px 0px 0px 0px",
            // borderColor: '#b6255a',
            // paddingRight: '0px',
            border: "none",
            borderLeft: "1px solid #b6255a",
          },
          button: {
            display: "none !important",
          },
          "MuiFormLabel-root": {
            color: "#b6255a !important",
          },
        },
      },
    },
    // MuiAutocomplete: {
    //   styleOverrides: {
    //     'MuiFormLabel-root': {
    //       color: '#b6255a !important',
    //     },
    //   },
    // },
  },
});
const theme3 = createTheme({
  palette: {
    primary: {
      main: "#B6255A",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            // borderRadius: 20,
            borderColor: "#b6255a",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderRadius: "0px 0px 0px 0px",
            // borderColor: '#b6255a',
            // paddingRight: '0px',
            border: "none",
          },
          button: {
            display: "none !important",
          },
          "MuiFormLabel-root": {
            color: "#b6255a !important",
          },
        },
      },
    },
  },
});
const theme4 = createTheme({
  palette: {
    primary: {
      main: "#B6255A",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            // borderRadius: 20,
            borderColor: "#b6255a",
          },
          ".MuiOutlinedInput-notchedOutline": {
            // borderColor: '#b6255a',
            // paddingRight: '0px',
            border: "none",
          },
          button: {
            display: "none !important",
          },
          "MuiFormLabel-root": {
            color: "#b6255a !important",
          },
          "& label, & label.Mui-focused": {
            color: "green",
          },
        },
      },
    },
  },
});
const TopBar = () => {
  const searchStyle = {
    background: "#FFFFFF",
    borderRadius: "20px",
    border: "1px solid #b6255a",
    borderRadius: "20px 0px 0px 20px",
    marginRight: "-3px",
    width: "15%",
  };
  const searchStyle1 = {
    // background: "#FFFFFF",
    borderRadius: "20px",
    border: "1px solid #b6255a",
    color: "white",
    marginRight: "-3px",
    width: "15%",
    height: "40px",
  };
  const newLocations = [
    {
      location: "Mumbai",
      id: "Mumbai",
    },
    {
      location: "Pune",
      id: "Pune",
    },
    {
      location: "Delhi",
      id: "Delhi",
    },
    {
      location: "Jaipur",
      id: "Jaipur",
    },
    {
      location: "Goa",
      id: "Goa",
    },
    {
      location: "Udaipur",
      id: "Udaipur",
    },
    {
      location: "Agra",
      id: "Agra",
    },
    {
      location: "Noida",
      id: "Noida",
    },
    {
      location: "Gurgaon",
      id: "Gurgaon",
    },
    {
      location: "Ranchi",
      id: "Ranchi",
    },
    {
      location: "Patna",
      id: "Patna",
    },
    {
      location: "Bangalore",
      id: "Bangalore",
    },
    {
      location: "Hyderabad",
      id: "Hyderabad",
    },
    {
      location: "Ahmedabad",
      id: "Ahmedabad",
    },
    {
      location: "Chennai",
      id: "Chennai",
    },
    {
      location: "Kolkata",
      id: "Kolkata",
    },
    {
      location: "Surat",
      id: "Surat",
    },
    {
      location: "Lucknow",
      id: "Lucknow",
    },
    {
      location: "Kanpur",
      id: "Kanpur",
    },
    {
      location: "Nagpur",
      id: "Nagpur",
    },
    {
      location: "Indore",
      id: "Indore",
    },
    {
      location: "Thane",
      id: "Thane",
    },
    {
      location: "Bhopal",
      id: "Bhopal",
    },
    {
      location: "Visakhapatnam",
      id: "Visakhapatnam",
    },
    {
      location: "Vadodara",
      id: "Vadodara",
    },
    {
      location: "Ghaziabad",
      id: "Ghaziabad",
    },
    {
      location: "Ludhiana",
      id: "Ludhiana",
    },
    {
      location: "Nashik",
      id: "Nashik",
    },
    {
      location: "Meerut",
      id: "Meerut",
    },
    {
      location: "Rajkot",
      id: "Rajkot",
    },
    {
      location: "Varanasi",
      id: "Varanasi",
    },
    {
      location: "Srinagar",
      id: "Srinagar",
    },
    {
      location: "Aurangabad",
      id: "Aurangabad",
    },
    {
      location: "Dhanbad",
      id: "Dhanbad",
    },
    {
      location: "Amritsar",
      id: "Amritsar",
    },
    {
      location: "Allahabad",
      id: "Allahabad",
    },
    {
      location: "Gwalior",
      id: "Gwalior",
    },
    {
      location: "Jabalpur",
      id: "Jabalpur",
    },
    {
      location: "Coimbatore",
      id: "Coimbatore",
    },
    {
      location: "Vijayawada",
      id: "Vijayawada",
    },
    {
      location: "Jodhpur",
      id: "Jodhpur",
    },
    {
      location: "Raipur",
      id: "Raipur",
    },
    {
      location: "Kota",
      id: "Kota",
    },
    {
      location: "Chandigarh",
      id: "Chandigarh",
    },
    {
      location: "Guwahati",
      id: "Guwahati",
    },
    {
      location: "Mysore",
      id: "Mysore",
    },
    {
      location: "Bareilly",
      id: "Bareilly",
    },
    {
      location: "Aligarh",
      id: "Aligarh",
    },
    {
      location: "Moradabad",
      id: "Moradabad",
    },
    {
      location: "Jalandhar",
      id: "Jalandhar",
    },
    {
      location: "Bhuba",
      id: "Bhuba",
    },
    {
      location: "Gorakhpur",
      id: "Gorakhpur",
    },
    {
      location: "Bikaner",
      id: "Bikaner",
    },
    {
      location: "Saharanpur",
      id: "Saharanpur",
    },
    {
      location: "Jamshedpur",
      id: "Jamshedpur",
    },
    {
      location: "Bhilai",
      id: "Bhilai",
    },
    {
      location: "Cuttack",
      id: "Cuttack",
    },
    {
      location: "Firozabad",
      id: "Firozabad",
    },
    {
      location: "Kochi",
      id: "Kochi",
    },
    {
      location: "Dehradun",
      id: "Dehradun",
    },
    {
      location: "Durgapur",
      id: "Durgapur",
    },
    {
      location: "Ajmer",
      id: "Ajmer",
    },
    {
      location: "Siliguri",
      id: "Siliguri",
    },
    {
      location: "Gaya",
      id: "Gaya",
    },
    {
      location: "Tirupati",
      id: "Tirupati",
    },
    {
      location: "Mathura",
      id: "Mathura",
    },
    {
      location: "Bilaspur",
      id: "Bilaspur",
    },
    {
      location: "Haridwar",
      id: "Haridwar",
    },
    {
      location: "Gandhinagar",
      id: "Gandhinagar",
    },
    {
      location: "Shimla",
      id: "Shimla",
    },
    {
      location: "Gangtok",
      id: "Gangtok",
    },
    {
      location: "Nainital",
      id: "Nainital",
    },
    {
      location: "Jaisalmer",
      id: "Jaisalmer",
    },
    {
      location: "Indor",
      id: "Indor",
    },
    {
      location: "Rishikesh",
      id: "Rishikesh",
    },
    {
      location: "kaushali",
      id: "kaushali",
    },
    {
      location: "Pushkar",
      id: "Pushkar",
    },
    {
      location: "Kerala",
      id: "Kerala",
    },
    {
      location: "Jim Corbet",
      id: "Jim Corbet",
    },
    {
      location: "Mussoorie",
      id: "Mussoorie",
    },
    {
      location: "Faridabad",
      id: "Faridabad",
    },
    {
      location: "Dubai",
      id: "Dubai",
    },
    {
      location: "Thailand",
      id: "Thailand",
    },
    {
      location: "Srilanka",
      id: "Srilanka",
    },
    {
      location: "Bali",
      id: "Bali",
    },
    {
      location: "Canada",
      id: "Canada",
    },
    {
      location: "Maldives",
      id: "Maldives",
    },
    {
      location: "Vietnam",
      id: "Vietnam",
    },
    {
      location: "Cambodia",
      id: "Cambodia",
    },
    {
      location: "Philippine",
      id: "Philippine",
    },
    {
      location: "Malaysia",
      id: "Malaysia",
    },
  ];

  const [openAuto, setOpenAuto] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("Press Search To View Result");

  const fetchdata = async () => {
    try {
      let response;
      if (input) {
        response = await axios.get(
          `${PROXY}/globalsearch/fullTextSearch/${input}`
        );
      } else {
        response = await axios.get(
          `${PROXY}/globalsearch/fullTextSearch/chaat`
        );
      }
      return response.data.data;
    } catch (error) {
      console.error("sdfsdhf", error);
    }
  };
  const searchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchdata();
      if (res?.length) {
        // if (list) {
        //   setOldList(list);
        //   setList(res);
        // } else {
        //   setOldList(res);
        setList(res);
        setIsLoading(false);
        setSearchText("Press Search To View Result");
        // }
      } else {
        // setList();
        setIsLoading(false);
        setSearchText("No Data Found");
      }
      setOpenAuto(true);
    } catch (error) {
      console.error(`🚀 ~ file: index.js:393 ~ searchData ~ error:`, error);
      setList([]);
      setIsLoading(false);
      setSearchText("No Data Found");
      setOpenAuto(true);
    }
  };
  const [list, setList] = useState();
  const [oldList, setOldList] = useState();
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value.toLowerCase());
  };
  useEffect(() => {
    fetchdata().then((res) => {
      if (list) {
        setOldList(list);
        setList(res);
      } else {
        setOldList(res);
        setList(res);
      }
    });
  }, []);

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openMobileDrawer, setOpenMobileDrawer] = React.useState(false);
  const [openVendor, setOpenVendor] = React.useState(false);
  const [openShop, setOpenShop] = React.useState(false);
  const [openLocation, setOpenLocation] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  // const [location, setLocation] = React.useState("All Locations");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenVendor = () => setOpenVendor(true);
  const handleCloseVendor = () => setOpenVendor(false);
  const handleOpenShop = () => setOpenShop(true);
  const handleCloseShop = () => setOpenShop(false);
  const handleOpenLocation = () => setOpenLocation(true);
  const handleCloselocation = () => setOpenLocation(false);
  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);

  const handleLocation = (el) => {
    localStorage.setItem("location", el);
    window.dispatchEvent(new Event("location"));
    dispatch(setLocation(el));
    setOpenLocation(false);
  };

  const [open2, setOpen2] = React.useState(true);

  const handleClick = () => {
    setOpen2(!open2);
  };
  const [openCollapse, setOpenCollapse] = React.useState(false);

  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }

  function handleOpenMobileMenu() {
    setOpenMobileDrawer(!openMobileDrawer);
  }

  const MobileDrawer = () => {
    return (
      <SwipeableDrawer
        variant="temporary"
        open={openMobileDrawer}
        PaperProps={{
          sx: { width: "70%" },
        }}
        sx={{ position: "absolute", width: "70%" }}
        onClose={handleOpenMobileMenu}
        disableBackdropTransition
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inboxy" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </SwipeableDrawer>
    );
  };
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);
  const id = open1 ? "simple-popover" : undefined;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  var role;
  if (typeof window !== "undefined") {
    let local = localStorage.getItem("role");
    role = local ? JSON.parse(local).role : null;
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const router = useRouter();

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  // React.useEffect(() => {
  //   setLocation(
  //     !localStorage.getItem("location") ||
  //       localStorage.getItem("location") === ""
  //       ? "All Locations"
  //       : localStorage.getItem("location")
  //   );
  // }, []);
  const location = useSelector(selectLocation);
  const globleuser = useSelector(selectUser);

  // React.useEffect(() => {
  //   const listenStorageChange = () => {
  //     if (localStorage.getItem("location") === null) {
  //       setLocation("");
  //     } else {
  //       setLocation(localStorage.getItem("location"));
  //     }
  //   };
  //   window.addEventListener("location", listenStorageChange);
  //   return () => window.removeEventListener("location", listenStorageChange);
  // }, []);

  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <VenuesModal open={open} handleClose={handleClose} />
      <VendorsModal open={openVendor} handleClose={handleCloseVendor} />
      <ShopModal open={openShop} handleClose={handleCloseShop} />
      <LocationsModal
        open={openLocation}
        handleClose={handleCloselocation}
        handleLocation={handleLocation}
      />
      <SearchModal
        open={openSearch}
        handleClose={handleCloseSearch}
        input={input}
        setInput={setInput}
        searchData={searchData}
        list={list}
        // handleLocation={handleLocation}
      />
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(180deg, #C53244 0%, #B4245D 100%)",
          boxShadow: "none",
          backdropFilter: "blur(21px)",
          height: { md: 99, xs: 60 },
          justifyContent: "center",
        }}
      >
        {/* <MobileDrawer /> */}
        <MobileMenu
          openDrawer={openMobileDrawer}
          handleMobileMenu={handleOpenMobileMenu}
        />

        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className={styles.mainBar}
        >
          <Box sx={{ display: { md: "none", xs: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="white"
              sx={{ color: "white", height: "60px" }}
              onClick={handleOpenMobileMenu}
              // onClick={handleMobileMenuOpen}
              // onClick={handleOpenSettings}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className={styles.formbar}
          >
            <Box>
              <Link href="/" passHref>
                <Box
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    // width: { md: 280, xs: 160 },
                    height: "90%",
                    marginRight: 3,
                    // marginTop: -3,
                    // border: 1,
                  }}
                >
                  <Image
                    src={`${S3PROXY}/vendors/images/Frame.svg`}
                    alt="Wedcell"
                    width={windowWidth > 900 ? 180 : 130}
                    height={windowWidth > 900 ? 90 : 70}
                    style={{ marginTop: "4px" }}
                  />
                </Box>
              </Link>
            </Box>
            {windowWidth > 900 ? (
              <>
                <div className={`${styles.form} SearchForM1234567890`}>
                  <ThemeProvider theme={theme3}>
                    <Autocomplete
                      open={false}
                      onOpen={() => {
                        setOpenLocation(true);
                      }}
                      sx={searchStyle}
                      className={styles.allButton}
                      id="country-select-demo"
                      options={newLocations}
                      autoHighlight
                      getOptionLabel={(option) => option.location}
                      renderInput={(params) => (
                        <TextField
                          style={{ border: "none" }}
                          {...params}
                          label={location?.length ? location : "All"}
                          disabled
                        />
                      )}
                    />
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <Autocomplete
                      className={styles.autocomplete1}
                      noOptionsText={searchText}
                      open={openAuto}
                      loading={isloading}
                      onOpen={() => {
                        setOpenAuto(true);
                      }}
                      onClose={() => {
                        setOpenAuto(false);
                      }}
                      sx={{
                        borderColor: "white",
                        width: {
                          sm: "130px",
                          md: "280px",
                          lg: "300px",
                          xl: "270px",
                          xs: "180px",
                        },
                      }}
                      disablePortal
                      id="combo-box-demo"
                      options={list?.map((item) => {
                        return { label: item.name, id: item._id };
                      })}
                      onChange={(data) => {
                        const selectedData =
                          list[
                            parseInt(data.target.id[data.target.id?.length - 1])
                          ];
                        if (selectedData?.link) {
                          router.push(`${selectedData?.link}`);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Venue & Vendors"
                          onSelect={handleInput}
                          sx={{
                            width: {
                              // sm: '350px',
                              // xs: '210px',
                              // lg: '210px',
                            },
                            paddingRight: "5px",
                            margin: "10px auto",
                            borderColor: "white",
                            backgroundColor: "white",
                          }}
                        />
                      )}
                    />
                  </ThemeProvider>
                  <button
                    type="submit"
                    className={`${styles.formButton}`}
                    onClick={searchData}
                  >
                    Search
                  </button>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "end",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <ThemeProvider theme={theme4}>
                  <img
                    className={styles.locationimg}
                    src={`${S3PROXY}/vendors/images/locationIndex.png`}
                    alt=""
                  />
                  <Autocomplete
                    open={false}
                    onOpen={() => {
                      setOpenLocation(true);
                    }}
                    sx={searchStyle1}
                    className={styles.allButton}
                    id="country-select-demo"
                    options={newLocations}
                    autoHighlight
                    getOptionLabel={(option) => (
                      <span style={{ fontSize: "29px" }}>
                        {option.location}
                      </span>
                    )}
                    renderInput={(params) => (
                      <TextField
                        style={{ border: "none", height: "100%" }}
                        {...params}
                        label={location?.length ? location : "All Locations"}
                        disabled
                      />
                    )}
                  />
                </ThemeProvider>
                <div
                  className={styles.searchIconstyle}
                  onClick={() => handleOpenSearch()}
                >
                  <img
                    src={`${S3PROXY}/vendors/images/searchiconindex.png`}
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>
          {/* <Box sx={{ flexGrow: 1 }} /> */}

          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} /> */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, paddingLeft: "10px" }}
          >
            {/* <Link
              href={globleuser ? "/user-dashboard" : "/customer-login"}
              passHref
            >
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Typography sx={{ fontSize: "12px" }}>
                  Planning Tools
                </Typography>
              </IconButton>
            </Link> */}

            <IconButton
              size="small"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleOpen}
            >
              <Typography className={styles.headerFontsize}>Venues </Typography>
              {!open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
            <IconButton
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleOpenVendor}
            >
              <Typography className={styles.headerFontsize}>
                Vendors{" "}
              </Typography>
              {!openVendor ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowUpIcon />
              )}
            </IconButton>

            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleOpenShop}
              color="inherit"
            >
              <Typography className={styles.headerFontsize}>
                Shop Now{" "}
              </Typography>
              {!openShop ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>

            {/* <Link href={"/RealWeddingHome"} passHref>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Typography sx={styles.menuOptions}>Real Weddings</Typography>
                {/* {!openShop ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />} 
              </IconButton>
            </Link> */}

            {/* <Link href={"/vendor"} passHref>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Typography sx={styles.menuOptions}>Get jobs </Typography>
              </IconButton>
            </Link> */}

            <Link href={"/student"} passHref>
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Typography
                  sx={{ fontSize: "12px" }}
                  className={styles.headerFontsize}
                >
                  Hire freelancer{" "}
                </Typography>
              </IconButton>
            </Link>

            {/* <a href={"https://wedcellinstitute.com/"} target="_blank">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Typography sx={styles.menuOptions}>WedCell Institute</Typography>
              </IconButton>
            </a> */}
            {role === "User" ? (
              <IconButton
                size="small"
                edge="end"
                // aria-label="account of current user"
                // aria-controls={menuId}
                // aria-haspopup="true"
                color="inherit"
              >
                <div>
                  <div
                    className={styles.profilePic}
                    aria-describedby={id}
                    variant="contained"
                    onClick={handleClick1}
                  >
                    {globleuser?.data?.name?.substring(0, 1)}
                  </div>
                  <Popover
                    style={{ marginTop: "7px" }}
                    id={id}
                    open={open1}
                    onClose={handleClose1}
                    anchorEl={anchorEl1}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <div
                      style={{
                        width: "280px",
                        // padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className={styles.profilepicImgName}>
                        <div className={styles.profilepicImg}></div>
                        <span className={styles.userName}>
                          {globleuser?.data?.name} <br />
                          <span className={styles.userEmail}>
                            {globleuser?.data?.email}
                          </span>{" "}
                        </span>
                      </div>
                      <div className={`${styles.redirectionDiv}`}>
                        <article
                          className={
                            router.pathname === "/user-dashboard"
                              ? styles.redirectioselectedArticle
                              : ""
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              globleuser ? "/user-dashboard" : "/customer-login"
                            );
                          }}
                        >
                          <StarRateIcon
                            style={{
                              color:
                                router.pathname === "/user-dashboard"
                                  ? "red"
                                  : "#BBBBBB",
                              fontSize: "25px",
                            }}
                          />
                          <span>Wedding Planner</span>
                        </article>
                        <article
                          className={
                            router.pathname === "/user-dashboard/profile"
                              ? styles.redirectioselectedArticle
                              : ""
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              globleuser
                                ? "/user-dashboard/profile"
                                : "/customer-login"
                            );
                          }}
                        >
                          <EditIcon
                            style={{
                              color:
                                router.pathname === "/user-dashboard/profile"
                                  ? "red"
                                  : "#BBBBBB",
                              fontSize: "25px",
                            }}
                          />
                          <span>Edit Profile</span>
                        </article>
                        <article
                          className={
                            router.pathname === "/user-dashboard/wishlist"
                              ? styles.redirectioselectedArticle
                              : ""
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              globleuser
                                ? "/user-dashboard/wishlist"
                                : "/customer-login"
                            );
                          }}
                        >
                          <FavoriteIcon
                            style={{
                              color:
                                router.pathname === "/user-dashboard/wishlist"
                                  ? "red"
                                  : "#BBBBBB",
                              fontSize: "25px",
                            }}
                          />
                          <span>Wishlist</span>
                        </article>
                        <article
                          className={
                            router.pathname === "/user-dashboard/cart"
                              ? styles.redirectioselectedArticle
                              : ""
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              globleuser
                                ? "/user-dashboard/cart"
                                : "/customer-login"
                            );
                          }}
                        >
                          <ShoppingCartIcon
                            style={{
                              color:
                                router.pathname === "/user-dashboard/cart"
                                  ? "red"
                                  : "#BBBBBB",
                              fontSize: "25px",
                            }}
                          />
                          <span>Cart</span>
                        </article>
                        <article
                          className={
                            router.pathname === "/user-dashboard/orders"
                              ? styles.redirectioselectedArticle
                              : ""
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              globleuser
                                ? "/user-dashboard/orders"
                                : "/customer-login"
                            );
                          }}
                        >
                          <WorkIcon
                            style={{
                              color:
                                router.pathname === "/user-dashboard/orders"
                                  ? "red"
                                  : "#BBBBBB",
                              fontSize: "25px",
                            }}
                          />
                          <span>My Orders</span>
                        </article>
                        <article
                          className={
                            router.pathname === "/user-dashboard/contact"
                              ? styles.redirectioselectedArticle
                              : ""
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              globleuser
                                ? "/user-dashboard/contact"
                                : "/customer-login"
                            );
                          }}
                        >
                          <ContactPhoneIcon
                            style={{
                              color:
                                router.pathname === "/user-dashboard/contact"
                                  ? "red"
                                  : "#BBBBBB",
                              fontSize: "25px",
                            }}
                          />
                          <span>Contacts</span>
                        </article>
                      </div>
                      <button
                        className={styles.goToWed}
                        onClick={() => {
                          localStorage.removeItem("wedcell");
                          localStorage.setItem("wedcellIsLoged", "");
                          localStorage.removeItem("role");
                          dispatch(user(undefined));
                          router.push("/");
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </Popover>
                </div>
              </IconButton>
            ) : role === "Students" ||
              role === "Vendor" ||
              role === "Venue" ||
              role === "ShopNow" ? (
              <Link
                href={
                  role === "User"
                    ? "/user-dashboard"
                    : role === "Students"
                    ? "/student/profile"
                    : role === "Vendor" || role === "Venue"
                    ? "/dashboard"
                    : role === "ShopNow"
                    ? "/dashboard/sellersdashboard"
                    : "/customer-login"
                }
                passHref
              >
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Typography sx={{ fontSize: "12px" }}>
                    {role === "User" ||
                    role === "Students" ||
                    role === "Vendor" ||
                    role === "Venue" ||
                    role === "ShopNow"
                      ? "Dashboard"
                      : "Login"}
                  </Typography>
                </IconButton>
              </Link>
            ) : (
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Typography
                  sx={{ fontSize: "12px" }}
                  className={styles.headerFontsize}
                  onClick={() => {
                    router.push("/customer-login");
                  }}
                >
                  Login
                </Typography>
              </IconButton>
            )}
            {/* <Link
              href={
                role === "User"
                  ? "/user-dashboard"
                  : role === "Students"
                  ? "/student/profile"
                  : role === "Vendor" || role === "Venue"
                  ? "/dashboard"
                  : role === "ShopNow"
                  ? "/dashboard/sellersdashboard"
                  : "/customer-login"
              }
              passHref
            >
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Typography sx={{ fontSize: "12px" }}>
                  {role === "User" ||
                  role === "Students" ||
                  role === "Vendor" ||
                  role === "Venue" ||
                  role === "ShopNow"
                    ? "Dashboard"
                    : "Login"}
                </Typography>
              </IconButton>
            </Link> */}

            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Typography sx={styles.menuOptions}>Login </Typography>
            </IconButton> */}
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}
    </Box>
  );
};

export default TopBar;
