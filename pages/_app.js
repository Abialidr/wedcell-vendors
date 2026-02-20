import "../styles/globals.css";
import "../styles/bootstrap.min.css";
import "../bootstrap-custom.css";
import "../styles/index.css";
import Layout from "../Components/layout/Layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../styles/picker.css";
import "../styles/swiper.css";
import "../styles/Shop.css";
// import '../styles/banner.css';
import "../styles/Wedfilter.css";
// import '../styles/Profiles.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Colours from "../Components/constants.js/Colors";
import { Analytics } from "@vercel/analytics/react";
import { App as CapacitorApp } from "@capacitor/app";

library.add(fas, far, fab);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: Colours.Champagne_Gold.Dark,
      },
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
          <Analytics />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
