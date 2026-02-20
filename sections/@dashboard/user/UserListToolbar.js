import PropTypes from "prop-types";
// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import { useState } from "react";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  padding: theme.spacing(0, 1, 0, 3),
  overflow: "scroll",
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  onClick,
  onClick1,
  onClick2,
  onClick3,
  onClick4,
  onClick5,
  onClick6,
  type,
  applySearch,
}) {
  console.log(`🚀 ~ file: UserListToolbar.js:66 ~ applySearch:`, applySearch);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const [anchorEl5, setAnchorEl5] = useState(null);
  const [anchorEl6, setAnchorEl6] = useState(null);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
  const open5 = Boolean(anchorEl5);
  const open6 = Boolean(anchorEl6);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleClick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };
  const handleClick6 = (event) => {
    setAnchorEl6(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };
  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  const handleClose5 = () => {
    setAnchorEl5(null);
  };
  const handleClose6 = () => {
    setAnchorEl6(null);
  };
  const Arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}>
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          endAdornment={
            <InputAdornment position="start">
              <Button onClick={() => applySearch()}>
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </Button>
            </InputAdornment>
          }
        />
      )}
      {numSelected > 0 ? (
        <>
          {/* <Button onClick={onClick} variant="outlined">UPDATE TO POPULAR</Button> */}
          {type !== "Users" ? (
            <>
              {type !== "Student" ? (
                <div>
                  <Button
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}>
                    POPULAR
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}>
                    <MenuItem onClick={onClick}>Add</MenuItem>
                    <MenuItem onClick={onClick}>Remove</MenuItem>
                  </Menu>
                </div>
              ) : (
                <></>
              )}
              <div>
                <Button
                  id="fade-button1"
                  aria-controls={open1 ? "fade-menu1" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? "true" : undefined}
                  onClick={handleClick1}>
                  ALLOWED
                </Button>
                <Menu
                  id="fade-menu1"
                  MenuListProps={{
                    "aria-labelledby": "fade-button1",
                  }}
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  TransitionComponent={Fade}>
                  <MenuItem onClick={onClick1}>Add</MenuItem>
                  <MenuItem onClick={onClick1}>Remove</MenuItem>
                </Menu>
              </div>
              <div>
                <Button
                  id="fade-button3"
                  aria-controls={open3 ? "fade-menu3" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open3 ? "true" : undefined}
                  onClick={handleClick3}>
                  {type === "Venue" ? "ON PANEL" : "EXCLUSIVE"}
                </Button>
                <Menu
                  id="fade-menu3"
                  MenuListProps={{
                    "aria-labelledby": "fade-button3",
                  }}
                  anchorEl={anchorEl3}
                  open={open3}
                  onClose={handleClose3}
                  TransitionComponent={Fade}>
                  <MenuItem onClick={onClick3}>Add</MenuItem>
                  <MenuItem onClick={onClick3}>Remove</MenuItem>
                </Menu>
              </div>
              {type === "Venue" || type === "Vendor" ? (
                <>
                  <div>
                    <Button
                      id="fade-button3"
                      aria-controls={open4 ? "fade-menu3" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open4 ? "true" : undefined}
                      onClick={handleClick4}>
                      AWARDED
                    </Button>
                    <Menu
                      id="fade-menu3"
                      MenuListProps={{
                        "aria-labelledby": "fade-button3",
                      }}
                      anchorEl={anchorEl4}
                      open={open4}
                      onClose={handleClose4}
                      TransitionComponent={Fade}>
                      <MenuItem onClick={onClick4}>Add</MenuItem>
                      <MenuItem onClick={onClick4}>Remove</MenuItem>
                    </Menu>
                  </div>
                  <div>
                    <Button
                      id="fade-button3"
                      aria-controls={open6 ? "fade-menu3" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open6 ? "true" : undefined}
                      onClick={handleClick6}>
                      RATING
                    </Button>
                    <Menu
                      id="fade-menu3"
                      MenuListProps={{
                        "aria-labelledby": "fade-button3",
                      }}
                      anchorEl={anchorEl6}
                      open={open6}
                      onClose={handleClose6}
                      TransitionComponent={Fade}>
                      {Arr1.map((val) => {
                        return <MenuItem onClick={onClick6}>{val}</MenuItem>;
                      })}
                    </Menu>
                  </div>
                </>
              ) : (
                <></>
              )}
              {type === "Venue" ? (
                <div>
                  <Button
                    id="fade-button3"
                    aria-controls={open5 ? "fade-menu3" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open5 ? "true" : undefined}
                    onClick={handleClick5}>
                    STARS
                  </Button>
                  <Menu
                    id="fade-menu3"
                    MenuListProps={{
                      "aria-labelledby": "fade-button3",
                    }}
                    anchorEl={anchorEl5}
                    open={open5}
                    onClose={handleClose5}
                    TransitionComponent={Fade}>
                    <MenuItem onClick={onClick5}>4 Stars</MenuItem>
                    <MenuItem onClick={onClick5}>5 Stars</MenuItem>
                    <MenuItem onClick={onClick5}>Remove</MenuItem>
                  </Menu>
                </div>
              ) : (
                <></>
              )}
              {type === "Vendor" || type === "Venue" || type === "Products" ? (
                <IconButton
                  id="fade-button2"
                  aria-controls={open2 ? "fade-menu1" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open2 ? "true" : undefined}
                  onClick={handleClick2}>
                  <Iconify icon="eva:trash-2-fill" />
                </IconButton>
              ) : (
                <></>
              )}
              <Menu
                id="fade-menu2"
                MenuListProps={{
                  "aria-labelledby": "fade-button1",
                }}
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                TransitionComponent={Fade}>
                <MenuItem onClick={onClick2}>Delete</MenuItem>
                <MenuItem onClick={onClick2}>Recover</MenuItem>
              </Menu>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
