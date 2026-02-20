// import React, { useEffect, useState } from "react";
import Styles from "../../styles/Dashboard/Sidebar.module.css";
import { AiOutlineCompass, AiOutlineContacts } from "react-icons/ai";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import TodayIcon from "@mui/icons-material/Today";
import React, { useEffect } from "react";
import { Container, Offcanvas } from "react-bootstrap";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
function Sidebar({ headerHeight, dashboard, setShow, show }) {
  const closeSidebar = () => setShow(false);
  const showSidebar = () => setShow(true);
  const globleuser = useSelector(selectUser);
  const dispatch = useDispatch();

  const router = useRouter();

  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(JSON.parse(localStorage.getItem("role")).role);
  }, [router]);
  useEffect(() => {}, [role]);
  return (
    <Offcanvas show={show} onHide={closeSidebar} style={{ width: "250px" }}>
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <div className="sidebar-links-container">
          {role === "Vendor" || role === "Venue" ? (
            <>
              <div
                className={
                  router.pathname === "/dashboard"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/dashboard")}
              >
                <span className={`${Styles.sidebar_icon} me-2`}>
                  <AiOutlineCompass />
                </span>
                <span>Dashboard</span>
              </div>
              {globleuser.data.category !== "Planning & Decor" ? (
                <></>
              ) : (
                <div
                  className={
                    router.pathname === "/dashboard/sellersdashboard"
                      ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                      : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                  }
                  onClick={() => router.push("/dashboard/sellersdashboard")}
                >
                  <span className={`${Styles.sidebar_icon} me-2`}>
                    <AiOutlineCompass />
                  </span>
                  <span>Decore Dashboard</span>
                </div>
              )}

              {/* <div
                className={
                  router.pathname === "/dashboard/pricing"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/dashboard/pricing")}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <FaMoneyBillAlt />
                </span>
                <span>Pricing</span>
              </div> */}
              <div
                className={
                  router.pathname === "/dashboard/event"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/dashboard/event")}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <TodayIcon sx={{ fontSize: "20px" }} />
                </span>
                <span>Events</span>
              </div>
              <div
                className={
                  router.pathname ===
                  `/dashboard/reviews1/${globleuser?.data?._id}`
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() =>
                  router.push(
                    `/dashboard/reviews1/${globleuser?.data?._id}?type=${
                      role === "Venue" ? "Venue" : "Vendor"
                    }`
                  )
                }
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <TodayIcon sx={{ fontSize: "20px" }} />
                </span>
                <span>Reviews</span>
              </div>
              <div
                className={
                  router.pathname === `/dashboard/leads`
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push(`/dashboard/leads`)}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <TodayIcon sx={{ fontSize: "20px" }} />
                </span>
                <span>Leads</span>
              </div>
              <div
                className={
                  router.pathname === `/dashboard/Message`
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push(`/dashboard/Message`)}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <TodayIcon sx={{ fontSize: "20px" }} />
                </span>
                <span>Message</span>
              </div>
            </>
          ) : null}
          {role === "ShopNow" ? (
            <>
              <div
                className={
                  router.pathname === "/dashboard/sellersdashboard"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/dashboard/sellersdashboard")}
              >
                <span className={`${Styles.sidebar_icon} me-2`}>
                  <AiOutlineCompass />
                </span>
                <span>Sellers Dashboard</span>
              </div>
              <div
                className={
                  router.pathname === `/dashboard/Message`
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push(`/dashboard/Message`)}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <TodayIcon sx={{ fontSize: "20px" }} />
                </span>
                <span>Message</span>
              </div>
              <div
                className={
                  router.pathname ===
                  `/dashboard/reviews1/${globleuser?.data?._id}`
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() =>
                  router.push(
                    `/dashboard/reviews1/${globleuser?.data?._id}?type=Product`
                  )
                }
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <TodayIcon sx={{ fontSize: "20px" }} />
                </span>
                <span>Reviews</span>
              </div>
            </>
          ) : (
            <></>
          )}
          <div
            className={
              router.pathname === `/dashboard/OtherProduct`
                ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
            }
            onClick={() => router.push(`/dashboard/OtherProduct`)}
          >
            <span className={`${Styles.sidebar_icon} me-3`}>
              <TodayIcon sx={{ fontSize: "20px" }} />
            </span>
            <span>Booking/Purchase Details</span>
          </div>
          <div
            className={
              router.pathname === "/dashboard/profile" ||
              router.pathname === "/user-dashboard/profile"
                ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
            }
            onClick={() =>
              role === "Vendor" ||
              role === "ShopNow" ||
              role === "Venue" ||
              role === "Product"
                ? router.push("/dashboard/profile")
                : router.push("/user-dashboard/profile")
            }
          >
            <span className={`${Styles.sidebar_icon} me-3`}>
              <AiOutlineContacts />
            </span>
            <span>Profile</span>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "15px",
              fontSize: "15px",
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              alignItems: "center",
            }}
          >
            <span>Logout</span>
            <button
              style={{ background: "none", border: "none" }}
              onClick={() => {
                dispatch(user(undefined));
                localStorage.removeItem("wedcell");
                localStorage.removeItem("role");
                localStorage.setItem("wedcellIsLoged", "");

                router.push("/");
              }}
            >
              <LogoutIcon></LogoutIcon>
            </button>
          </div>
          {/* {role !== "Students" ? (
            <div
              className={
                router.pathname === "/dashboard/contact" ||
                router.pathname === "/user-dashboard/contact"
                  ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                  : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
              }
              onClick={() =>
                role === "Vendor" || role === "ShopNow" || role === "Venue"
                  ? router.push("/dashboard/contact")
                  : router.push("/user-dashboard/contact")
              }
            >
              <span className={`${Styles.sidebar_icon} me-3`}>
                <ContactPhoneIcon sx={{ fontSize: "20px" }} />
              </span>
              <span>View Contact</span>
            </div>
          ) : null} */}
          {/* <div
          className={
            router.pathname === "/dashboard/change-password" ||
            router.pathname === "/user-dashboard/change-password"
              ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
              : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
          }
          onClick={() =>
            dashboard && dashboard === "vendor"
              ? router.push("/dashboard/change-password")
              : router.push("/user-dashboard/change-password")
          }
        >
          <span className={`${Styles.sidebar_icon} me-3`}>
            <GrUpdate />
          </span>
          <span>Change Password</span>
        </div> */}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
