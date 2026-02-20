import React, { useEffect, useState } from "react";
import Layout from "../../Components/Dashboard/layout";
import styles from "../../styles/leads.module.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { PROXY, S3PROXY } from "../../config";

const Leads = () => {
  const [gUser, setUser] = useState();
  const [id, setId] = useState();
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem("wedcell"))?.data);
  }, []);
  const [rows, setRows] = useState([]);
  const getData = async () => {
    const data = JSON.parse(localStorage?.getItem("wedcell"))?.data;
    const res = await axios.get(`${PROXY}/handler/get?vId=${data?._id}`, {
      headers: { authorization: data?.token },
    });
    setRows(
      res.data.data.map((val) => {
        return createData(val._id, val.name, val.email, val.contact);
      })
    );
    console.log("🚀 ~ getData ~ res:", res);
  };
  useEffect(() => {
    getData();
  }, [update]);
  const submitUser = async (updateId) => {
    const data = JSON.parse(localStorage?.getItem("wedcell"))?.data;
    let body = {
      vendorId: data?._id,
      name: userDet.name,
      email: userDet.email,
      contact: userDet.contact,
    };
    try {
      if (updateId) {
        body = { ...body, _id: updateId };
        await axios.patch(`${PROXY}/handler/update`, body, {
          headers: { authorization: data?.token },
        });
      } else {
        await axios.post(`${PROXY}/handler`, body, {
          headers: { authorization: data?.token },
        });
      }
      setUpdate(!update);
      setId("");
      setUserDet({
        name: "",
        email: "",
        contact: "",
      });
      setOpenModal(false);
    } catch (e) {
      console.log("🚀 ~ submitLead ~ body:", e);
      alert(e.response.data.message);
    }
  };
  const OpenModalId = async (id) => {
    const data = JSON.parse(localStorage?.getItem("wedcell"))?.data;
    const { data: res } = await axios.get(`${PROXY}/handler/get?uId=${id}`, {
      headers: { authorization: data?.token },
    });
    console.log("🚀 ~ OpenModalId ~ res:", res.data[0].name);
    setId(id);
    setUserDet({
      name: res.data[0].name,
      email: res.data[0].email,
      contact: res.data[0].contact,
    });
    setOpenModal(true);
  };
  const [userDet, setUserDet] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const router = useRouter();
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "mobile", label: "Contact", minWidth: 100 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
  ];

  function createData(id, name, mobile, email) {
    return { id, name, mobile, email };
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "350px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 0.5,
    borderRadius: "10px",
    height: "50vh",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
  };
  const [openModal, setOpenModal] = useState();
  return (
    <Layout>
      <Modal
        open={openModal}
        onClose={() => {
          setId("");
          setUserDet({
            name: "",
            email: "",
            contact: "",
          });
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className={styles.EnterLead}
            style={{ justifyContent: "space-between", height: "100%" }}
          >
            <img
              className={styles.closebtn}
              src={`${S3PROXY}/vendors/assets/images/close.png`}
              alt=""
              onClick={() => {
                setId("");
                setUserDet({
                  name: "",
                  email: "",
                  contact: "",
                });
                setOpenModal(false);
              }}
            />
            <div className={styles.inputs}>
              <article>
                <label htmlFor="">Name</label>
                <input
                  value={userDet.name}
                  type="text"
                  onChange={(e) =>
                    setUserDet({ ...userDet, name: e.target.value })
                  }
                />
              </article>
              <article>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  value={userDet.email}
                  onChange={(e) =>
                    setUserDet({ ...userDet, email: e.target.value })
                  }
                />
              </article>
              <article>
                <label htmlFor="">Contact</label>
                <input
                  type="text"
                  value={userDet.contact}
                  onChange={(e) =>
                    setUserDet({ ...userDet, contact: e.target.value })
                  }
                />
              </article>
            </div>
            <div className={styles.btnSaves1}>
              <button onClick={() => submitUser(id ? id : "")}>Save</button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className={styles.leadMain}>
        <hgroup>
          <span>Settings</span>
        </hgroup>
        <div className={styles.tablesdiv}>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              border: "1px solid rgba(0, 0, 0, 1)",
            }}
          >
            <TableContainer sx={{ maxHeight: 440 }}>
              <div className={styles.SetHeader}>
                <span>Users({rows.length}/5)</span>
                {rows.length == 5 ? (
                  <></>
                ) : (
                  <button onClick={() => setOpenModal(true)}>
                    <img
                      src={`${S3PROXY}/vendors/assets/images/Plus.png`}
                      alt=""
                    />
                    Add User
                  </button>
                )}
              </div>
              <Table stickyHeader aria-label="sticky table">
                {/* <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead> */}
                <TableBody>
                  {rows.map((row) => {
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
                              style={{ fontSize: "15px" }}
                              key={column.id}
                              align={column.align}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                          <article className={styles.tableActions}>
                            <button
                              onClick={() => {
                                OpenModalId(row.id);
                              }}
                            >
                              <img
                                src={`${S3PROXY}/vendors/assets/images/pencil.png`}
                                alt=""
                              />
                            </button>
                            <button
                              onClick={async () => {
                                const data = JSON.parse(
                                  localStorage?.getItem("wedcell")
                                )?.data;
                                console.log("🚀 ~ onClick={ ~ data:", data);
                                await axios.delete(
                                  `${PROXY}/handler/${row.id}`,
                                  {
                                    headers: { authorization: data?.token },
                                  }
                                );
                                setUpdate(!update);
                              }}
                            >
                              <img
                                src={`${S3PROXY}/vendors/assets/images/delete.png`}
                                alt=""
                              />
                            </button>{" "}
                          </article>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Paper>
        </div>
        <div className={styles.SystemChanges}>
          <span>System Changes</span>
          <article>
            <button>Reset data</button>
            <button>Change Admin</button>
            <button>Change Company</button>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default Leads;
