import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import Layout from "../../Components/Dashboard/layout";
import ThemeProvider from "../../theme";
import { Container, Grid, Typography } from "@mui/material";
import { AppWidgetSummary } from "../../sections/@dashboard/app";
import { PROXY } from "../../config";
import axios from "axios";
import VenueModal from "../../Components/Auth/VenueModal";
import VendorModal from "../../Components/Auth/VendorModal";
import ShopNowModal from "../../Components/Auth/ShopNowModal";
const Dashboard = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  let [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(
      "🚀 ~ file: index.js:26 ~ useEffect ~ globleuser?.data:",
      globleuser?.data
    );
    if (!globleuser?.data?.contactEmail) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [globleuser]);
  useEffect(() => {
    !globleuser?.success && router.push("/");
  }, []);
  const [data, setData] = useState();
  useEffect(() => {
    const auth = localStorage.getItem("wedcell");
    const role = localStorage.getItem("role");
    setData(JSON.parse(auth));

    if (
      !auth ||
      JSON.parse(role).role === "User" ||
      JSON.parse(role).role === "Students"
    ) {
      router.push("/");
    }
  }, []);
  const [dashdata, setDashData] = useState();
  const getdashboardData = async () => {
    let res;
    if (data?.role === "Venue") {
      res = await axios.get(
        `${PROXY}/venueuser/dashboarddata/${data?.data?._id}`
      );
    }
    if (data?.role === "Vendor") {
      res = await axios.get(
        `${PROXY}/vendoruser/dashboarddata/${data?.data?._id}`
      );
    }
    setDashData(res?.data);
  };
  useEffect(() => {
    getdashboardData();
  }, [data?.role]);
  const intToString = (num) => {
    num = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: "K" },
      { v: 1e6, s: "M" },
      { v: 1e9, s: "B" },
      { v: 1e12, s: "T" },
      { v: 1e15, s: "P" },
      { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s;
  };

  return (
    <Layout>
      {globleuser?.role === "Venue" ? (
        <VenueModal openModal={open}></VenueModal>
      ) : globleuser?.role === "Vendor" ? (
        <VendorModal openModal={open}></VendorModal>
      ) : (
        <ShopNowModal openModal={open}></ShopNowModal>
      )}
      <ThemeProvider>
        {/* <Page title='Dashboard'> */}
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5, mt: 3 }}>
            Hi, Welcome back {data ? data.data.name : ""}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Events"
                total={
                  dashdata?.totalEvents !== undefined && dashdata?.totalEvents
                }
                color="info"
                icon={"eva:list-fill"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Reviews"
                total={
                  dashdata?.totalReview !== undefined && dashdata?.totalReview
                }
                color="error"
                icon={"eva:list-fill"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total View Contacts"
                total={
                  dashdata?.totalcontact !== undefined && dashdata?.totalcontact
                }
                color="warning"
                icon={"eva:list-fill"}
              />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </Layout>
    // <Layout>
    //   <MainDashboard />
    // </Layout>
  );
};

export default Dashboard;
