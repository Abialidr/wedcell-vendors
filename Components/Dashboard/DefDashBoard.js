import React, { useEffect, useState } from "react";
import styles from "../../styles/Dashboard/MainDashboard.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { PROXY } from "../../config";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImageDelete } from "../Helpers/FileHandlers";
import { Spinner } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import Chart from "chart.js/auto";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox, TablePagination } from "@mui/material";
import moment from "moment/moment";
import Modal from "./PickupModal";
const DefDashBoard = ({ setCurrState }) => {
  const [revenueData, setRevenueData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const [changeDays, setChangeDays] = useState("AllDate");
  const globleuser = useSelector(selectUser);

  const router = useRouter();

  const [user, setUser] = useState(null);

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = ["Cancel"];

  const ITEM_HEIGHT = 48;
  const [config, setConfig] = useState(null);
  const [oneDatadone, setOneDatadone] = useState(null);
  const [data, setData] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [productData, setProductData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [currentData, setCurrentData] = useState();
  const [allTimeData, setAllTimeData] = useState();
  const [last7DaysData, setLast7DaysData] = useState();
  const [todayData, setTodayData] = useState();
  const [monthlyData, setMonthlyData] = useState([]);
  const [threeMonthData, setThreeMonthData] = useState([]);
  // const [twelveMonthsData, setTwelveMonthsData] = useState([]);
  const [totalSales, setTotalSales] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const [totalProduct, setTotalProduct] = useState(0);
  const [twelveMonthsData, setTwelveMonthsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickupTime, setPickupTime] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [expectedPackageCount, setExpectedPackageCount] = useState("");
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  // You can replace this with your actual user list data
  const uSERLIST = []; // Your user list array

  // Handler for changing the page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    FetchOrderData(globleuser, config, newPage);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      pickup_time: pickupTime + ":00",
      pickup_date: pickupDate,
      // pickup_location: pickupLocation,
      expected_package_count: parseInt(expectedPackageCount),
    };

    closeModal();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (formData) => {
    // Handle the form submission
  };
  useEffect(() => {
    const currentMonth = new Date().getMonth(); // Get the current month (0-11)

    const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const defaultData = Array(12).fill(0);

    // Fill in the available data from twelveMonthsData
    const filledRevenueData = [...defaultData];
    const filledSalesData = [...defaultData];

    twelveMonthsData.forEach((data) => {
      const index = data.month - 1;
      filledRevenueData[index] = data.totalAmount;
      filledSalesData[index] = data.totalOrderCount;
    });

    const revenueDataset = {
      label: "Revenue",
      data: filledRevenueData?.map((value, index) =>
        index > currentMonth ? null : value / 100
      ),
      borderWidth: 3,
    };

    let myChart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: labels,
        // datasets: [revenueDataset, salesDataset],
        datasets: [revenueDataset],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [twelveMonthsData]);
  useEffect(() => {
    if (changeDays == "AllDate") {
      setCurrentData(allTimeData);
    }
    if (changeDays == "12Months") {
      setCurrentData({
        totalAmount: twelveMonthsData.reduce(
          (acc, entry) => acc + entry.totalAmount,
          0
        ),
        totalOrderCount: twelveMonthsData.reduce(
          (acc, entry) => acc + entry.totalOrderCount,
          0
        ),
      });
    }
    if (changeDays == "30days") {
      setCurrentData(monthlyData);
    }
    if (changeDays == "7Days") {
      setCurrentData(last7DaysData);
    }
    if (changeDays == "24Hours") {
      setCurrentData(todayData);
    }
  }, [changeDays]);
  const cancel_order = async (id, mode, paymentId, amount) => {
    // e.preventDefault()
    const res = await axios.post(
      `${PROXY}/api/v1/cancel`,
      {
        id: id,
        mode: mode,
        paymentId: paymentId,
        amount: amount,
      },
      {
        headers: {
          authorization: globleuser?.data?.token,
        },
      }
    );
    FetchOrderData(globleuser, config, page);
    FetchProductData(globleuser, config);
    FetchTopCity(globleuser, config);
    FetchChartData(globleuser, config);
    // setopencancelOrder(true);
    // setCancelOrder(true)
  };
  const packingSlip = async (waybill) => {
    // e.preventDefault()
    const res = await axios.get(`${PROXY}/delivery/packing_slip`, {
      headers: {
        authorization: globleuser?.data?.token,
      },
      params: {
        waybill: waybill,
      },
    });

    // setopencancelOrder(true);
    window.open(res.data, "_blank");

    // setCancelOrder(true)
  };
  const pickupRequest = async (data) => {
    // e.preventDefault()
    const res = await axios.get(`${PROXY}/delivery/pickup`, data, {
      headers: {
        authorization: globleuser?.data?.token,
      },
    });

    // setopencancelOrder(true);
    window.open(res.data, "_blank");

    // setCancelOrder(true)
  };
  const FetchData = (user, con) => {
    axios
      .post(
        `${PROXY}/item/get`,
        {
          _id: user?.data?._id,
        },
        con
      )
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setOneDatadone(res?.data?.data[0]?.type);
        } else {
          setOneDatadone(null);
        }
      });
    // .catch((e) => alert('Someting went wrong: check your connection 1', e));
  };

  const FetchEventData = (conf) => {
    axios.get(`${PROXY}/event/getbyvendorid`, conf).then((res) => {
      if (res.data.success) {
        setEventData(res.data.data);
      } else {
      }
    });
    // .catch((e) => alert("Someting went wrong: check your connection 2", e));
  };

  const FetchProductData = async (user, con) => {
    axios
      .post(
        `${PROXY}/product/gettopsellers`,
        {
          _id: user?.data?._id,
        },
        con
      )
      .then((res) => {
        if (res.data.success) {
          setProductData(res.data.data);
          if (res.data.data.length) {
            setOneDatadone("Product");
          } else {
            if (!oneDatadone) {
              setOneDatadone(null);
            }
          }
        }
      })
      .catch((e) => {
        alert("Someting went wrong: check your connection 3", e);
      });
    axios
      .post(
        `${PROXY}/product/get`,
        {
          _id: user?.data?._id,
        },
        con
      )
      .then((res) => {
        if (res.data.success) {
          setTotalProduct(res.data.data.length);
        }
      })
      .catch((e) => {
        alert("Someting went wrong: check your connection 3", e);
      });
    // FetchTopCity()
  };
  const FetchTopCity = (user, con) => {
    axios
      .post(
        `${PROXY}/product/gettopcity`,
        {
          _id: user?.data?._id,
        },
        con
      )
      .then((res) => {
        if (res.data.success) {
          setCityData(res.data.data);
        }
      })
      .catch((e) => {
        alert("Someting went wrong: check your connection 3", e);
      });
  };
  const FetchChartData = (user, con) => {
    axios
      .post(
        `${PROXY}/product/getordersbymonth`,
        {
          _id: user?.data?._id,
        },
        con
      )
      .then((res) => {
        if (res.data.success) {
          // setCityData(res.data.data);
          setAllTimeData(res.data.allTimeData);
          setTodayData(res.data.todayData);
          setMonthlyData(res.data.monthlyData);
          setLast7DaysData(res.data.last7DaysData);
          setTwelveMonthsData(res.data.twelveMonthsData);
          setCurrentData(res.data.allTimeData);
          last3months(res.data.twelveMonthsData);
        }
      })
      .catch((e) => {
        alert("Someting went wrong: check your connection 3", e);
      });
  };
  const last3months = async (twelveMonthsData) => {
    const today = new Date();
    const currentMonth = today.getMonth(); // Get the current month (0-11)
    const previousMonth1 = (currentMonth - 1 + 12) % 12; // Get the previous month (0-11)
    const previousMonth2 = (currentMonth - 2 + 12) % 12; // Get the second previous month (0-11)

    const relevantMonths = [
      currentMonth + 1,
      previousMonth1 + 1,
      previousMonth2 + 1,
    ];
    const totalOrders = relevantMonths.reduce((total, month) => {
      const data = twelveMonthsData.find((item) => item.month === month);
      return total + (data ? data.totalOrderCount : 0);
    }, 0);

    const totalAmount = relevantMonths.reduce((total, month) => {
      const data = twelveMonthsData.find((item) => item.month === month);
      return total + (data ? data.totalAmount : 0);
    }, 0);

    setThreeMonthData({
      totalOrders: totalOrders,
      totalAmount: totalAmount,
    });
  };
  const FetchCount = (user, con) => {
    axios
      .post(
        `${PROXY}/order/getcount`,
        {
          shopkeeperId: user?.data?._id,
        },
        con
      )
      .then((res) => {
        if (res.data.success) {
          setCount(res.data.count);
        }
      })
      .catch((e) => {
        alert("Someting went wrong: check your connection 3", e);
      });
  };
  const FetchOrderData = (user, con, pageNo) => {
    axios
      .post(
        `${PROXY}/order/getorderseller`,
        {
          shopkeeperId: user?.data?._id,
          page: pageNo + 1,
          pageSize: 3,
        },
        con
      )
      .then((res) => {
        if (res.data.success) {
          setOrderData(res.data.data.reverse());
          const totalAmount = res.data.data
            .filter((order) => order.status === "Completed")
            .reduce((sum, order) => sum + order.amount, 0);
          setTotalSales(totalAmount / 100);
        }
      })
      .catch((e) => {
        alert("Someting went wrong: check your connection 3", e);
      });
  };

  useEffect(() => {
    const auth = localStorage.getItem("wedcell");
    const role = localStorage.getItem("role");
    setUser(JSON.parse(auth));
    if (globleuser) {
      const config = {
        headers: { authorization: globleuser?.data?.token },
      };
      setConfig(config);
      FetchOrderData(globleuser, config, page);
      FetchCount(globleuser, config);

      if (oneDatadone !== "Product" || oneDatadone === null) {
        // FetchProductData(globleuser, config);
        FetchData(globleuser, config);
        FetchEventData(config);
      }
      if (oneDatadone !== "Venue" || oneDatadone !== "Vendor") {
        FetchProductData(globleuser, config);
        FetchTopCity(globleuser, config);
        FetchChartData(globleuser, config);
      }
    }
  }, [router]);

  const bulkDelete = async (files) => {
    try {
      for (const file of files) {
        await ImageDelete(file);
      }
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };
  const productDelete = (id, images) => {
    setDeleting(true);
    bulkDelete(images).then(() => {
      axios
        .post(`${PROXY}/product/delete`, { _id: id }, config)
        .then(() => {
          const filteredProducts = productData.filter(
            (item) => item._id !== id
          );
          setProductData(filteredProducts);
          setDeleting(false);
        })
        .catch((e) => {
          alert("Failed to delete");
          setDeleting(false);
        });
    });
  };

  const vendorDelete = (id, images) => {
    setDeleting(true);
    bulkDelete(images)
      .then((res1) => {
        axios
          .post(`${PROXY}/item/delete`, { _id: id }, config)
          .then((res) => {
            const filteredProducts = data.filter((item) => item._id !== id);
            setData(filteredProducts);
            setDeleting(false);
          })
          .catch((e) => {
            alert("Failed to delete");
            setDeleting(false);
          });
      })
      .catch((e) => {
        setDeleting(false);
      });
  };

  const submit = (id, images) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            productDelete(id, images);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const submit2 = (id, images) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            vendorDelete(id, images);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const submit3 = (data) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`${PROXY}/event/${data._id}`, {
                headers: {
                  authorization: user.data.token,
                },
              })
              .then((res) => {
                const config = {
                  headers: {
                    authorization: globleuser.data.token,
                  },
                };
                FetchEventData(config);
              })
              .catch((err) => {});
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      {isModalOpen ? (
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          pickupTime={pickupTime}
          setPickupTime={setPickupTime}
          pickupDate={pickupDate}
          setPickupDate={setPickupDate}
          expectedPackageCount={expectedPackageCount}
          setExpectedPackageCount={setExpectedPackageCount}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div className={styles.OneAboveAll}>
          <div className={styles.OneAboveAll1}>
            <div className={styles.topDiv}>
              <div className={styles.dates}>
                <span
                  className={`${
                    changeDays === "AllDate" ? styles.SelectedSpan : ""
                  }`}
                  onClick={() => setChangeDays("AllDate")}
                >
                  All Time
                </span>
                <span
                  className={`${
                    changeDays === "12Months" ? styles.SelectedSpan : ""
                  }`}
                  onClick={() => setChangeDays("12Months")}
                >
                  12 Months
                </span>
                <span
                  className={`${
                    changeDays === "30days" ? styles.SelectedSpan : ""
                  }`}
                  onClick={() => setChangeDays("30days")}
                >
                  30 Days
                </span>
                <span
                  className={`${
                    changeDays === "7Days" ? styles.SelectedSpan : ""
                  }`}
                  onClick={() => setChangeDays("7Days")}
                >
                  7 Days
                </span>
                <span
                  className={`${
                    changeDays === "24Hours" ? styles.SelectedSpan : ""
                  }`}
                  onClick={() => setChangeDays("24Hours")}
                >
                  24 Hour
                </span>
              </div>
              <div className={styles.topBtnDiv}>
                <button className={styles.ViewProds} onClick={openModal}>
                  Request pickup
                </button>

                <button className={styles.SelectDate}>
                  <img
                    src={`${S3PROXY}/vendors/images/calendar alt.png`}
                    alt=""
                  />
                  Select Dates
                </button>
                <button
                  className={styles.ViewProds}
                  onClick={() => setCurrState("Listing")}
                >
                  View Products
                </button>
              </div>
            </div>
            <div className={styles.SecondDiv}>
              <article className={styles.boxView}>
                <div>
                  <div
                    className={styles.boxViewimg}
                    style={{ backgroundColor: "#DEDEFA" }}
                  >
                    <img
                      src={`${S3PROXY}/vendors/images/cash checked.png`}
                      alt=""
                    />
                  </div>
                </div>
                <span className={styles.boxViewfirstSpan}>Total Revenue</span>
                <div className={styles.boxViewamtincdec}>
                  <span className={styles.boxViewAmount}>
                    ₹{currentData && currentData.totalAmount / 100}
                  </span>
                  {/* <span className={styles.boxViewincdec}>+10%</span> */}
                </div>
              </article>
              <article className={styles.boxView}>
                <div
                  className={styles.boxViewimg}
                  style={{ backgroundColor: "#CFE7DC" }}
                >
                  <img src={`${S3PROXY}/vendors/images/cart.png`} alt="" />
                </div>
                <span className={styles.boxViewfirstSpan}>Total Sales</span>
                <div className={styles.boxViewamtincdec}>
                  <span className={styles.boxViewAmount}>
                    {currentData && currentData.totalOrderCount}
                  </span>
                  <span className={styles.boxViewincdec}>+15%</span>
                </div>
              </article>
              <article className={styles.boxView}>
                <div
                  className={styles.boxViewimg}
                  style={{ backgroundColor: "#FCDAD7" }}
                >
                  <img src={`${S3PROXY}/vendors/images/icon.png`} alt="" />
                </div>
                <span className={styles.boxViewfirstSpan}>Total Products</span>
                <div className={styles.boxViewamtincdec}>
                  <span className={styles.boxViewAmount}>{totalProduct}</span>
                  <span className={styles.boxViewincdec}>0%</span>
                </div>
              </article>
              <article className={styles.boxView}>
                <div
                  className={styles.boxViewimg}
                  style={{ backgroundColor: "#FAE1CF" }}
                >
                  <img src={`${S3PROXY}/vendors/images/icon2 (2).png`} alt="" />
                </div>
                <span className={styles.boxViewfirstSpan}>Balance</span>
                <div className={styles.boxViewamtincdec}>
                  <span className={styles.boxViewAmount}>₹{totalSales}</span>
                  <span className={styles.boxViewincdec}>-20%</span>
                </div>
              </article>
            </div>
            <div className={styles.thirdDiv}>
              <div className={styles.thirdDivhead}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span style={{ fontSize: "20px" }}>Recent Orders</span>
                  <span className={styles.boxViewincdec}>+2 Orders</span>
                </div>
                <div className={styles.thirdDivBtndiv}>
                  <button className={styles.SelectDate}>Filter</button>
                  <button className={styles.ViewProds}>See More</button>
                </div>
              </div>
              <div style={{ width: "100%", height: "100%" }}>
                {/* <DataGrid
              style={{ width: "100%" }}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            /> */}
                <TableContainer sx={{ height: "380px" }}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size="medium"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow
                        hover
                        style={{
                          backgroundColor: "#FAEBD8",
                          fontFamily: "Ledger",
                          fontSize: "20px",
                        }}
                        sx={{ fontSize: "20px" }}
                      >
                        <TableCell>
                          <Checkbox></Checkbox>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                          Order Id
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                          Product
                        </TableCell>
                        <TableCell className={styles.tableCell} align="">
                          Date
                        </TableCell>
                        <TableCell className={styles.tableCell} align="">
                          Customer
                        </TableCell>
                        <TableCell className={styles.tableCell} align="">
                          Total
                        </TableCell>
                        <TableCell className={styles.tableCell} align="">
                          Payment
                        </TableCell>
                        <TableCell className={styles.tableCell} align="">
                          Payment Status
                        </TableCell>
                        <TableCell className={styles.tableCell} align="">
                          Status
                        </TableCell>
                        <TableCell className={styles.tableCell} align="">
                          Packing Slip
                        </TableCell>
                        <TableCell className={styles.tableCell} align="">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ overflow: "scroll" }}>
                      {orderData &&
                        orderData?.length > 0 &&
                        orderData?.map((row) => (
                          <TableRow
                            className={styles.tableCellrow}
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              <Checkbox></Checkbox>
                            </TableCell>
                            <TableCell
                              className={styles.tableCellrow}
                              scope="row"
                            >
                              {row._id}
                            </TableCell>
                            <TableCell className={styles.tableCellrow} align="">
                              {row.itemId.productName} <br />{" "}
                              <span
                                style={{
                                  color: "#667085",
                                  fontSize: "14px",
                                }}
                              >
                                {" "}
                              </span>
                            </TableCell>
                            <TableCell className={styles.tableCellrow} align="">
                              <span
                                style={{
                                  color: "#667085",
                                  fontSize: "17px",
                                }}
                              >
                                {moment(row.createdAt).format(
                                  "DD MMM YYYY HH:mm:ss"
                                )}
                              </span>
                            </TableCell>
                            <TableCell className={styles.tableCellrow} align="">
                              {row.userId?.name} <br />
                              <span
                                style={{
                                  color: "#667085",
                                  fontSize: "14px",
                                }}
                              >
                                {" "}
                                {row.userId?.email}
                              </span>
                            </TableCell>
                            <TableCell className={styles.tableCellrow} align="">
                              <span
                                style={{
                                  color: "#667085",
                                  fontSize: "17px",
                                }}
                              >
                                ₹{row.amount / 100}
                              </span>
                            </TableCell>
                            <TableCell className={styles.tableCellrow} align="">
                              <span
                                style={{
                                  color: "#667085",
                                  fontSize: "17px",
                                }}
                              >
                                {row.paymentMode}
                              </span>
                            </TableCell>
                            <TableCell className={styles.tableCellrow} align="">
                              <span
                                style={{
                                  backgroundColor: "#FDF1E8",
                                  padding: "5px 10px",
                                  borderRadius: "15px",
                                  color: "#E46A11",
                                }}
                              >
                                {row.status}{" "}
                              </span>
                            </TableCell>
                            <TableCell className={styles.tableCellrow} align="">
                              <span
                                style={{
                                  backgroundColor: "#FDF1E8",
                                  padding: "5px 10px",
                                  borderRadius: "15px",
                                  color: "#E46A11",
                                }}
                              >
                                {row.orderStatus}{" "}
                              </span>
                            </TableCell>
                            <TableCell className={styles.tableCellrow} align="">
                              <button
                                style={{
                                  backgroundColor: "#FFFFCC", // Light red background color
                                  color: "#FF0000", // Red text color
                                  border: "none", // No border
                                  borderRadius: "10px", // Rounded corners
                                  padding: "8px 16px", // Padding
                                  cursor: "pointer", // Cursor on hover
                                }}
                                onClick={
                                  // setCurrentOrder(row)
                                  () => packingSlip(row.waybill)
                                  // handleClose
                                }
                              >
                                Download
                              </button>
                            </TableCell>
                            <TableCell className={styles.tableCellrow} align="">
                              {row.orderStatus == "Processing" ? (
                                <button
                                  style={{
                                    backgroundColor: "#FFDDDD", // Light red background color
                                    color: "#FF0000", // Red text color
                                    border: "none", // No border
                                    borderRadius: "10px", // Rounded corners
                                    padding: "8px 16px", // Padding
                                    cursor: "pointer", // Cursor on hover
                                  }}
                                  onClick={
                                    // setCurrentOrder(row)
                                    () =>
                                      cancel_order(
                                        row._id,
                                        row.paymentMode,
                                        row.paymentId,
                                        row.amount
                                      )
                                    // handleClose
                                  }
                                >
                                  Cancel
                                </button>
                              ) : (
                                <h6>Cancelled</h6>
                              )}
                              {/* <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: "20ch",
                            },
                          }}
                        >
                           
                        </Menu> */}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <TablePagination
                  component="div"
                  count={uSERLIST.length} // Replace with actual count
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={10} // Display 10 rows per page by default
                  rowsPerPageOptions={[10]}
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to === -1 ? count : to} of ${count}`
                  }
                /> */}
                <TablePagination
                  rowsPerPageOptions={[3, 10, 25]}
                  component="div"
                  count={count}
                  rowsPerPage={3}
                  page={page}
                  onPageChange={handleChangePage}
                />
                {/* <TablePagination
                  rowsPerPage={10} // Display 10 rows per page by default
                  rowsPerPageOptions={[10]}
                  component="div"
                  page={page}
                  // count={uSERLIST.length}
                  onPageChange={handleChangePage}
                /> */}
              </div>
            </div>
            <div className={styles.FourthDiv}>
              <div className={styles.TopSellingTable}>
                <div className={styles.thirdDivhead}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>
                      Top Selling Products
                    </span>
                  </div>
                  <div className={styles.thirdDivBtndiv}>
                    <button className={styles.SelectDate}>Filter</button>
                  </div>
                </div>
                <div style={{ width: "100%", height: "100%" }}>
                  <TableContainer sx={{ height: "380px" }}>
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow
                          hover
                          style={{
                            backgroundColor: "#FAEBD8",
                            fontFamily: "Ledger",
                            fontSize: "20px",
                          }}
                          sx={{ fontSize: "20px" }}
                        >
                          <TableCell className={styles.tableCell}>
                            Product
                          </TableCell>
                          <TableCell className={styles.tableCell} align="">
                            Total Sales
                          </TableCell>
                          <TableCell className={styles.tableCell} align="">
                            Amount
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ overflow: "scroll" }}>
                        {productData &&
                          productData.length > 0 &&
                          productData?.map((row) => (
                            <TableRow
                              className={styles.tableCellrow}
                              key={row.productName}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                className={styles.tableCellrow}
                                align=""
                              >
                                {row.productName} <br />{" "}
                                <span
                                  style={{
                                    color: "#667085",
                                    fontSize: "14px",
                                  }}
                                >
                                  {" "}
                                  +2 other Items
                                </span>
                              </TableCell>
                              <TableCell
                                className={styles.tableCellrow}
                                align=""
                              >
                                <span
                                  style={{
                                    color: "#667085",
                                    fontSize: "17px",
                                  }}
                                >
                                  {row.totalQuantity}
                                </span>
                              </TableCell>
                              <TableCell
                                className={styles.tableCellrow}
                                align=""
                              >
                                <span
                                  style={{
                                    color: "#667085",
                                    fontSize: "17px",
                                  }}
                                >
                                  {" "}
                                  ₹{row.totalAmount / 100}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                // count={uSERLIST.length}
                // rowsPerPage={rowsPerPage}
                // page={page}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
                </div>
              </div>
              <div className={styles.SalesbyLoc}>
                <div className={styles.salesbylocHead}>
                  <article className={styles.salesbylocspandiv}>
                    <span className={styles.salesbylocspan}>
                      Sales By Location
                    </span>
                    <span className={styles.salesbylocspan2}>
                      Sales performance by location
                    </span>
                  </article>
                  <div className={styles.menuButton}>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      {options?.map((option) => (
                        <MenuItem
                          key={option}
                          selected={option === "Pyxis"}
                          // onClick={()=>{
                          //   // setCurrentOrder(row)
                          //   cancel_order(row._id, row.paymentMode, row.paymentId, row.amount)
                          //   handleClose
                          // }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </div>
                <div className={styles.salesbylocBody}>
                  {cityData &&
                    cityData.length > 0 &&
                    cityData?.map((e) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                          }}
                        >
                          <div className={styles.Square}></div>
                          <div className={styles.bodySpans}>
                            <span style={{ fontWeight: "600" }}>
                              {e.city.replace(/\b\w/g, (match) =>
                                match.toUpperCase()
                              )}
                            </span>
                            <span style={{ color: "#667085" }}>
                              {e.totalQuantity} Sales
                            </span>
                          </div>
                        </div>
                        <div className={styles.ValuesDiv}>
                          <span
                            className={styles.boxViewAmount}
                            style={{ fontSize: "18px" }}
                          >
                            ₹{e.totalAmount / 100}
                          </span>
                          {/* <span className={styles.boxViewincdec}>+12%</span> */}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className={styles.FinalDiv}>
              <div className={styles.Semicirclediv}>
                <div className={styles.salesbylocHead}>
                  <article className={styles.salesbylocspandiv}>
                    <span className={styles.salesbylocspan}>
                      Sales Progress
                    </span>
                    <span className={styles.salesbylocspan2}>This Quarter</span>
                  </article>
                  <div className={styles.menuButton}>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      {options?.map((option) => (
                        <MenuItem
                          key={option}
                          selected={option === "Pyxis"}
                          // onClick={()=>{
                          //   // setCurrentOrder(row)
                          //   cancel_order(row._id, row.paymentMode, row.paymentId, row.amount)
                          //   handleClose
                          // }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </div>
                {/* <div className={styles.semicirclebar}>
              <SemiCircleProgressBar
                percentage={75.55}
                diameter={250}
                strokeWidth={15}
                stroke={"#FF44E1"}
              ></SemiCircleProgressBar>
              <div className={styles.spanvalue}>
                <span className={styles.boxViewAmount}>75.55%</span>
                <span className={styles.boxViewincdec}>+10%</span>
              </div>
            </div> */}
                <span className={styles.succedearn}>
                  You succeesfully earned{" "}
                  <span className={styles.succedearnvalue}>
                    ₹{todayData && todayData.totalAmount / 100}
                  </span>{" "}
                  today, its higher than yesterday
                </span>
                <div className={styles.targetRevtod}>
                  <article className={styles.targetoneCom}>
                    <span className={styles.targetSpan}>Revenue</span>
                    <div className={styles.valueAndImg}>
                      <span className={styles.Rupees}>
                        ₹{threeMonthData && threeMonthData.totalAmount / 100}
                      </span>
                      <img
                        src={`${S3PROXY}/vendors/images/UpArrow.png`}
                        alt=""
                      />
                    </div>
                  </article>
                  <article className={styles.targetoneCom}>
                    <span className={styles.targetSpan}>Today</span>
                    <div className={styles.valueAndImg}>
                      <span className={styles.Rupees}>
                        ₹{todayData && todayData.totalAmount / 100}
                      </span>
                      <img
                        src={`${S3PROXY}/vendors/images/UpArrow.png`}
                        alt=""
                      />
                    </div>
                  </article>
                </div>
              </div>
              <div className={styles.graphDiv}>
                <div className={styles.salesbylocHead}>
                  <article className={styles.salesbylocspandiv}>
                    <span className={styles.salesbylocspan}>Statistics</span>
                    <span className={styles.salesbylocspan2}>
                      Revenue and Sales
                    </span>
                  </article>

                  <div className={styles.menuButton}>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      {options?.map((option) => (
                        <MenuItem
                          key={option}
                          selected={option === "Pyxis"}
                          // onClick={()=>{
                          //   // setCurrentOrder(row)
                          //   cancel_order(row._id, row.paymentMode, row.paymentId, row.amount)
                          //   handleClose
                          // }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <canvas id="myChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DefDashBoard;
