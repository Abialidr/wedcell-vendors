import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { location, user } from "../../redux/reducer/appEssentials";
import { PROXY } from "../../config";
import axios from "axios";
import Head from "next/head";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const checkSession = async () => {
    let user12;
    if (localStorage.getItem("wedcell") !== "") {
      user12 = JSON.parse(localStorage.getItem("wedcell"));
    }
    if (user12) {
      const res = await axios.get(`${PROXY}`, {
        headers: {
          authorization: user12?.data?.token,
        },
      });
      if (res.data.success === false) {
        dispatch(user(undefined));
        localStorage.removeItem("wedcell");
        localStorage.removeItem("wedcellIsLoged");
        localStorage.removeItem("role");
      }
    } else {
      dispatch(user(undefined));
    }
  };
  useEffect(() => {
    checkSession();
    if (localStorage.getItem("wedcell") !== "") {
      dispatch(user(JSON.parse(localStorage.getItem("wedcell"))));
    }
    dispatch(location(localStorage.getItem("location")));
    const listenStorageChange = () => {
      if (localStorage.getItem("location") === null) {
        dispatch(location(""));
      } else {
        dispatch(location(localStorage.getItem("location")));
      }
    };
    window.addEventListener("location", listenStorageChange);
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, "
        />
      </Head>

      {children}
    </>
  );
};

export default Layout;
