import { HeartBroken } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/planning.module.scss";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import axios from "axios";
import { PROXY, S3PROXY } from "../../config";
import { green } from "@mui/material/colors";
import Layout from "../../Components/Dashboard/layout";
const GuestListRow = ({
  checkedbox,
  setCountCheck,
  setCheckedbox,
  countcheck,
  length,
  setIds,
  ids,
  values,
  key,
  handleEditopen,
  setUpdate,
  update,
  config,
  arrayMenues,
  update123,
  setupdate123,
}) => {
  const [attending, setAttending] = useState(values.attendence);
  const [menu, setMenu] = useState(values.menu);
  const [invites, setInvites] = useState(values.inviteSent);

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  useEffect(() => {
    setCheckedboxone(checkedbox);
    if (!checkedbox) {
      setIds([]);
    }
  }, [checkedbox]);
  const updateAttending = async (value, type) => {
    if (type === "menu") {
      const res = await axios.put(
        `${PROXY}/guests/update`,
        {
          id: values._id,
          menu: value,
        },
        config
      );
      if (res.data.success) {
        setUpdate(!update);
      }
    }
    if (type === "attend") {
      const res = await axios.put(
        `${PROXY}/guests/update`,
        {
          id: values._id,
          attendence: value,
        },
        config
      );
      if (res.data.success) {
        setUpdate(!update);
      }
    }
    if (type === "invite") {
      const res = await axios.put(
        `${PROXY}/guests/update`,
        {
          id: values._id,
          inviteSent: value,
        },
        config
      );
      if (res.data.success) {
        setUpdate(!update);
      }
    }
  };
  // updateAttending();
  // useEffect(() => {
  // }, [update123]);

  const [checkedboxone, setCheckedboxone] = useState(false);
  const ITEM_HEIGHT = 48;
  const options = ["Edit", "Remove"];
  const handleOptions = (option) => {
    alert(option);
  };
  return (
    <>
      <div className={styles.listdiv1} key={key}>
        <div style={{ display: "flex", gap: "20px", width: "80%" }}>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: green[600],
              },
            }}
          ></Checkbox>
          <article>
            <div className={styles.imgmessagediv}>
              {values.prospectName.substring(0, 1)}
            </div>
            <span className={styles.vendnamemes}>
              {values.vendorName.substring(0, 15)} <br />
              <span className={styles.vendcont}>{values.prospectContact}</span>
            </span>
            <span className={styles.messaegecounnt}>5</span>
          </article>
        </div>
        <div className={styles.todoBtn} style={{ fontSize: "15px" }}>
          <span>Monday, 26 Aug</span>
        </div>
      </div>
      {/* <div className={styles.under900}>
      <div className={styles.guestlisttablerows}>
        <div className={styles.checkbox}>
          <article className={styles.checkbox1}>
            <Checkbox
              checked={checkedboxone}
              onChange={(e) => {
                setCheckedboxone(e.target.checked);
                if (e.target.checked) {
                  setCountCheck((value) => ++value);
                  setIds([...ids, values._id]);
                  if (countcheck === length) {
                    setCheckedbox(true);
                  }
                } else {
                  setCountCheck((value) => --value);
                  if (countcheck === 1) {
                    setCheckedbox(false);
                  }
                  const newId = ids.filter((values1) => values1 !== values._id);
                  setIds(newId);
                }
              }}
            ></Checkbox>

            <span>{values.name}</span>
          </article>
          {windowWidth > 900 ? (
            <>
              <span className={styles.checkbox2}>
                <Select
                  className={styles.checkbox2input}
                  value={values.attendence}
                  labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  label="Attnding"
                  onChange={(e) => {
                    updateAttending(e.target.value, "attend");
                  }}
                >
                  <MenuItem value={0}>Not Attending</MenuItem>
                  <MenuItem value={1}>Attending</MenuItem>
                  <MenuItem value={2}>Pending</MenuItem>
                </Select>
              </span>
              <span className={styles.checkbox2}>
                <Select
                  className={styles.checkbox2input}
                  value={values.menu}
                  labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  label="Gender"
                  onChange={(e) => {
                    updateAttending(e.target.value, "menu");
                  }}
                >
                  {arrayMenues?.map((values, key) => {
                    return <MenuItem value={values}>{values}</MenuItem>;
                  })}
                </Select>
              </span>
              <span className={styles.checkbox2}>
                <Select
                  className={styles.checkbox2input}
                  value={values.inviteSent}
                  labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  label="Attnding"
                  onChange={(e) => {
                    updateAttending(e.target.value, "invite");
                  }}
                >
                  <MenuItem value={true}>Invite Sent</MenuItem>
                  <MenuItem value={false}>Invite Not Sent</MenuItem>
                </Select>
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          className={styles.todoBtn}
          style={{ width: "15%", justifyContent: "end" }}
        >
          <button
            onClick={() =>
              handleEditopen(
                values._id,
                values.name,
                values.gender,
                values.group,
                values.menu
              )
            }
          >
            <img src={`${S3PROXY}/vendors/images/fluent-mdl2_edit.png" alt="`} />
          </button>
          {values.group === "Couples" ? (
            <></>
          ) : (
            <button
              onClick={async () => {
                const res = await axios.delete(
                  `${PROXY}/guests/${values._id}`,
                  config
                );
                if (res.data.success) {
                  setUpdate(!update);
                }
              }}
            >
              <img src={`${S3PROXY}/vendors/images/delete.png" alt="`} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.under900AMS}>
        {windowWidth < 900 ? (
          <>
            <span className={styles.checkbox2}>
              <Select
                className={styles.checkbox2input}
                value={attending}
                labelId="demo-simple-select-label"
                // id="demo-simple-select"
                label="Attnding"
                onChange={(e) => {
                  setAttending(e.target.value);
                  setupdate123(!update123);
                }}
              >
                <MenuItem value={0}>Not Attending</MenuItem>
                <MenuItem value={1}>Attending</MenuItem>
                <MenuItem value={2}>Pending</MenuItem>
              </Select>
            </span>
            <span className={styles.checkbox2}>
              <Select
                className={styles.checkbox2input}
                value={menu}
                labelId="demo-simple-select-label"
                // id="demo-simple-select"
                label="Gender"
                onChange={(e) => {
                  setMenu(e.target.value);
                  setupdate123(!update123);
                }}
              >
                {arrayMenues?.map((values, key) => {
                  return <MenuItem value={values}>{values}</MenuItem>;
                })}
              </Select>
            </span>
            <span className={styles.checkbox2}>
              <Select
                className={styles.checkbox2input}
                value={invites}
                labelId="demo-simple-select-label"
                // id="demo-simple-select"
                label="Attnding"
                onChange={(e) => {
                  setInvites(e.target.value);
                  setupdate123(!update123);
                }}
              >
                <MenuItem value={true}>Invite Sent</MenuItem>
                <MenuItem value={false}>Invite Not Sent</MenuItem>
              </Select>
            </span>
          </>
        ) : (
          <></>
        )}
      </div>
    </div> */}
    </>
  );
};
const GuestListCat = ({
  values,
  key123,
  config,
  aGM,
  handleEditopen,
  submit,
  arrayMenues,
  update123,
  setupdate123,
}) => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [checkedbox, setCheckedbox] = useState();
  const [attending, setAttending] = useState();
  const [menu, setMenu] = useState();
  const ITEM_HEIGHT = 48;
  const options = ["Option1", "Option2"];
  const [arr, setArr] = useState([1, 2, 3, 4, 5]);
  const [countcheck, setCountCheck] = useState(0);
  const [ids, setIds] = useState([]);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState();

  const handleRemove = async () => {};
  useEffect(() => {
    const getCatrow = async () => {
      const res = await axios.put(
        `${PROXY}/guests`,
        {
          category: values,
          type:
            aGM === "Group"
              ? "group"
              : aGM === "Attendance"
              ? "attendence"
              : aGM === "Menu"
              ? "menu"
              : "",
        },
        config
      );
      setData(res.data.data);
    };
    getCatrow();
  }, [values, aGM, update]);

  return (
    <div style={{ paddingTop: "30px" }}>
      <div className={styles.guestlisttablehead}>
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <div>
            <Checkbox
              checked={data?.length === countcheck}
              onChange={(e) => {
                setCheckedbox(e.target.checked);
                if (e.target.checked) {
                  setCountCheck(data?.length);
                  const newId = [];
                  data?.map((values) => {
                    newId = [...newId, values._id];
                  });
                  setIds(newId);
                } else {
                  setCountCheck(0);
                }
              }}
            ></Checkbox>
            <span>
              {aGM === "Attendance" && values === 0
                ? "Declined"
                : aGM === "Attendance" && values === 1
                ? "Attending"
                : aGM === "Attendance" && values === 2
                ? "Pending"
                : values}
            </span>
          </div>
          {countcheck > 0 ? (
            <div className={styles.afterShow}>
              <span className={styles.checkbox2}>
                <Select
                  className={styles.checkbox2input}
                  // value={!attending ? null : attending}
                  labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  label="Attnding"
                  onChange={async (e) => {
                    if (ids?.length) {
                      ids.forEach(async (values) => {
                        const res = await axios.put(
                          `${PROXY}/guests/update`,
                          {
                            id: values,
                            attendence: e.target.value,
                          },
                          config
                        );
                      });
                      setupdate123(!update123);
                      setUpdate(!update);
                    }
                  }}
                >
                  <MenuItem value={0}>Not Attending</MenuItem>
                  <MenuItem value={1}>Attending</MenuItem>
                  <MenuItem value={2}>Pending</MenuItem>
                </Select>
              </span>
              <span className={styles.checkbox2}>
                <Select
                  className={styles.checkbox2input}
                  value={menu}
                  labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  label="Gender"
                  onChange={(e) => {
                    if (ids?.length) {
                      ids.forEach(async (values) => {
                        const res = await axios.put(
                          `${PROXY}/guests/update`,
                          {
                            id: values,
                            menu: e.target.value,
                          },
                          config
                        );
                      });
                      setUpdate(!update);
                      setupdate123(!update123);
                    }
                  }}
                >
                  {arrayMenues?.map((values, key) => {
                    return <MenuItem value={values}>{values}</MenuItem>;
                  })}
                </Select>
              </span>
              <span className={styles.checkbox2}>
                <Select
                  className={styles.checkbox2input}
                  labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  label="Attnding"
                  onChange={(e) => {
                    if (ids?.length) {
                      ids.forEach(async (values) => {
                        const res = await axios.put(
                          `${PROXY}/guests/update`,
                          {
                            id: values,
                            inviteSent: e.target.value,
                          },
                          config
                        );
                      });
                      setUpdate(!update);
                      setupdate123(!update123);
                    }
                  }}
                >
                  <MenuItem value={true}>Invite Sent</MenuItem>
                  <MenuItem value={false}>Invite Not Sent</MenuItem>
                </Select>
              </span>
              <button
                onClick={() => {
                  if (ids?.length) {
                    ids.forEach(async (values) => {
                      const res = await axios.delete(
                        `${PROXY}/guests/${values}`,
                        config
                      );
                    });
                    setupdate123(!update123);
                  }
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        {aGM !== "Attendance" ? (
          <button
            className={styles.deleteCategorybtn}
            onClick={() => {
              submit(values, key123, aGM);
            }}
          >
            <img src={`${S3PROXY}/vendors/images/delete.png`} alt="" />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.rowsTable}>
        {data?.length ? (
          data?.map((values, key) => {
            return (
              <GuestListRow
                checkedbox={checkedbox}
                setCountCheck={setCountCheck}
                setCheckedbox={setCheckedbox}
                countcheck={countcheck}
                length={arr?.length}
                setIds={setIds}
                ids={ids}
                values={values}
                key={key}
                handleEditopen={handleEditopen}
                setUpdate={setUpdate}
                update={update}
                config={config}
                arrayMenues={arrayMenues}
                update123={update123}
                setupdate123={setupdate123}
              ></GuestListRow>
            );
          })
        ) : (
          <h4 style={{ width: "100%", padding: "10px 30px" }}>No Data Found</h4>
        )}
        {}
      </div>
    </div>
  );
};
const SingleTodo = ({ uSERLIST }) => {
  return (
    <>
      {uSERLIST?.length ? (
        uSERLIST?.map((values, key) => {
          return (
            <div className={styles.listdiv1} key={key}>
              <div style={{ display: "flex", gap: "20px", width: "80%" }}>
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: green[600],
                    },
                  }}
                ></Checkbox>
                <article>
                  <div className={styles.imgmessagediv}>
                    {values.prospectName.substring(0, 1)}
                  </div>
                  <span className={styles.vendnamemes}>
                    {values.vendorName.substring(0, 15)} <br />
                    <span className={styles.vendcont}>
                      {values.prospectContact}
                    </span>
                  </span>
                  <span className={styles.messaegecounnt}>5</span>
                </article>
              </div>
              <div className={styles.todoBtn} style={{ fontSize: "15px" }}>
                <span>Monday, 26 Aug</span>
              </div>
            </div>
          );
        })
      ) : (
        <h4 style={{ width: "100%", padding: "10px 30px" }}>
          No Checklist Found
        </h4>
      )}
    </>
  );
};
const Message = () => {
  const globleuser = useSelector(selectUser);
  const config = {
    headers: { authorization: globleuser?.data?.token },
  };
  const [check, setcheck] = useState();
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const [uSERLIST, setUSERLIST] = useState([]);
  useEffect(() => {
    const getContact = async () => {
      const config = {
        headers: {
          authorization: globleuser?.data?.token,
        },
      };
      const result = await axios.post(
        `${PROXY}/contacts/get`,
        {
          vendorId: globleuser?.data?._id,
        },
        config
      );
      setUSERLIST(result.data.data);
    };
    getContact();
  }, [globleuser]);
  const dispatch = useDispatch();
  const [array1, setarray1] = useState(["Vendor Messages"]);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState();

  return (
    <Layout>
      <div className={styles.VendorManagerDiv} style={{ width: "100%" }}>
        {windowWidth > 900 ? (
          <>
            <div
              className={styles.checkListhead}
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "20px 6%",
              }}
            >
              <div
                className={styles.checkListhead1}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // padding: "20px 6%",
                  fontSize: "15px",
                  gap: "5px",
                  width: "80%",
                  fontWeight: "600",
                }}
              >
                <span className={styles.VendorManagerspan1}>Messages</span>
              </div>
              <div className={styles.DownloadAndPrintdiv1}>
                <TextField
                  label="Search"
                  sx={{
                    // paddingRight: "5px",
                    margin: "10px auto",
                    borderColor: "white",
                    backgroundColor: "white",
                    border: "none",
                    border: "1px solid #d43f7a",
                    width: "90%",
                    color: "#d43f7a",
                    // borderRadius: "20px",
                  }}
                  // margin="dense"
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchRoundedIcon sx={{ color: "#d43f7a" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                className={styles.VendorManagerBody1}
                style={{ padding: "20px", width: "90%" }}
              >
                <div className={styles.bodyLeftSec}>
                  <div className={styles.monthlyandCat}>
                    <span className={styles.monthName}>Index</span>
                    <div className={styles.monthlyandCatdiv1}>
                      <article>
                        <span className={styles.monthlyandCatname}>
                          Vendor Messages
                        </span>
                      </article>
                      <article>
                        <span className={styles.monthlyandCatname}>
                          Venue Messages
                        </span>
                      </article>
                      <article>
                        <span className={styles.monthlyandCatname}>
                          Chat Group
                        </span>
                      </article>
                      <article>
                        <span className={styles.monthlyandCatname}>
                          Admin Messages
                        </span>
                      </article>
                      <article>
                        <span className={styles.monthlyandCatname}>
                          Notification
                        </span>
                      </article>
                    </div>
                  </div>
                </div>
                <div className={styles.bodyRightSec}>
                  <div className={styles.rightsecbody}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "20px",
                      }}
                    >
                      <span className={styles.monthName}>{array1[0]}</span>
                      <div className={styles.messageoptions}>
                        <article>
                          <Checkbox
                            size="small"
                            checked={check}
                            onChange={() => setcheck(!check)}
                            sx={{
                              "&.Mui-checked": {
                                color: green[600],
                              },
                            }}
                          ></Checkbox>
                          <span>Select all</span>
                        </article>
                        {check ? (
                          <article style={{ gap: "10px" }}>
                            <span>Archive</span>
                            <DeleteRoundedIcon />
                          </article>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className={styles.listTable}>
                      <SingleTodo
                        config={config}
                        update={update}
                        setUpdate={setUpdate}
                        uSERLIST={uSERLIST}
                      ></SingleTodo>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.checkListhead}>
              <div
                className={styles.checkListhead1}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "5px",
                  fontSize: "15px",
                  gap: "5px",
                  width: "100%",
                }}
              >
                <div className={styles.VendorManagerspandiv}>
                  <span className={styles.VendorManagerspan1}>
                    Your Checklist
                  </span>
                </div>
              </div>

              <div className={styles.checklistFilter}></div>
              <div className={styles.yourSearchDiv}>
                <span>Your Filter</span>
              </div>
            </div>

            <div className={styles.VendorManagerBody1}>
              <div className={styles.bodyRightSec}>
                <div className={styles.rightsecbody}>
                  {array1?.map((values, key) => {
                    return (
                      <div className={styles.rightsecbody}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingRight: "20px",
                          }}
                        >
                          <span className={styles.monthName}>{values}</span>
                        </div>
                        <div className={styles.listTable}>
                          <SingleTodo
                            config={config}
                            update={update}
                            setUpdate={setUpdate}
                            uSERLIST={uSERLIST}
                          ></SingleTodo>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Message;
