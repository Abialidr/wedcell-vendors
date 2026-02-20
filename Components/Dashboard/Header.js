import { useEffect, useRef } from "react";
import Styles from "../../styles/Dashboard/Header.module.css";
import Image from "next/image";
import logo from "../../public/logo.jpeg";
import Link from "next/link";
import NavStyles from "../../styles/Navbar.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useRouter } from "next/router";
// import { VenuesModal } from '../layout/topbar modal/VenuesModal';
// import { VendorsModal } from '../layout/topbar modal/VendorsModal';
import { useState } from "react";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
import { S3PROXY } from "../../config";
const Header = ({ setHeaderHeight, setShow }) => {
  const header = useRef(null);
  const dispatch = useDispatch();
  const globleuser = useSelector(selectUser);
  console.log(`🚀 ~ file: Header.js:21 ~ Header ~ globleuser:`, globleuser);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openVendor, setOpenVendor] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenVendor = () => setOpenVendor(true);
  const handleCloseVendor = () => setOpenVendor(false);
  useEffect(() => {
    if (header) {
      setHeaderHeight(header.current.clientHeight);
    }
  }, [header]);
  const showSidebar = () => setShow(true);

  return (
    <div ref={header} className={Styles.header}>
      <div className="nav-container d-flex align-items-center">
        <Button
          variant="outlined"
          onClick={showSidebar}
          style={{
            marginLeft: "20px",
            marginBottom: "5px",
            marginRight: "10px",
          }}
        >
          <MenuIcon />
        </Button>
        <Link
          href={
            globleuser?.role === "ShopNow"
              ? "/dashboard/sellersdashboard"
              : "/dashboard"
          }
        >
          <div
            className="logo-container"
            style={{
              cursor: "pointer",
            }}
          >
            <img
              src={`${S3PROXY}/public/Layout/logo.svg`}
              width={100}
              height={30}
            ></img>
            {/* <Image src={`${S3PROXY}/vendors/images/logo copy.jpeg" width={100} height={30} objectFit="contain`} /> */}
          </div>
        </Link>
        {/* <div className="d-flex nav-links-container align-items-center">
          <div
            className={`${NavStyles.nav_link} d-flex align-items-center text-white position-relative`}
          >
            <span className="d-block primary-text">My profile</span>
            <span className={`d-block ms-2 primary-text ${NavStyles.chevron}`}>
              <KeyboardArrowDownIcon />
            </span>
            <div className={NavStyles.dropdown}>
              <Link href="/dashboard">
                <span className={NavStyles.dropdown_link}> Dashboard</span>
              </Link>

              <span
                onClick={() => {
                  dispatch(user(undefined));
                  localStorage.removeItem("wedcell");
                  localStorage.removeItem("role");
                  localStorage.setItem("wedcellIsLoged", "");

                  router.push("/");
                }}
              >
                <span className={NavStyles.dropdown_link}> logout</span>
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
