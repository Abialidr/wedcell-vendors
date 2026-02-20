import Header from "../../Components/Dashboard/Header";
import Styles from "../../styles/Dashboard/Dashboard.module.css";
import { useEffect, useState } from "react";
import Sidebar from "../../Components/Dashboard/Sidebar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginRoute, selectUser } from "../../redux/reducer/appEssentials";

const videos = () => {
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    !globleuser.success && router.push("/");
  }, []);
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    let user = globleuser;
    if (!user) {
      router.push("/vendor-login");
      dispatch(
        loginRoute({
          pathname: router.pathname,
          query: router.query,
        })
      );
    }
  }, [router]);
  return (
    <div className={`${Styles.dashboard_container} bg-grey`}>
      <Header setHeaderHeight={setHeaderHeight} />
      <div
        className="main_dashboard position-relative"
        style={{ marginTop: `${headerHeight}px` }}
      >
        <Sidebar headerHeight={headerHeight} dashboard="vendor" />
        <div
          className={`${Styles.main_content} ms-auto`}
          style={{
            transition: "all 450ms",
            width: isSidebarOpen ? "80%" : "100%",
          }}
        >
          <h3>There is nothing to show</h3>
        </div>
      </div>
    </div>
  );
};

export default videos;
