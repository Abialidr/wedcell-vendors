import React from "react";
import Styles from "../../styles/Dashboard/Dashboard.module.css";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { PROXY ,S3PROXY} from "../../config";
// import { ProgressBar, Step } from "react-step-progress-bar";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import useWindowSize from "@rooks/use-window-size";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Style } from "@mui/icons-material";
import { selectUser } from "../../redux/reducer/appEssentials";
import moment from "moment";
const OrderDetails = ({
  order,
  setOrderStatus,
  setCancelOrder,
  setOrderDetails,
}) => {
  const globleuser = useSelector(selectUser);
  const router = useRouter();

  const ostat = [
    "Processing",
    "OrderComplete",
    "OrderCancel",
    "CancelRefund",
    "ReturnOrder",
  ];
  const [openCancleorder, setopencancelOrder] = useState(false);

  // useEffect(() => {
  //   !globleuser.success && router.push("/");
  // }, []);
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);

  const cancelOrder = async (id, mode, paymentId, amount) => {
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
    if (res.data.success) {
      window.alert("Cancellation successful");
      setOrderDetails(false);
      setCancelOrder(true);
    } else {
      window.alert("Cancellation error");
    }
  };
  function step2Validator() {
    // return a boolean
  }

  function step3Validator() {
    // return a boolean
  }
  const oc = "26 jan, 2023";
  const sc = "28 jan, 2023";
  const od = "28 jan, 2023";
  const de = "29 jan, 2023";
  const steps = [
    ["Order Confirmed", <br />, oc],
    ["Shipped", , <br />, sc],
    ["Out For Delivery", , <br />, od],
    ["Delivered", , <br />, de],
  ];
  const steps1 = [
    ["Order Cancelled", <br />, oc],
    ["Refund Initialized", , <br />, sc],
    ["Refund Completed", , <br />, od],
  ];
  const steps3 = [
    ["Return Initiated", <br />, oc],
    ["Recieved by Vendor", , <br />, sc],
    ["Shipped by Vendor", , <br />, sc],
    ["Out For Delivery", , <br />, od],
    ["Delivered", , <br />, de],
  ];
  return (
    <>
      {windowWidth >= 560 ? (
        <>
          <div className={Styles.orderbtndates}>
            <div className={Styles.orderIdAndButton}>
              <span>Order ID : {order._id}</span>
              <div className={Styles.btndivorderTrack}>
                {order.orderStatus == "Processing" && (
                  <button
                    className={Styles.cancelOrder}
                    onClick={(e) =>
                      cancelOrder(
                        order._id,
                        order.paymentMode,
                        order.paymentId,
                        order.amount
                      )
                    }
                  >
                    Cancel Order
                  </button>
                )}
                <button
                  className={Styles.TrackOrder}
                  onClick={() => setOrderDetails(false)}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5" // Adjust the stroke width to make the icon smaller
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="20" // Adjust the width to make the icon smaller
                      height="20" // Adjust the height to make the icon smaller
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                      Go back
                    </span>
                  </div>
                </button>
              </div>
            </div>
            <div className={Styles.Dates}>
              <span className={Styles.OrderDate}>
                Order date :{" "}
                <span className={Styles.ActualDate}>
                  {moment(order?.createdAt).format("MMM DD YYYY")}
                </span>
              </span>
              <div className={Styles.estimatedDeldiv}>
                <img src={`${S3PROXY}/vendors/images/truck-tick.png`} alt="" />

                {order.orderStatus == "Processing" && (
                  <span className={Styles.estimatedSpan}>
                    Estimated delivery:{" "}
                    {moment(order?.createdAt).add(5, "days").format("DD MMM")}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={Styles.middleDiv}>
            <div className={Styles.OrderDetaildiv}>
              <div className={Styles.BasicDetails}>
                <img src={order.image} alt="" />
                <div className={Styles.basicWriteen}>
                  <span className={Styles.Ordername}>{order.productName}</span>
                  <span className={Styles.Ordername}>
                    Sold by: {order.companyName}
                  </span>
                  <span className={Styles.basicCat}>{order.size}</span>
                </div>
              </div>
              <div className={Styles.ammountAndqty}>
                <span className={Styles.Amount}>
                  ₹{(order.amount + order.shipping) / 100}
                </span>
                <span className={Styles.qty}>Qty : {order.quantity}</span>
              </div>
            </div>
          </div>
          <div className={Styles.FinalDiv}>
            <div className={Styles.DelAndMopdiv}>
              <span className={Styles.body}>
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.address1 +
                  ", " +
                  order.shippingAddress.address2 +
                  ", " +
                  order.shippingAddress.city +
                  " PIN-" +
                  order.shippingAddress.pincode +
                  ", " +
                  order.shippingAddress.state +
                  ", " +
                  order.shippingAddress.country}
              </span>
            </div>
            <div className={Styles.DelAndMopdiv}>
              <span className={Styles.heads}>Payment Details</span>
              <span className={Styles.body}>
                Item price: ₹ {(order.amount * order.quantity) / 100}
                <br />
              </span>
              <span className={Styles.body}>
                Tax: ₹ {order.tax / 100}
                <br />
              </span>
              <span className={Styles.body}>
                Shipping: ₹ {order.shipping / 100}
                <br />
              </span>
              <span className={Styles.heads}>Payment method</span>
              <span className={Styles.body}>
                {order.paymentMode}
                <br />
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={Styles.orderbtndates}>
            <div className={Styles.orderIdAndButton1}>
              <div className={Styles.orderStatusAndId}>
                <span style={{ color: "#B72E5A" }}>Order inProgress</span>
                <span>Order ID : {order._id}</span>
              </div>
              <div className={Styles.OrderDate1}>
                <span>Order Date</span>
                <span>{moment(order?.createdAt).format("MMM DD YYYY")}</span>
              </div>
            </div>
            <div className={Styles.Dates}>
              <div className={Styles.estimatedDeldiv}>
                <img src={`${S3PROXY}/vendors/images/truck-tick.png`} alt="" />
                {order.orderStatus == "Processing" && (
                  <span className={Styles.estimatedSpan}>
                    Estimated delivery:{" "}
                    {moment(order?.createdAt).add(5, "days").format("DD MMM")}
                  </span>
                )}
              </div>
            </div>
            <div className={Styles.btndivorderTrack}>
              <button
                className={Styles.cancelOrder}
                onClick={() => setCancelOrder(true)}
              >
                Cancel Order
              </button>
              <button
                className={Styles.TrackOrder}
                onClick={() => setOrderDetails(false)}
              >
                View all orders
              </button>
            </div>
          </div>
          <div className={Styles.middleDiv}>
            <div className={Styles.OrderDetaildiv}>
              <span className={Styles.YourOrderspan}>Your Order</span>
              <div className={Styles.BasicDetails}>
                <img src={order.image} alt="" />
                <div className={Styles.basicWriteen}>
                  <span className={Styles.Ordername}>{order.productName}</span>
                  <span className={Styles.Ordername}>
                    Sold by: {order.companyName}
                  </span>
                  <span className={Styles.basicCat}>Size : Small</span>
                  <span className={Styles.basicCat}>
                    Price :{" "}
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      ₹{(order.shipping + order.amount) / 100}
                    </span>
                  </span>
                  <span className={Styles.basicCat}>
                    Qty : {order.quantity}
                  </span>
                </div>
              </div>
              {/* <div className={Styles.ammountAndqty}>
                    <span className={Styles.Amount}>₹{order.amount/100}</span>
                    <span className={Styles.qty}>Qty : {order.quantity}</span>
                  </div> */}
            </div>
          </div>
          <div className={Styles.FinalDiv}>
            <div className={Styles.DelAndMopdiv}>
              <span className={Styles.body}>
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.address1 +
                  ", " +
                  order.shippingAddress.address2 +
                  ", " +
                  order.shippingAddress.city +
                  " PIN-" +
                  order.shippingAddress.pincode +
                  ", " +
                  order.shippingAddress.state +
                  ", " +
                  order.shippingAddress.country}
              </span>
            </div>
            <div className={Styles.DelAndMopdiv}>
              <span className={Styles.heads}>Payment Details</span>
              <span className={Styles.body}>
                Item price: {order.amount * order.quantity}
                <br />
              </span>
              <span className={Styles.body}>
                Tax: {order.tax}
                <br />
              </span>
              <span className={Styles.body}>
                Shipping: {order.shipping}
                <br />
              </span>
              <span className={Styles.heads}>Payment method</span>
              <span className={Styles.body}>
                {order.paymentMode}
                <br />
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
