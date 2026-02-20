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
    { id: "mobile", label: "Contact", minWidth: 100 },
    { id: "city", label: "City", minWidth: 100 },
    { id: "state", label: "State", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "source", label: "Source", minWidth: 100 },
    { id: "executive", label: "Executive", minWidth: 100 },
    { id: "last", label: "Last Interaction", minWidth: 100 },
    { id: "next", label: "Next", minWidth: 100 },
  ];

  function createData(
    id,
    name,
    mobile,
    city,
    state,
    status,
    source,
    executive,
    last,
    next
  ) {
    return {
      id,
      name,
      mobile,
      city,
      state,
      status,
      source,
      executive,
      last,
      next,
    };
  }
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState();
  const [totalPage, setTotalPage] = useState();
  const getData = async () => {
    const data = JSON.parse(localStorage?.getItem("wedcell"))?.data;
    const res = await axios.get(
      `${PROXY}/contacts/getforVendor?vendorId=${data?._id}&page=${page}&status=${filter.status}&time=${filter.times}`,
      {
        headers: { authorization: data?.token },
      }
    );
    setTotal(res.data.total);
    setTotalPage(res.data.totalPage);
    setRows(
      res?.data?.data?.map((val) => {
        return createData(
          val.id,
          val.prospectName,
          val.prospectContact,
          val.City,
          val.State,
          val.Status,
          val.Source,
          val.Executive,
          val.LastInteraction,
          val.NextInteraction
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
  return (
    <Layout>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.EnterLead}>
            <img
              className={styles.closebtn}
              src={`${S3PROXY}/vendors/assets/images/close.png`}
              alt=""
              onClick={() => {
                setOpenModal(false);
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
              }}
            />
            <span>Enter Lead</span>
            <div className={styles.infoDiv}>
              <section className={styles.left}>
                <span>Customer Info</span>
                <article>
                  <label htmlFor="">Name</label>
                  <input
                    value={cusDet.name}
                    type="text"
                    onChange={(e) =>
                      setCusDet({ ...cusDet, name: e.target.value })
                    }
                  />
                </article>
                <article>
                  <label htmlFor="">Email</label>
                  <input
                    value={cusDet.email}
                    type="text"
                    onChange={(e) =>
                      setCusDet({ ...cusDet, email: e.target.value })
                    }
                  />
                </article>
                <article>
                  <label htmlFor="">Contact</label>
                  <input
                    value={cusDet.contact}
                    type="text"
                    onChange={(e) =>
                      setCusDet({ ...cusDet, contact: e.target.value })
                    }
                  />
                </article>
                <article>
                  <label htmlFor="">State</label>
                  <select
                    value={cusDet.state}
                    name=""
                    id=""
                    onChange={(e) =>
                      setCusDet({ ...cusDet, state: e.target.value })
                    }
                  >
                    <option value="">State</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharastra">Maharastra</option>
                    <option value="Tamil Naadu">Tamil Naadu</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </article>
                <article>
                  <label htmlFor="">City</label>
                  <select
                    value={cusDet.city}
                    name=""
                    id=""
                    onChange={(e) =>
                      setCusDet({ ...cusDet, city: e.target.value })
                    }
                  >
                    <option value="">City</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Banglore">Banglore</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </article>
              </section>
              <section className={styles.right}>
                <span>
                  <img
                    src={`${S3PROXY}/vendors/assets/images/IconBus.png`}
                    alt=""
                  />
                  Business Info
                </span>
                <article>
                  <label htmlFor="">Executive</label>
                  <select
                    value={
                      busDet.handler == gUser?._id ? "UserName" : busDet.handler
                    }
                    name=""
                    id=""
                    onChange={(e) =>
                      setBusDet({
                        ...busDet,
                        handler:
                          e.target.value == "UserName"
                            ? gUser?._id
                            : e.target.value,
                        executive:
                          e.target.value == "UserName"
                            ? gUser?.name
                            : Exe.find((val) => e.target.value == val._id).name,
                      })
                    }
                  >
                    <option value="UserName">{gUser?.name}</option>
                    {Exe?.map((val, key) => {
                      return <option value={val._id}>{val.name}</option>;
                    })}
                  </select>
                </article>
                <article>
                  <label htmlFor="">Source</label>
                  <select
                    value={busDet.source}
                    type="text"
                    onChange={(e) =>
                      setBusDet({ ...busDet, source: e.target.value })
                    }
                  >
                    <option value={""} selected>
                      --Select--
                    </option>
                    {[
                      "Wedcell",
                      gUser?.company_name,
                      "WedMegood",
                      "weddingwire",
                      "weddingz.in",
                      "weddingsutra",
                      "justdial",
                      "facebook",
                      "instagram",
                      "google",
                      "youtube",
                      "other",
                    ].map((val, key) => {
                      return (
                        <option key={key} value={val}>
                          {val}
                        </option>
                      );
                    })}
                  </select>
                </article>
                <article>
                  <label htmlFor="">Products</label>
                  <input
                    value={busDet.product}
                    type="text"
                    onChange={(e) =>
                      setBusDet({ ...busDet, product: e.target.value })
                    }
                  />
                </article>
                <article>
                  <label htmlFor="">Requirement</label>
                  <input
                    value={busDet.requirement}
                    type="text"
                    onChange={(e) =>
                      setBusDet({ ...busDet, requirement: e.target.value })
                    }
                  />
                </article>{" "}
                <article>
                  <label htmlFor="">Notes</label>
                  <textarea
                    value={busDet.notes}
                    name=""
                    id=""
                    rows="2"
                    onChange={(e) =>
                      setBusDet({ ...busDet, notes: e.target.value })
                    }
                  ></textarea>
                </article>
              </section>
            </div>
            <div className={styles.dates}>
              <article>
                <label htmlFor="">Last Interaction</label>
                <input
                  value={dates.lastInteraction}
                  type="date"
                  name=""
                  id=""
                  onChange={(e) =>
                    setDates({ ...dates, lastInteraction: e.target.value })
                  }
                />
              </article>{" "}
              <article>
                <label htmlFor="">Next</label>
                <input
                  value={dates.nextInteraction}
                  type="date"
                  name=""
                  id=""
                  onChange={(e) =>
                    setDates({ ...dates, nextInteraction: e.target.value })
                  }
                />
              </article>
              <article>
                <label htmlFor="">Status</label>
                <select
                  value={dates.status}
                  type="date"
                  name=""
                  id=""
                  onChange={(e) =>
                    setDates({ ...dates, status: e.target.value })
                  }
                >
                  <option value={"Active"}>Active</option>
                  <option value={"Pending"}>Pending</option>
                  <option value={"Closed"}>Closed</option>
                </select>
              </article>
            </div>
            <div className={styles.btnSaves}>
              <button onClick={() => submitLead(id ? id : "")}>
                {id ? "Update" : "Save"}
              </button>
              <button>Save & Add Another</button>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openModal1}
        onClose={() => {
          setOpenModal1(false);
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
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.EnterLead}>
            <img
              className={styles.closebtn}
              src={`${S3PROXY}/vendors/assets/images/close.png`}
              alt=""
              onClick={() => {
                setOpenModal1(false);
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
              }}
            />
            <span>Enter Lead</span>
            <div className={styles.infoDiv}>
              <section className={styles.left}>
                <span>Customer Info</span>
                <article>
                  <label htmlFor="">Name</label>
                  <hgroup>{cusDet.name}</hgroup>
                </article>
                <article>
                  <label htmlFor="">Email</label>
                  <hgroup>{cusDet.email}</hgroup>
                </article>
                <article>
                  <label htmlFor="">Contact</label>
                  <hgroup>{cusDet.contact}</hgroup>
                </article>
                <article>
                  <label htmlFor="">State</label>
                  <hgroup>{cusDet.state}</hgroup>
                </article>
                <article>
                  <label htmlFor="">City</label>
                  <hgroup>{cusDet.city}</hgroup>
                </article>
              </section>
              <section className={styles.right}>
                <span>
                  <img
                    src={`${S3PROXY}/vendors/assets/images/IconBus.png`}
                    alt=""
                  />
                  Business Info
                </span>
                <article>
                  <label htmlFor="">Executive</label>
                  <hgroup>{busDet.executive}</hgroup>
                </article>
                <article>
                  <label htmlFor="">Source</label>
                  <hgroup>{busDet.source}</hgroup>
                </article>
                <article>
                  <label htmlFor="">Products</label>
                  <hgroup>{busDet.product}</hgroup>
                </article>
                <article>
                  <label htmlFor="">Requirement</label>
                  <hgroup>{busDet.requirement}</hgroup>
                </article>{" "}
                <article>
                  <label htmlFor="">Notes</label>
                  <hgroup>{busDet.notes}</hgroup>
                </article>
              </section>
            </div>
            <div className={styles.dates}>
              <article>
                <label htmlFor="">Last Interaction</label>
                <hgroup>{dates.lastInteraction}</hgroup>
              </article>{" "}
              <article>
                <label htmlFor="">Next</label>
                <hgroup>{dates.nextInteraction}</hgroup>
              </article>
              <article>
                <label htmlFor="">Status</label>
                <hgroup>{dates.status}</hgroup>
              </article>
            </div>
          </div>
        </Box>
      </Modal>
      <div className={styles.leadMain}>
        <hgroup>
          <span>Raw Lead</span>
          <img
            onClick={() => router.push("/dashboard/setting")}
            src={`${S3PROXY}/vendors/assets/images/settings.png`}
            alt=""
          />
        </hgroup>
        <article>
          <select
            name=""
            id=""
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            name=""
            id=""
            onChange={(e) => setFilter({ ...filter, times: e.target.value })}
          >
            <option value="">All Time</option>
            <option value="6 months">6 Months</option>
            <option value="this month">This Month</option>
            <option value="this week">This Week</option>
            <option value="24 hours">24 hours</option>
            <option value="Custom">Custom</option>
          </select>
          {filter.times === "Custom" ? (
            <>
              <input type="date"></input>
              <input type="date"></input>
              <button>Search</button>
            </>
          ) : (
            <></>
          )}
        </article>
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
                    Actions
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
                            onClick={() =>
                              router.push(
                                `https://api.whatsapp.com/send/?phone=%2B91${row.mobile}&text&type=phone_number&app_absent=0`
                              )
                            }
                          >
                            <img
                              src={`${S3PROXY}/vendors/assets/images/whatsapp.png`}
                              alt=""
                            />
                          </button>{" "}
                          <button
                            onClick={() => {
                              OpenModalId(row?.id);
                            }}
                          >
                            <img
                              src={`${S3PROXY}/vendors/assets/images/pencil.png`}
                              alt=""
                            />
                          </button>
                          <button
                            onClick={() => {
                              OpenModalId1(row?.id);
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

        <div className={styles.buttonDiv}>
          <button
            onClick={() => {
              setOpenModal(true),
                setBusDet({
                  ...busDet,
                  handler: gUser?._id,
                  executive: gUser?.name,
                });
            }}
          >
            + Add Lead
          </button>
          <div className={styles.pagination}>
            <span></span>
            <article>
              {page == 1 ? (
                <span></span>
              ) : (
                <>
                  <img
                    onClick={() => setPage(page - 1)}
                    src={`${S3PROXY}/vendors/assets/images/→.png`}
                    alt=""
                  ></img>
                  <span
                    onClick={() => setPage(1)}
                    style={{ marginLeft: "6px" }}
                  >
                    1{" "}
                  </span>
                  ...
                </>
              )}
              <hgroup>{page}</hgroup>
              of <span onClick={() => setPage(totalPage)}>{totalPage}</span>
              <img
                onClick={() => setPage(page + 1)}
                src={`${S3PROXY}/vendors/assets/images/→.png`}
                alt=""
              ></img>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leads;
