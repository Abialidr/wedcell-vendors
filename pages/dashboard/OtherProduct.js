import React, { useEffect, useState } from "react";
import Layout from "../../Components/Dashboard/layout";
import styles from "../../styles/leads.module.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/router";
import { PROXY, S3PROXY } from "../../config";
import axios from "axios";
import useWindowSize from "@rooks/use-window-size";
import { fDate } from "../../utils/formatTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Leads = () => {
  const { innerWidth } = useWindowSize();

  const [gUser, setUser] = useState();
  const [Exe, setExe] = useState();
  const [filter, setFilter] = useState({
    status: "",
    times: "",
  });
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem("wedcell"))?.data);
    const getExe = async () => {
      const data = JSON.parse(localStorage?.getItem("wedcell"))?.data;
      const res = await axios.get(`${PROXY}/handler/get?vId=${data?._id}`, {
        headers: { authorization: data?.token },
      });
      setExe(res.data.data);
    };
    getExe();
  }, []);
  const [id, setId] = useState();
  const [cusDet, setCusDet] = useState({
    name: "",
    email: "",
    contact: "",
    state: "",
    city: "",
  });
  const [busDet, setBusDet] = useState({
    executive: "",
    source: "",
    designation: "",
    product: "",
    requirement: "",
    notes: "",
    handler: "",
  });
  const [dates, setDates] = useState({
    lastInteraction: "",
    nextInteraction: "",
    status: "Active",
  });
  const router = useRouter();
  const submitLead = async (updateId) => {
    const data = JSON.parse(localStorage?.getItem("wedcell"))?.data;
    let body = {
      prospectName: cusDet?.name,
      prospectEmail: cusDet?.email,
      prospectContact: cusDet?.contact,
      State: cusDet?.state,
      City: cusDet?.city,
      vendorName: data?.name,
      vendorId: data?._id,
      vendorContact: data?.contactPhone,
      vendorType: "venue",
      vendorImage: data?.mainImage,
      allowAccess: [],
      Source: busDet?.source,
      LastInteraction: dates.lastInteraction,
      NextInteraction: dates.nextInteraction,
      Handler: busDet.handler,
      Status: dates.status,
      Executive: busDet.executive,
      Products: busDet.product,
      Requirements: busDet.requirement,
      Notes: busDet.notes,
    };
    try {
      if (updateId) {
        body = { ...body, id: updateId };
        await axios.patch(`${PROXY}/contacts/update`, body, {
          headers: { authorization: data?.token },
        });
      } else {
        await axios.post(`${PROXY}/contacts/addFromVendor`, body, {
          headers: { authorization: data?.token },
        });
      }
      setUpdate(!update);
      setId("");
      setCusDet({
        name: "",
        email: "",
        contact: "",
        state: "",
        city: "",
      });
      setBusDet({
        executive: "",
        handler: "",
        source: "",
        designation: "",
        product: "",
        requirement: "",
        notes: "",
      });
      setDates({
        lastInteraction: "",
        nextInteraction: "",
        status: "Active",
      });
      setOpenModal(false);
      console.log("🚀 ~ submitLead ~ res:", res);
    } catch (e) {
      console.log("🚀 ~ submitLead ~ body:", e);
    }
  };
  const [page, setPage] = React.useState(1);

  const columns = [
    { id: "name", label: "Name", minWidth: 120 },
    { id: "number", label: "Number", minWidth: 100 },
    { id: "totalPayment", label: "Total Payment", minWidth: 100 },
    { id: "paidPayment", label: "Paid Payment", minWidth: 100 },
    { id: "remainingpayment", label: "Remaining Payment", minWidth: 100 },
    { id: "city", label: "City", minWidth: 100 },
    { id: "payment_id", label: "Payment ID", minWidth: 100 },
    { id: "eventDate", label: "Event Date", minWidth: 100 },
  ];

  function createData(
    name,
    number,
    totalPayment,
    paidPayment,
    remainingpayment,
    city,
    payment_id,
    eventDate,
    val
  ) {
    return {
      name,
      number,
      totalPayment,
      paidPayment,
      remainingpayment,
      city,
      payment_id,
      eventDate,
      val,
    };
  }
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState();
  const [totalPage, setTotalPage] = useState();
  const getData = async () => {
    const data = JSON.parse(localStorage?.getItem("wedcell"))?.data;
    const res = await axios.get(
      `${PROXY}/opp/other/${page}?skip=20&vendor_id=${
        JSON.parse(localStorage.getItem("wedcell"))?.data?._id
      }`,
      {
        headers: { authorization: data?.token },
      }
    );
    setTotal(res.data.total);
    setTotalPage(res.data.totalPage);
    console.log(
      "🚀 ~ file: leads-2.js:182 ~ res?.data?.data?.map ~ res?.data?.data:",
      res?.data?.data
    );
    setRows(
      res?.data?.data?.map((val) => {
        return createData(
          val.name,
          val.number,
          val.totalPayment,
          val.paidPayment,
          val.remainingpayment,
          val.city,
          val.payment_id,
          fDate(val.eventDate),
          val
        );
      })
    );
  };
  useEffect(() => {
    getData();
  }, [update, page, filter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: innerWidth > 900 ? "65%" : "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "10px",
    height: "fit-content",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
    maxHeight: "90vh",
  };
  const [openModal, setOpenModal] = useState();
  const [openModal1, setOpenModal1] = useState();
  const OpenModalId = async (id) => {
    const data = JSON.parse(localStorage?.getItem("wedcell"))?.data;
    const { data: res } = await axios.get(`${PROXY}/contacts/get?id=${id}`, {
      headers: { authorization: data?.token },
    });
    setId(id);
    setCusDet({
      name: res[0].prospectName,
      email: res[0].prospectEmail,
      contact: res[0].prospectContact,
      state: res[0].State,
      city: res[0].City,
    });
    setBusDet({
      executive: res[0].Executive,
      handler: res[0].Handler,
      source: res[0].Source,
      product: res[0].Products,
      requirement: res[0].Requirements,
      notes: res[0].Notes,
    });
    setDates({
      lastInteraction: res[0].LastInteraction,
      nextInteraction: res[0].NextInteraction,
      status: res[0].Status,
    });
    setOpenModal(true);
  };
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const OpenModalId1 = async (id) => {
    const data = JSON.parse(localStorage?.getItem("wedcell"))?.data;
    const { data: res } = await axios.get(`${PROXY}/contacts/get?id=${id}`, {
      headers: { authorization: data?.token },
    });
    setCusDet({
      name: res[0].prospectName,
      email: res[0].prospectEmail,
      contact: res[0].prospectContact,
      state: res[0].State,
      city: res[0].City,
    });
    setBusDet({
      executive: res[0].Executive,
      handler: res[0].Handler,
      source: res[0].Source,
      product: res[0].Products,
      requirement: res[0].Requirements,
      notes: res[0].Notes,
    });
    setDates({
      lastInteraction: res[0].LastInteraction,
      nextInteraction: res[0].NextInteraction,
      status: res[0].Status,
    });
    setOpenModal1(true);
  };
  const { innerWidth: windowWidth } = useWindowSize();
  return (
    <Layout>
      <div className={styles.leadMain}>
        <hgroup>
          <span>Booked / Purchased Products</span>
        </hgroup>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width:
                windowWidth >= 900 ? "50%" : windowWidth >= 460 ? "95%" : "95%",
              bgcolor: "background.paper",
              // border: "2px solid #000",
              boxShadow: 24,
              padding: "60px 20px 20px",
              borderRadius: "10px",
              height: windowWidth >= 900 ? "fit-content" : "fit-content",
              overflow: "scroll",
              // paddingTop: "270px",
              zIndex: "-1",
              maxHeight: "90%",
            }}
          >
            <div
              style={{
                background: "#B6255A",
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "50px",
                display: "flex",
                justifyContent: "end",
                padding: "10px 20px",
              }}
            >
              <span
                style={{ fontSize: "22px", cursor: "pointer" }}
                onClick={handleClose}
              >
                <FontAwesomeIcon icon={faClose} color="white" />
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                fontFamily: "inter",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  fontSize: "15px",
                }}
              >
                {(() => {
                  console.log(modalData, "sasasa");
                  if (modalData?.data) {
                    let referenced, vendorDetail, productsData;
                    if (modalData?.data?.reference) {
                      referenced = JSON.parse(
                        JSON.stringify(modalData?.data?.reference)
                      );
                    }
                    if (modalData?.data?.vendorDetails) {
                      vendorDetail = JSON.parse(
                        JSON.stringify(modalData?.data?.vendorDetails)
                      );
                      delete vendorDetail.password;
                      delete vendorDetail.cover_pic;
                      delete vendorDetail.profile_pic;
                      delete vendorDetail.is_approved;
                      delete vendorDetail.is_delete;
                      delete vendorDetail.is_email_verified;
                      delete vendorDetail.is_mobile_verified;
                      delete vendorDetail._id;
                      delete vendorDetail.warehouse_address;
                      delete vendorDetail.token;
                      delete vendorDetail.id;
                      delete vendorDetail.__v;
                      delete vendorDetail.updatedAt;
                      delete vendorDetail.createdAt;
                    }

                    productsData = JSON.parse(JSON.stringify(modalData?.data));

                    delete productsData.vendorDetails;
                    delete productsData.reference;
                    delete productsData.images;
                    delete productsData.vendorId;
                    delete productsData.updatedAt;
                    delete productsData.createdAt;
                    delete productsData.__v;
                    delete productsData.videos;
                    delete productsData.plans;
                    delete productsData.descrition;
                    delete productsData.exclusive;
                    delete productsData.mainImages;
                    delete productsData._id;
                    delete productsData.vidLinks;
                    delete productsData.avgRatingTotalStars;
                    delete productsData.avgRating;
                    delete productsData.is_approved;
                    delete productsData.is_delete;
                    delete productsData.popular;
                    delete productsData.avgRatingTotalRates;
                    delete productsData.bookedDate;
                    delete productsData.priority;
                    delete productsData.mainImage;
                    delete productsData.description;
                    delete productsData.secondNumbers;
                    delete productsData.termsandconditions;
                    delete productsData.brochure;
                    delete productsData.subSubCategory;
                    delete productsData.albums;
                    delete productsData.awarded;
                    delete productsData.password;
                    delete productsData.is_email_verified;
                    delete productsData.is_mobile_verified;
                    delete productsData.id;
                    delete productsData.wishlist;

                    return (
                      <>
                        {vendorDetail ? (
                          <span
                            style={{
                              lineHeight: "1.2",
                              fontSize: "18px",
                              padding: "20px",
                              border: "2px solid rgba(0,0,0,0.3)",
                              borderRadius: "10px",
                            }}
                          >
                            <b>Vendor details</b>
                            <pre>
                              {JSON.stringify(vendorDetail, undefined, 2)
                                .replace(/[{}"]/g, "")
                                .replace(/,/g, "")}
                            </pre>
                          </span>
                        ) : (
                          <></>
                        )}
                        {referenced ? (
                          <span
                            style={{
                              lineHeight: "1.2",
                              fontSize: "18px",
                              padding: "20px",
                              border: "2px solid rgba(0,0,0,0.3)",
                              borderRadius: "10px",
                            }}
                          >
                            <b>reference vendor detail</b>
                            <pre>
                              {JSON.stringify(referenced, undefined, 2)
                                .replace(/[{}"]/g, "")
                                .replace(/,/g, "")}
                            </pre>
                          </span>
                        ) : (
                          <></>
                        )}
                        {productsData ? (
                          <span
                            style={{
                              lineHeight: "1.2",
                              fontSize: "18px",
                              padding: "20px",
                              border: "2px solid rgba(0,0,0,0.3)",
                              borderRadius: "10px",
                            }}
                          >
                            <b>Product details</b>
                            <pre>
                              {JSON.stringify(productsData, undefined, 2)
                                .replace(/[{}"]/g, "")
                                .replace(/,/g, "")}
                            </pre>
                          </span>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  } else return <></>;
                })()}

                <article
                  style={{
                    fontSize: "18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <span>
                    <b>Delivery Address</b> : {modalData?.address}
                  </span>
                  <span>
                    <b>Others Specifications</b> : {modalData?.requirments}
                  </span>
                  <span>
                    <b>Payment Type</b> : {modalData?.paymentType}
                  </span>
                  <span>
                    <b>Qauntity</b> : {modalData?.qauntity}
                  </span>
                </article>
              </div>
            </div>
          </Box>
        </Modal>
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "8px" }}>
          <TableContainer sx={{ maxHeight: 440, overflowX: "auto" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontSize: innerWidth > 900 ? "17px" : "15px",
                        fontFamily: "Poppins",
                        fontWeight: "600",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    style={{
                      fontSize: innerWidth > 900 ? "17px" : "15px",
                      fontFamily: "Poppins",
                      fontWeight: "600",
                    }}
                  >
                    View More
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell
                            style={{
                              fontSize: innerWidth > 900 ? "14px" : "13px",
                              fontFamily: "Poppins",
                              fontWeight: "400",
                            }}
                            key={column.id}
                            align={column.align}
                          >
                            {value
                              ? column.format && typeof value === "number"
                                ? column.format(value)
                                : value
                              : "-------"}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <article className={styles.tableActions}>
                          <button
                            onClick={() => {
                              setOpen(true);
                              setModalData(row.val);
                            }}
                          >
                            <img
                              src={`${S3PROXY}/vendors/assets/images/eye.png`}
                              alt=""
                            />
                          </button>
                        </article>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Layout>
  );
};

export default Leads;
