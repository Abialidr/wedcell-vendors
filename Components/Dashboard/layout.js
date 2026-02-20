import Header from "./Header";
import Sidebar from "./Sidebar";
import Styles from "../../styles/Dashboard/Dashboard.module.css";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import { useRouter } from "next/router";
// import TopBar from "../layout/TopBar";

const Layout = ({ children }) => {
  const router = useRouter();
  const globleuser = useSelector(selectUser);
  // useEffect(() => {
  //   globleuser && !globleuser.success && router.push("/dashboard");
  // }, []);
  const [headerHeight, setHeaderHeight] = useState(0);

  const [show, setShow] = useState(false);

  return globleuser?.success ? (
    <div className={`${Styles.dashboard_container} bg-grey`}>
      {/* <TopBar /> */}
      {!router?.pathname.includes("/user-dashboard") ? (
        <>
          <Header setHeaderHeight={setHeaderHeight} setShow={setShow} />
          <div
            className="main_dashboard position-relative"
            // style={{ marginTop: `${headerHeight}px` }}
          >
            <Sidebar
              headerHeight={headerHeight}
              dashboard="/user-dashboard/contact"
              show={show}
              setShow={setShow}
            />
            <div
              className={` ms-auto`}
              style={{
                width: router?.pathname === "/user-dashboard" ? "100%" : "95%",
              }}
            ></div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div
        style={{
          // marginTop: "35px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Layout;
