import { useEffect, useState, useRef } from "react";
import styles from "../../styles/planning.module.scss";
import {
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { PROXY, S3PROXY } from "../../config";
import Layout from "../../Components/Dashboard/layout";
import { io } from "socket.io-client";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ForwardMsg from "../../Components/ForwardMsg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useRouter } from "next/router";

const theme3 = createTheme({
  palette: {
    primary: {
      main: "#B6255A",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderRadius: "10px",
            borderColor: "#b6255a",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderRadius: "10px",
            border: "1px solid #b6255a",
            // paddingRight: '0px',
            // border: "none",
          },

          "MuiFormLabel-root": {
            color: "#b6255a !important",
          },
        },
      },
    },
  },
});
const theme4 = createTheme({
  palette: {
    primary: {
      main: "#1E1E1E",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          ".MuiOutlinedInput-notchedOutline": {
            // backgroundColor: "#f4f4f4",
            border: "none",
          },
        },
      },
    },
  },
});
const SingleTodo = ({
  uSERLIST,
  selected,
  setSelected,
  setALLmessages,
  setShowAllMessage,
  setModifiedMsgs,
  setPage,
  setTotalPage,
}) => {
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const globleuser = useSelector(selectUser);
  return (
    <>
      <div
        className={styles.listdiv1}
        style={{
          gap: "0px",
          gridGap: "0px",
          padding: "10px 5%",
          background:
            selected && selected._id == globleuser?.data?.adminMessageId
              ? globleuser?.data?.adminMessageId
              : "648d3c8efb95751e4d881bee"
              ? "#ffb9ca29"
              : "",
        }}
      >
        <div
          onClick={() => {
            if (windowWidth < 901) {
              setShowAllMessage(true);
              setPage(1);
              setTotalPage(1);
            }
            if (
              selected && selected._id == globleuser?.data?.adminMessageId
                ? globleuser?.data?.adminMessageId
                : "648d3c8efb95751e4d881bee"
            ) {
            } else {
              setALLmessages([]);
              setModifiedMsgs([]);
              setSelected({
                prospectName: "Wedcell Admin",
                prospectContact: "919910990378",
                prospectImage: `${S3PROXY}/public/images/webp/Group%204.webp`,
                prospectId: "648d3c8efb95751e4d881bee",
                vendorId: globleuser?.data?._id,
                initiatorId: "648d3c8efb95751e4d881bee",
                _id: globleuser?.data?.adminMessageId
                  ? globleuser?.data?.adminMessageId
                  : "648d3c8efb95751e4d881bee",
              });
              setPage(1);
              setTotalPage(1);
            }
            // setALLmessages([])
          }}
          style={{ display: "flex", gap: "20px", width: "80%" }}
        >
          <article style={{ width: "100%", justifyContent: "start" }}>
            <div className={styles.imgmessagediv}>
              <img
                className={styles.imgmessagediv}
                src={`${S3PROXY}/public/images/webp/Group%204.webp`}
                alt={"A"}
              />
            </div>
            <span className={styles.vendnamemes}>
              Admin Wedcell <br />
            </span>
          </article>
        </div>
        <div
          className={styles.todoBtn}
          style={{
            fontSize: "15px",
            width: windowWidth > 1150 ? "20%" : "25%",
            justifyContent: "end",
          }}
        ></div>
      </div>
      {uSERLIST?.length ? (
        uSERLIST?.map((values, key) => {
          return (
            <div
              className={styles.listdiv1}
              style={{
                gap: "0px",
                gridGap: "0px",
                padding: "10px 5%",
                background:
                  selected && selected._id == values._id ? "#ffb9ca29" : "",
              }}
              key={key}
            >
              <div
                onClick={() => {
                  if (windowWidth < 901) {
                    setShowAllMessage(true);
                    setPage(1);
                    setTotalPage(1);
                  }
                  if (selected && selected._id == values._id) {
                  } else {
                    setALLmessages([]);
                    setModifiedMsgs([]);
                    setSelected(values);
                    setPage(1);
                    setTotalPage(1);
                  }
                  // setALLmessages([])
                }}
                style={{ display: "flex", gap: "20px", width: "80%" }}
              >
                <article style={{ width: "100%", justifyContent: "start" }}>
                  <div className={styles.imgmessagediv}>
                    <img
                      className={styles.imgmessagediv}
                      src={values.prospectImage}
                      alt={values.prospectImage.substring(0, 1)}
                    />
                    {/* {values.vendorName.substring(0, 1)} */}
                  </div>
                  <span className={styles.vendnamemes}>
                    {values.prospectName.substring(0, 15)} <br />
                    <span className={styles.vendcont}>
                      {/* {values.vendorContact}  */}
                      {values?.lastMessage
                        ? `${
                            values?.lastMessage.messageType == "image"
                              ? "Photo"
                              : values?.lastMessage.messageType == "video"
                              ? "Video"
                              : values?.lastMessage.messageType == "doc"
                              ? "Document"
                              : values?.lastMessage.message.substring(0, 20)
                          }`
                        : `Start conversation`}
                    </span>
                  </span>
                </article>
              </div>
              <div
                className={styles.todoBtn}
                style={{
                  fontSize: "15px",
                  width: windowWidth > 1150 ? "20%" : "25%",
                  justifyContent: "end",
                }}
              >
                <span>
                  {values?.lastMessage
                    ? new Date(
                        values?.lastMessage.timestamp
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}{" "}
                  <br />
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <h4 style={{ width: "100%", padding: "10px 30px" }}>
          No Contacts Found
        </h4>
      )}
    </>
  );
};

const MegaMessage = ({
  message,
  setDelMsg,
  setFrwdMsg,
  setRplyMsg,
  setOpenModalForward,
  back,
}) => {
  const [anchorEl, setAnchorEl] = useState();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl1, setAnchorEl1] = useState();
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const ITEM_HEIGHT = 48;
  if (message.type === "receiver") {
    return (
      <div className={styles.mymessagebloackmaindiv}>
        <div className={styles.mymessage}>
          {back === message.name ? (
            <></>
          ) : (
            <div className={styles.mymessagenametime}>
              <div className={styles.mymessageimg}>
                {message?.name?.substring(0, 1)}
              </div>

              <span className={styles.mymessagename}>
                {message?.name}
                <span className={styles.mymessagetime}>{message.time}</span>
              </span>
            </div>
          )}
          <div className={styles.mymessagebodymaindiv}>
            <article className={styles.myMessagebody}>
              <div className={styles.arrowdownmess}>
                <KeyboardArrowDownIcon
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                ></KeyboardArrowDownIcon>
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
                      left: "50",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setDelMsg(message._id);
                      handleClose();
                    }}
                  >
                    Delete
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => {
                      setFrwdMsg(message);
                      setOpenModalForward(true);
                    }}
                  >
                    Forward
                  </MenuItem> */}
                  <MenuItem
                    onClick={() => {
                      setRplyMsg(message);
                    }}
                  >
                    Reply
                  </MenuItem>
                </Menu>
              </div>
              {message.replyOf && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "fit-content",
                    background: "rgba(0,0,0,.1)",
                    borderRadius: "8px 8px 0px 0px",
                    borderTop: "1px solid white",
                    borderBottom: "2px solid rgba(0,0,0,.5)",
                    // marginTop: '10px',
                    padding: "3px 10px",
                    boxShadow: "1px 1px 2px 1px rgba(0,0,0,.2)",
                    fontSize: "15px",
                    marginBottom: "3px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "600" }}>
                      {message.replyOf.sender}
                    </span>
                    {message.replyOf.msgType == "image" ? (
                      <img
                        height="100px"
                        className={styles.myFilebody}
                        src={message.replyOf.msg}
                      />
                    ) : message.replyOf.msgType == "video" ? (
                      <video className={styles.myFilebody} height="100px">
                        <source src={message.replyOf.msg} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : message.replyOf.msgType === "doc" ? (
                      <embed
                        className={styles.myFilebody}
                        src={message.replyOf.msg}
                        type="application/pdf"
                        width="70%"
                        height="100px"
                      />
                    ) : (
                      <span>
                        {message?.replyOf?.msg?.substring(0, 30)}
                        {message?.replyOf?.msg?.length > 30 && "..."}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {message.textFileType == "image" ? (
                <img className={styles.myFilebody} src={message.message} />
              ) : message.textFileType == "video" ? (
                <video className={styles.myFilebody} controls>
                  <source src={message.message} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : message.textFileType === "doc" ? (
                <embed
                  className={styles.myFilebody}
                  src={message.message}
                  type="application/pdf"
                  width="70%"
                  height="500px"
                />
              ) : (
                <>{message.message}</>
              )}
            </article>
          </div>
          {message.forwarded && <p style={{ color: "red" }}>Forwarded</p>}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.yourmessagebloackmaindiv}>
        <div className={styles.yourmessage}>
          {back === message.name ? (
            <></>
          ) : (
            <div className={styles.yourmessagenametime}>
              <div className={styles.yourmessageimg}>
                {message.name.substring(0, 1)}
              </div>
              {/* {message.replyOf && (
              <div>
                <h3>{message.replyOf.sender}</h3>
                {message.replyOf.msgType == 'image' ? (
                  <
                    className={styles.myFilebody}
                    src={message.message}
                  />
                ) : message.replyOf.msgType == 'video' ? (
                  <video
                    className={styles.myFilebody}
                    controls
                  >
                    <source
                      src={message.message}
                      type='video/mp4'
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : message.replyOf.msgType === 'doc' ? (
                  <embed
                    className={styles.myFilebody}
                    src={message.message}
                    type='application/pdf'
                    width='70%'
                    height='500px'
                  />
                ) : (
                  <h2>{message.replyOf.msg}</h2>
                )}
              </div>
            )} */}
              <span className={styles.yourmessagename}>
                {message.name}
                <span className={styles.yourmessagetime}>{message.time}</span>
              </span>
            </div>
          )}
          {/* <p onClick={() => setDelMsg(message._id)}>Del</p>
          <p
            onClick={() => {
              setFrwdMsg(message);
              setOpenModalForward(true);
            }}>
            Forward
          </p> */}
          <div className={styles.yourmessagebodymaindiv}>
            <article className={styles.yourMessagebody}>
              <div className={styles.arrowdownmess1}>
                <KeyboardArrowDownIcon
                  aria-label="more"
                  id="long-button1"
                  aria-controls={open1 ? "long-menu" : undefined}
                  aria-expanded={open1 ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick1}
                ></KeyboardArrowDownIcon>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button1",
                  }}
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  {/* <MenuItem
                    onClick={() => {
                      setDelMsg(message._id);
                      handleClose1();
                    }}
                  >
                    Delete
                  </MenuItem> */}
                  {/* <MenuItem
                    onClick={() => {
                      setFrwdMsg(message);
                      setOpenModalForward(true);
                    }}
                  >
                    Forward
                  </MenuItem> */}
                  <MenuItem
                    onClick={() => {
                      setRplyMsg(message);
                    }}
                  >
                    Reply
                  </MenuItem>
                </Menu>
              </div>
              {message.replyOf && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "fit-content",
                    background: "rgba(0,0,0,.1)",
                    borderRadius: "8px 8px 0px 0px",
                    borderTop: "1px solid white",
                    borderBottom: "2px solid rgba(0,0,0,.5)",
                    // marginTop: '10px',
                    padding: "3px 10px",
                    boxShadow: "1px 1px 2px 1px rgba(0,0,0,.2)",
                    fontSize: "15px",
                    marginBottom: "3px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "600" }}>
                      {message.replyOf.sender}
                    </span>
                    {message.replyOf.msgType == "image" ? (
                      <img
                        height="100px"
                        className={styles.myFilebody}
                        src={message.replyOf.msg}
                      />
                    ) : message.replyOf.msgType == "video" ? (
                      <video className={styles.myFilebody} height="100px">
                        <source src={message.replyOf.msg} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : message.replyOf.msgType === "doc" ? (
                      <embed
                        className={styles.myFilebody}
                        src={message.replyOf.msg}
                        type="application/pdf"
                        width="70%"
                        height="100px"
                      />
                    ) : (
                      <span>
                        {message?.replyOf?.msg?.substring(0, 30)}
                        {message?.replyOf?.msg?.length > 30 && "..."}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {message.textFileType == "image" ? (
                <img className={styles.yourFilebody} src={message.message} />
              ) : message.textFileType == "video" ? (
                <video className={styles.yourFilebody} controls>
                  <source src={message.message} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : message.textFileType === "doc" ? (
                <embed
                  className={styles.yourFilebody}
                  src={message.message}
                  type="application/pdf"
                  width="70%"
                  height="500px"
                />
              ) : (
                <>{message.message}</>
              )}
            </article>
          </div>
          {message.forwarded && <p style={{ color: "red" }}>Forwarded</p>}
        </div>
      </div>
    );
  }
};
const Message = () => {
  const globleuser = useSelector(selectUser);
  const router = useRouter();

  const config = {
    headers: { authorization: globleuser?.data?.token },
  };
  const [modifiedMsgs, setModifiedMsgs] = useState([]);
  const [AllMEssages, setALLmessages] = useState([]);
  const [check, setcheck] = useState();
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const [uSERLIST, setUSERLIST] = useState([]);
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const [array1, setarray1] = useState(["User Messages"]);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState();
  const [message, setMessage] = useState();
  const [showAllMessage, setShowAllMessage] = useState();
  const [latest, setLatest] = useState();
  const [newMsg, setNewMsg] = useState();
  const [fwdmsg, setFwdMsg] = useState();
  const socketRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [delMsg, setDelMsg] = useState(null);
  const [frwdMsg, setFrwdMsg] = useState();
  const [rplyMsg, setRplyMsg] = useState(null);
  const [openModalForward, setOpenModalForward] = useState(null);
  const messageBodyRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    console.log("RUN", delMsg);
    deleteMsg();
  }, [delMsg]);

  const deleteMsg = async () => {
    if (delMsg) {
      const config = {
        headers: {
          authorization: globleuser?.data?.token,
        },
      };
      await axios.post(
        `${PROXY}/contacts/deletemsg`,
        {
          messageId: delMsg,
        },
        config
      );
      console.log("ID");
      const updatedAllMessages = modifiedMsgs.filter(
        (message) => message._id !== delMsg
      );
      console.log("ID", updatedAllMessages);

      setModifiedMsgs(updatedAllMessages);
    }
    //  setALLmessages(result.data.data.messages);
  };
  const uploadFile = async (e) => {
    if (e) {
      const maxSizeInBytes = 50 * 1024 * 1024;
      let type;
      console.log(e.type);
      if (e.type.startsWith("image/")) {
        type = "image";
      }
      if (e.type.startsWith("video/")) {
        type = "video";
      }
      if (e.type.startsWith("text/")) {
        type = "doc";
      }
      if (e.type.startsWith("application/pdf")) {
        type = "doc";
      }
      if (e.size < maxSizeInBytes) {
        const formData = new FormData();
        formData.append("file", e);

        // formData.append('name', e.name);
        // formData.append('type', e.type);
        let { data } = await axios.post(
          `${PROXY}/contacts/uploadfile`,
          formData,
          config
        );

        console.log("DATA", data, type);
        if (data) {
          console.log(type);
          type ? sendMessage(data, type) : alert("Unsupported document");
        }
      } else {
        alert("File size must be less than 5 mb");
      }
    }
  };
  function transformMessagesForFirstTime(messages) {
    if (selected && messages) {
      const transformedMessages = [...modifiedMsgs];

      messages.forEach((message) => {
        const messageType =
          message.senderId == globleuser?.data?._id ? "receiver" : "sender";
        const name =
          message.senderId == globleuser?.data?._id
            ? selected.vendorName
            : message.senderId == selected.prospectId
            ? selected.prospectName
            : "Admin Wedcell";

        const transformedMessage = {
          time: new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: messageType,
          textFileType: message.messageType,
          name: name,
          img: "",
          message: message.message,
          forwarded: message?.forwarded,
          _id: message._id,
          forwarded: message.forwarded,
          replyOf: message.replyOf,
        };

        transformedMessages.push(transformedMessage);
      });
      console.log("tr", transformedMessages);
      setModifiedMsgs(transformedMessages); // Update AllMEssages state
    }
  }
  function transformMessages(messages) {
    if (selected && messages) {
      const transformedMessages = [...modifiedMsgs];

      messages.forEach((message) => {
        const messageType =
          message?.senderId == globleuser?.data?._id ? "receiver" : "sender";
        const name =
          message?.senderId == globleuser?.data?._id
            ? selected.vendorName
            : message?.senderId == selected.prospectId
            ? selected.prospectName
            : "Admin Wedcell";

        const transformedMessage = {
          time: new Date(message?.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: messageType,
          textFileType: message?.messageType,
          name: name,
          img: "",
          message: message?.message,
          _id: message?._id,
          forwarded: message?.forwarded,
          replyOf: message?.replyOf,
        };

        transformedMessages.push(transformedMessage);
      });
      console.log("tr", transformedMessages);
      setModifiedMsgs(transformedMessages); // Update AllMEssages state
      addmsgToSide(messages[0], selected._id);
    }
  }
  const getMsg = async () => {
    console.log("in getmsg");
    setALLmessages([]);
    setModifiedMsgs([]);
    const config = {
      headers: {
        authorization: globleuser?.data?.token,
      },
    };
    const result = await axios.post(
      `${PROXY}/contacts/getone`,
      {
        id: selected._id,
        page,
        type: globleuser?.role,
      },
      config
    );
    if (result.data.newUser) {
      const u = JSON.parse(JSON.stringify(globleuser));
      u.data.adminMessageId = result.data.data._id;
      localStorage.setItem("wedcell", JSON.stringify(u));
      location.reload();
    }
    console.log("ID", result.data.data.messages);
    setALLmessages(result.data.data.messages);
    setTotalPage(result.data.totalPages);
    setPage((val) => ++val);
  };
  const getMsgAdd = async () => {
    setALLmessages([]);
    setModifiedMsgs([]);
    const config = {
      headers: {
        authorization: globleuser?.data?.token,
      },
    };
    const result = await axios.post(
      `${PROXY}/contacts/getone`,
      {
        id: selected._id,
        // type: globleuser?.role,
        page,
      },
      config
    );
    setALLmessages([...result.data.data.messages, ...AllMEssages]);
    setPage((val) => ++val);
  };

  const scrollTobottom = () => {
    const element = document.getElementById("messagebody");
    element && element?.scrollTo(0, element.scrollHeight);
  };
  const sendMessage = async (fileurl, msgtype) => {
    const arr = modifiedMsgs;
    let msgBody = {
      contactId: selected._id,
      senderId: globleuser?.data?._id,
      receiverId: [selected.prospectId, "648d3c8efb95751e4d881bee"],
      message: fileurl ? fileurl : message,
      messageType: msgtype,
    };
    rplyMsg
      ? (msgBody.replyOf = {
          msgId: rplyMsg._id,
          sender: rplyMsg.name,
          msg: rplyMsg.message,
          msgType: rplyMsg.textFileType,
        })
      : null;
    let res;
    if (selected.vendorId) {
      res = await axios.post(`${PROXY}/contacts/addmessage`, msgBody, config);
    }
    const newMsg = {
      message: fileurl ? fileurl : message,
      messageType: msgtype,
      textFileType: msgtype,
      type: "receiver",
      img: "",
      time: new Date(Date.now()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      name: globleuser?.data?.name,
      _id: res?.data?.data?._id,
      forwarded: message?.forwarded,
    };
    rplyMsg
      ? (newMsg.replyOf = {
          msgId: rplyMsg._id,
          sender: rplyMsg.name,
          msg: rplyMsg.message,
          msgType: rplyMsg.textFileType,
        })
      : null;
    arr.push(newMsg);
    setModifiedMsgs([...arr]);
    setMessage("");
    console.log("VVV", res.data);
    selected.vendorId && addmsgToSide(res.data.data, selected._id);
    let socketBody = {
      data: res.data.data,
      msgId: res.data.msgId,
      messageBody: {
        contactId: selected._id,
        senderId: globleuser?.data?._id,
        senderName: globleuser?.data?.name,
        receiverId: [selected.prospectId, "648d3c8efb95751e4d881bee"],
        time: new Date(Date.now()).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: fileurl ? fileurl : message,
        messageType: msgtype,
      },
    };
    !selected.vendorId ? (socketBody.messageBody.receiverId = []) : null;
    rplyMsg
      ? (socketBody.replyOf = {
          msgId: rplyMsg._id,
          sender: rplyMsg.name,
          msg: rplyMsg.message,
          msgType: rplyMsg.textFileType,
        })
      : null;
    setRplyMsg(null);
    socketRef.current.emit("message", socketBody);
  };

  const joinSelf = () => {
    socketRef.current.emit("joinSelf", globleuser?.data?._id);
  };

  useEffect(() => {
    socketRef.current = io.connect(PROXY);
    console.log("connected to socket");

    return () => {
      console.log("disconnecting from socket");
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    selected && selected?.vendorId && getMsg();
  }, [selected]);
  useEffect(() => {
    if (AllMEssages.length <= 50) {
      scrollTobottom();
    }
  }, [modifiedMsgs, showAllMessage]);

  useEffect(() => {
    selected && AllMEssages
      ? transformMessagesForFirstTime(AllMEssages)
      : console.log("err");
  }, [AllMEssages]);

  const getContact = async () => {
    console.log("inside getc");
    const config = {
      headers: {
        authorization: globleuser?.data?.token,
      },
    };
    const result = await axios.post(
      `${PROXY}/contacts/getmessages`,
      {
        vendorId: globleuser?.data?._id,
      },
      config
    );
    result.data.data.length
      ? setUSERLIST(
          result.data.data.sort((a, b) => {
            const timestampA = a.lastMessage
              ? new Date(a.lastMessage.timestamp)
              : new Date(a.createdAt);
            const timestampB = b.lastMessage
              ? new Date(b.lastMessage.timestamp)
              : new Date(b.createdAt);

            // Reverse the comparison to sort in descending order
            if (timestampA < timestampB) {
              return 1;
            } else if (timestampA > timestampB) {
              return -1;
            } else {
              return 0;
            }
          })
        )
      : setUSERLIST(result.data.data);
  };
  useEffect(() => {
    getContact();
  }, [globleuser, newMsg, fwdmsg]);
  useEffect(() => {
    joinSelf();
  }, [globleuser]);
  const addmsgToSide = (messages, id) => {
    console.log("in addmsg", messages);
    const updatedUserlist = uSERLIST.map((user) => {
      if (user._id === id) {
        return {
          ...user,
          lastMessage: messages,
        };
      }
      return user;
    });
    console.log("updatedUserlist", updatedUserlist);
    setUSERLIST(
      updatedUserlist.sort((a, b) => {
        const timestampA = a.lastMessage
          ? new Date(a.lastMessage.timestamp)
          : new Date(a.createdAt);
        const timestampB = b.lastMessage
          ? new Date(b.lastMessage.timestamp)
          : new Date(b.createdAt);

        // Reverse the comparison to sort in descending order
        if (timestampA < timestampB) {
          return 1;
        } else if (timestampA > timestampB) {
          return -1;
        } else {
          return 0;
        }
      })
    );
  };
  useEffect(() => {
    latest &&
      selected &&
      selected._id == latest.msgId &&
      transformMessages([latest.data]);
    latest &&
      (!selected || selected?._id != latest.msgId) &&
      addmsgToSide(latest.data, latest.msgId);
  }, [latest]);

  // useEffect(() => {
  //   socket.connect();

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("message", (data) => {
        setLatest(data);

        // if(selected._id == data.msgId){
        //   setALLmessages([...AllMEssages, data.msg ])
        // }
      });
      socketRef.current.on("newmsg", (data) => {
        setNewMsg(data.msgId);
      });
      // socketRef.current.on('fwdmsg', (data) => {
      //   setFwdMsg(data.data);
      // });
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.off("message");
        socketRef.current.off("newmsg");
      }
    };
  }, []);

  return (
    <Layout>
      <>
        <ForwardMsg
          isOpen={true}
          setOpenModal={setOpenModalForward}
          user={globleuser?.data}
          message={frwdMsg}
          openModal={openModalForward}
        ></ForwardMsg>
        <div
          className={styles.MessageDivs}
          style={{
            width: "100%",
            // marginTop: windowWidth > 900 ? '100px' : '67px',
            paddingBottom: "0px",
            gap: "0px",
          }}
        >
          {windowWidth > 900 ? (
            <>
              {/* <div
              className={styles.checkListhead}
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '10px 3%',
                border: 'none',
                marginBottom: '0px',
              }}
            >
              <div
                className={styles.checkListhead1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  // padding: "20px 6%",
                  fontSize: '18px',
                  gap: '5px',
                  width: '80%',
                  fontWeight: '600',
                }}
              >
                <span
                  className={styles.VendorManagerspan1}
                  style={{ fontSize: '35px', padding: '0px' }}
                >
                  Messages
                </span>
              </div>
              <div className={styles.DownloadAndPrintdiv1}></div>
            </div> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: `calc(100vh - ${windowWidth > 900 ? 187 : 60}px)`,
                }}
              >
                <div className={styles.VendorManagerBody1}>
                  <div
                    className={styles.bodyLeftSec}
                    style={{
                      width: "30%",
                      // boxShadow: "1px 1px 5px 0px rgba(0,0,0,.2)",
                      zIndex: "10",
                    }}
                  >
                    <div
                      className={styles.monthlyandCat}
                      style={{ height: "100%" }}
                    >
                      <article>
                        <span>Messages</span>
                      </article>
                      <div
                        className={styles.messageTab}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <span
                          onClick={() => router.push("/dashboard/Message")}
                          style={{
                            border: "1px solid #b6255a",
                            background: "#b6255a",
                            color: "white",
                          }}
                        >
                          Chat
                        </span>
                        <span
                          onClick={() =>
                            router.push("/dashboard/Group-Message")
                          }
                        >
                          Group
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "3px 20px",
                        }}
                      >
                        <input
                          placeholder="Search Message"
                          variant="filled"
                          sx={{
                            // paddingRight: "5px",
                            borderColor: "white",
                            backgroundColor: "white",
                            border: "none",
                            // border: '1px solid #d43f7a',
                            color: "#d43f7a",
                            // borderRadius: "20px",
                            width: "80%",
                          }}
                          // margin="dense"
                          fullWidth
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <IconButton></IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <span></span>
                      </div>

                      <div
                        className={styles.monthlyandCatdiv1}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <div
                          className={styles.listTable12}
                          style={{
                            borderRadius: "0px",
                            borderRight: "none",
                            height: "100%",
                          }}
                        >
                          <SingleTodo
                            config={config}
                            update={update}
                            setUpdate={setUpdate}
                            selected={selected}
                            setSelected={setSelected}
                            setALLmessages={setALLmessages}
                            setShowAllMessage={setShowAllMessage}
                            setModifiedMsgs={setModifiedMsgs}
                            uSERLIST={uSERLIST}
                            setPage={setPage}
                            setTotalPage={setTotalPage}
                          ></SingleTodo>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.bodyRightSec}
                    style={{ width: "70%", marginLeft: "-1px" }}
                  >
                    <div
                      className={styles.rightsecbody}
                      style={{ height: "100%" }}
                    >
                      {/* {openModal ? ( */}
                      <ForwardMsg
                        isOpen={true}
                        setOpenModal={setOpenModalForward}
                        message={frwdMsg}
                        user={globleuser?.data}
                        openModal={openModalForward}
                      ></ForwardMsg>
                      {/* // ) : ( */}
                      <>
                        {selected && (
                          <div className={styles.messagediv}>
                            <div
                              className={styles.messagedivhead}
                              style={{ borderRadius: "0px" }}
                            >
                              <div className={styles.messagedivheadleft}>
                                {selected && selected.vendorId ? (
                                  <img
                                    className={styles.messagedivheadImg}
                                    src={selected.prospectImage}
                                    alt={selected.prospectImage?.substring(
                                      0,
                                      1
                                    )}
                                  />
                                ) : (
                                  "A"
                                )}
                                {/* <div className={styles.messagedivheadImg}>A</div> */}
                                <div
                                  className={styles.messagedivheadnameOnline}
                                >
                                  {selected && selected.vendorId ? (
                                    <span className={styles.messageheadname}>
                                      <div>
                                        {selected
                                          ? selected.prospectName
                                          : "Open a Chat"}
                                      </div>
                                      <span className={styles.memberonline}>
                                        {selected
                                          ? selected.prospectContact
                                          : ""}
                                      </span>
                                    </span>
                                  ) : (
                                    <span className={styles.messageheadname}>
                                      <div>
                                        {selected
                                          ? "Wedcell Admin"
                                          : "Open a Chat"}
                                      </div>
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div
                                onClick={() => {
                                  window.open(
                                    `tel://+${selected.prospectContact}`
                                  );
                                }}
                                className={styles.messagehead3dots}
                              >
                                <img
                                  src={`${S3PROXY}/vendors/images/phone.png`}
                                  alt=""
                                />
                                Call
                              </div>
                            </div>
                            <div className={styles.messagedivbody}>
                              <div
                                id="messagebody"
                                style={{
                                  padding: "20px 30px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                  height: "100%",
                                  overflow: "scroll",
                                  height: "calc(100vh - 220px)",
                                }}
                                ref={messageBodyRef}
                                onScroll={async () => {
                                  if (messageBodyRef.current) {
                                    const { scrollTop, scrollLeft } =
                                      messageBodyRef.current;
                                    console.log(
                                      "🚀 ~ onScroll={ ~ scrollTop:",
                                      scrollTop
                                    );
                                    if (scrollTop == 20 && page <= totalPage) {
                                      await getMsgAdd();
                                    }
                                  }
                                }}
                              >
                                {modifiedMsgs?.map((item, key) => {
                                  return (
                                    <MegaMessage
                                      message={item}
                                      setDelMsg={setDelMsg}
                                      setFrwdMsg={setFrwdMsg}
                                      setOpenModalForward={setOpenModalForward}
                                      key={key}
                                      setRplyMsg={setRplyMsg}
                                      back={modifiedMsgs[key - 1]?.name}
                                    ></MegaMessage>
                                  );
                                })}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  // alignItems: 'center',
                                  flexDirection: "column",
                                }}
                              >
                                <ThemeProvider theme={theme4}>
                                  {rplyMsg && (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "90%",
                                        background: "rgba(0,0,0,.1)",
                                        borderRadius: "8px 8px 0px 0px",
                                        borderTop: "2px solid white",
                                        borderBottom:
                                          "2px solid rgba(0,0,0,.5)",
                                        marginTop: "10px",
                                        padding: "3px 10px",
                                        marginLeft: "10px",
                                        boxShadow:
                                          "1px 1px 2px 1px rgba(0,0,0,.5)",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "17px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {rplyMsg.name}
                                        </span>
                                        {rplyMsg.textFileType == "image" ? (
                                          <img
                                            className={styles.myFilebody}
                                            height="100px"
                                            src={rplyMsg?.message}
                                          />
                                        ) : rplyMsg.textFileType == "video" ? (
                                          <video
                                            className={styles.myFilebody}
                                            height="100px"
                                          >
                                            <source
                                              src={rplyMsg?.message}
                                              type="video/mp4"
                                            />
                                            Your browser does not support the
                                            video tag.
                                          </video>
                                        ) : rplyMsg.textFileType === "doc" ? (
                                          <embed
                                            className={styles.myFilebody}
                                            src={rplyMsg?.message}
                                            type="application/pdf"
                                            width="70%"
                                            height="100px"
                                          />
                                        ) : (
                                          <span
                                            style={{
                                              fontSize: "17px",
                                            }}
                                          >
                                            {rplyMsg?.message?.substring(0, 30)}
                                            {rplyMsg?.message?.length > 30 &&
                                              "..."}
                                            {/* {rplyMsg.message} */}
                                          </span>
                                        )}
                                      </div>
                                      <CancelOutlinedIcon
                                        sx={{
                                          color: "rgba(0,0,0,.6)",
                                          fontWeight: "bold",
                                        }}
                                        onClick={() => {
                                          setRplyMsg(null);
                                        }}
                                      ></CancelOutlinedIcon>
                                      {/* <button
                                      onClick={() => {
                                        setRplyMsg(null);
                                      }}
                                    >
                                      Cancel
                                    </button> */}
                                    </div>
                                  )}
                                  <div className={styles.messageSenders}>
                                    <div
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        overflow: "hidden",
                                        position: "relative",
                                      }}
                                    >
                                      <input
                                        type="file"
                                        id="file-input"
                                        className={styles.fileInput}
                                        onChange={(e) => {
                                          uploadFile(e.target.files[0]);
                                        }}
                                        accept=".jpg, .jpeg, .png, .gif,.mp4, .mov, .avi"
                                      />
                                      <ImageIcon
                                        sx={{
                                          fontSize: "20px",
                                          color: "rgba(0,0,0,.3)",
                                        }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        // background: "red",
                                        position: "relative",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <input
                                        type="file"
                                        id="file-input"
                                        className={styles.fileInput}
                                        onChange={(e) =>
                                          uploadFile(e.target.files[0])
                                        }
                                        accept=".pdf"
                                      />
                                      <PictureAsPdfIcon
                                        sx={{
                                          fontSize: "20px",
                                          color: "rgba(0,0,0,.3)",
                                        }}
                                      />
                                    </div>
                                    <input
                                      label=""
                                      placeholder="Type Your Message..."
                                      // variant="filled"
                                      fullWidth
                                      value={message}
                                      onChange={(e) => {
                                        setMessage(e.target.value);
                                      }}
                                      sx={{ backgroundColor: "#f4f4f4" }}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.preventDefault(); // Prevent the default Enter key behavior (e.g., adding a new line)
                                          sendMessage(null, "text"); // Call your sendMessage function here
                                        }
                                      }}
                                      // margin="dense"
                                      size="large"
                                      multiline
                                    />
                                    <IconButton
                                      className={styles.sendButton}
                                      onClick={() => sendMessage(null, "text")}
                                    >
                                      <SendIcon
                                        sx={{
                                          color: "#d43f7a",
                                          transform:
                                            "rotate(-40deg) translateX(5px)",
                                        }}
                                      />
                                    </IconButton>
                                  </div>
                                </ThemeProvider>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                      {/* // )} */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* <div
              className={styles.checkListhead}
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '10px 3%',
                border: 'none',
                marginBottom: '0px',
              }}
            >
              <div
                className={styles.checkListhead1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  // padding: "20px 6%",
                  fontSize: '18px',
                  gap: '5px',
                  width: '80%',
                  fontWeight: '600',
                }}
              >
                <span
                  className={styles.VendorManagerspan1}
                  style={{ fontSize: '35px', padding: '0px' }}
                >
                  Messages
                </span>
              </div>
              <div className={styles.DownloadAndPrintdiv1}></div>
            </div> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "calc(100vh - 70px)",
                  marginTop: "20px",
                }}
              >
                <div
                  className={styles.VendorManagerBody1}
                  style={{
                    padding: "0px",
                    width: "100%",
                    gap: "20px",
                    justifyContent: "center",
                  }}
                >
                  {showAllMessage ? (
                    <div
                      className={styles.bodyRightSec}
                      style={{ width: "100%" }}
                    >
                      <div
                        className={styles.rightsecbody}
                        style={{ height: "100%" }}
                      >
                        {/* {openModal ? ( */}
                        <ForwardMsg
                          isOpen={true}
                          setOpenModal={setOpenModalForward}
                          message={frwdMsg}
                          user={globleuser?.data}
                          openModal={openModalForward}
                        ></ForwardMsg>
                        {/* // ) : ( */}
                        <>
                          {selected && (
                            <div className={styles.messagediv}>
                              <div
                                className={styles.messagedivhead}
                                style={{ borderRadius: "0px" }}
                              >
                                <div className={styles.messagedivheadleft}>
                                  <img
                                    onClick={() => setShowAllMessage(false)}
                                    className={styles.backArrow}
                                    src={`${S3PROXY}/vendors/images/backArrow.png`}
                                  ></img>
                                  {selected && selected.vendorId ? (
                                    <img
                                      className={styles.messagedivheadImg}
                                      src={selected.vendorImage}
                                      alt={selected.vendorName?.substring(0, 1)}
                                    />
                                  ) : (
                                    "A"
                                  )}
                                  {/* <div className={styles.messagedivheadImg}>A</div> */}
                                  <div
                                    className={styles.messagedivheadnameOnline}
                                  >
                                    {selected && selected.vendorId ? (
                                      <span className={styles.messageheadname}>
                                        <div>
                                          {selected
                                            ? selected.vendorName
                                            : "Open a Chat"}
                                        </div>
                                        <span className={styles.memberonline}>
                                          {selected
                                            ? selected.vendorContact
                                            : ""}
                                        </span>
                                      </span>
                                    ) : (
                                      <span className={styles.messageheadname}>
                                        <div>
                                          {selected
                                            ? "Wedcell Admin"
                                            : "Open a Chat"}
                                        </div>
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div
                                  onClick={() => {
                                    window.open(
                                      `tel://+${selected.vendorContact}`
                                    );
                                  }}
                                  className={styles.messagehead3dots}
                                >
                                  <img
                                    src={`${S3PROXY}/vendors/images/phone.png`}
                                    alt=""
                                  />
                                  Call
                                </div>
                              </div>
                              <div className={styles.messagedivbody}>
                                <div
                                  id="messagebody"
                                  style={{
                                    padding: "20px 30px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                    height: "100%",
                                    overflow: "scroll",
                                  }}
                                  ref={messageBodyRef}
                                  onScroll={async () => {
                                    if (messageBodyRef.current) {
                                      const { scrollTop, scrollLeft } =
                                        messageBodyRef.current;
                                      console.log(
                                        "🚀 ~ onScroll={ ~ scrollTop:",
                                        scrollTop
                                      );
                                      if (
                                        scrollTop == 20 &&
                                        page <= totalPage
                                      ) {
                                        // await getMsgAdd();
                                      }
                                    }
                                  }}
                                >
                                  {modifiedMsgs?.map((item, key) => {
                                    return (
                                      <MegaMessage
                                        message={item}
                                        setDelMsg={setDelMsg}
                                        setFrwdMsg={setFrwdMsg}
                                        setOpenModalForward={
                                          setOpenModalForward
                                        }
                                        key={key}
                                        setRplyMsg={setRplyMsg}
                                        back={modifiedMsgs[key - 1]?.name}
                                      ></MegaMessage>
                                    );
                                  })}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    // alignItems: 'center',
                                    flexDirection: "column",
                                  }}
                                >
                                  <ThemeProvider theme={theme4}>
                                    {rplyMsg && (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          width: "90%",
                                          background: "rgba(0,0,0,.1)",
                                          borderRadius: "8px 8px 0px 0px",
                                          borderTop: "2px solid white",
                                          borderBottom:
                                            "2px solid rgba(0,0,0,.5)",
                                          marginTop: "10px",
                                          padding: "3px 10px",
                                          marginLeft: "10px",
                                          boxShadow:
                                            "1px 1px 2px 1px rgba(0,0,0,.5)",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: "17px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {rplyMsg.name}
                                          </span>
                                          {rplyMsg.textFileType == "image" ? (
                                            <img
                                              className={styles.myFilebody}
                                              height="100px"
                                              src={rplyMsg?.message}
                                            />
                                          ) : rplyMsg.textFileType ==
                                            "video" ? (
                                            <video
                                              className={styles.myFilebody}
                                              height="100px"
                                            >
                                              <source
                                                src={rplyMsg?.message}
                                                type="video/mp4"
                                              />
                                              Your browser does not support the
                                              video tag.
                                            </video>
                                          ) : rplyMsg.textFileType === "doc" ? (
                                            <embed
                                              className={styles.myFilebody}
                                              src={rplyMsg?.message}
                                              type="application/pdf"
                                              width="70%"
                                              height="100px"
                                            />
                                          ) : (
                                            <span
                                              style={{
                                                fontSize: "17px",
                                              }}
                                            >
                                              {rplyMsg?.message?.substring(
                                                0,
                                                30
                                              )}
                                              {rplyMsg?.message?.length > 30 &&
                                                "..."}
                                              {/* {rplyMsg.message} */}
                                            </span>
                                          )}
                                        </div>
                                        <CancelOutlinedIcon
                                          sx={{
                                            color: "rgba(0,0,0,.6)",
                                            fontWeight: "bold",
                                          }}
                                          onClick={() => {
                                            setRplyMsg(null);
                                          }}
                                        ></CancelOutlinedIcon>
                                        {/* <button
                                      onClick={() => {
                                        setRplyMsg(null);
                                      }}
                                    >
                                      Cancel
                                    </button> */}
                                      </div>
                                    )}
                                    <div className={styles.messageSenders}>
                                      <div>
                                        <Tooltip
                                          placement="top-start"
                                          title={
                                            <div className={styles.labels}>
                                              <label
                                                htmlFor="file-input"
                                                className={styles.fileLabel}
                                              >
                                                <input
                                                  type="file"
                                                  id="file-input"
                                                  className={styles.fileInput}
                                                  onChange={(e) =>
                                                    uploadFile(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  accept=".jpg, .jpeg, .png, .gif,.mp4, .mov, .avi"
                                                />
                                                <ImageIcon
                                                  sx={{
                                                    fontSize: "20px",
                                                    marginRight: "5px",
                                                    color: "rgba(0,0,0,.3)",
                                                  }}
                                                />
                                                Images
                                              </label>
                                              <label
                                                htmlFor="file-input"
                                                className={styles.fileLabel}
                                              >
                                                <input
                                                  type="file"
                                                  id="file-input"
                                                  className={styles.fileInput}
                                                  onChange={(e) =>
                                                    uploadFile(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  accept=".pdf"
                                                />
                                                <PictureAsPdfIcon
                                                  sx={{
                                                    fontSize: "20px",
                                                    marginRight: "5px",
                                                    color: "rgba(0,0,0,.3)",
                                                  }}
                                                />
                                                Documents
                                              </label>
                                            </div>
                                          }
                                        >
                                          <img
                                            src={`${S3PROXY}/vendors/images/paperclip.png`}
                                            alt=""
                                          />
                                        </Tooltip>
                                      </div>
                                      <input
                                        label=""
                                        placeholder="Type Your Message..."
                                        // variant="filled"
                                        fullWidth
                                        value={message}
                                        onChange={(e) => {
                                          setMessage(e.target.value);
                                        }}
                                        sx={{ backgroundColor: "#f4f4f4" }}
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            e.preventDefault(); // Prevent the default Enter key behavior (e.g., adding a new line)
                                            sendMessage(null, "text"); // Call your sendMessage function here
                                          }
                                        }}
                                        // margin="dense"
                                        size="large"
                                        multiline
                                      />
                                      <IconButton
                                        className={styles.sendButton}
                                        onClick={() =>
                                          sendMessage(null, "text")
                                        }
                                      >
                                        <SendIcon
                                          sx={{
                                            color: "#d43f7a",
                                            transform:
                                              "rotate(-40deg) translateX(5px)",
                                          }}
                                        />
                                      </IconButton>
                                    </div>
                                  </ThemeProvider>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                        {/* // )} */}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={styles.bodyLeftSec}
                      style={{
                        width: "100%",
                        // boxShadow: "1px 1px 15px 1px rgba(0,0,0,.5)",
                      }}
                    >
                      <div
                        className={styles.monthlyandCat}
                        style={{ height: "100%" }}
                      >
                        <article>
                          <span>
                            <img
                              onClick={() => router.back()}
                              className={styles.backArrow}
                              src={`${S3PROXY}/vendors/images/backArrow.png`}
                            ></img>
                            Messages
                          </span>
                        </article>
                        <div
                          className={styles.messageTab}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: "20px",
                          }}
                        >
                          <span
                            style={{
                              border: "1px solid #b6255a",
                              background: "#b6255a",
                              color: "white",
                            }}
                            onClick={() => router.push("/dashboard/Message")}
                          >
                            Chat
                          </span>
                          <span
                            onClick={() =>
                              router.push("/dashboard/Group-Message")
                            }
                          >
                            Group
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "3px 20px",
                          }}
                        >
                          <input
                            placeholder="Search Message"
                            variant="filled"
                            sx={{
                              // paddingRight: "5px",
                              borderColor: "white",
                              backgroundColor: "white",
                              border: "none",
                              // border: '1px solid #d43f7a',
                              color: "#d43f7a",
                              // borderRadius: "20px",
                              width: "80%",
                            }}
                            // margin="dense"
                            fullWidth
                            size="small"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  <IconButton></IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <span></span>
                        </div>
                        {/* <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', width: '60%' }}>
                        <Link
                          href={'/user-dashboard/Message'}
                          passHref
                        >
                          <div
                            style={{
                              display: 'flex',
                              gap: '20px',
                              width: '20%',
                            }}
                          >
                            <article
                              style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                // borderBottom: '3px solid pink',
                                paddingBottom: '5px',
                                fontSize: '18px',
                              }}
                            >
                              <div>
                                <PersonIcon
                                  sx={{ fontSize: '28px' }}
                                ></PersonIcon>
                              </div>
                            </article>
                          </div>
                        </Link>
                        <Link
                          href={'/user-dashboard/Group-Message'}
                          passHref
                        >
                          <div
                            style={{
                              display: 'flex',
                              gap: '20px',
                              width: '20%',
                            }}
                          >
                            <article
                              style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                paddingBottom: '5px',
                                fontSize: '18px',
                              }}
                            >
                              <div>
                                <GroupsIcon
                                  sx={{
                                    color: '#B4245D',
                                    fontSize: '28px',
                                  }}
                                ></GroupsIcon>
                              </div>
                            </article>
                          </div>
                        </Link>
                      </div>
                    </div> */}
                        <div
                          className={styles.monthlyandCatdiv1}
                          style={{ width: "100%", height: "100%" }}
                        >
                          <div
                            className={styles.listTable12}
                            style={{
                              borderRadius: "0PX",
                              borderRight: "none",
                              height: "100%",
                            }}
                          >
                            <SingleTodo
                              config={config}
                              update={update}
                              globleuser={globleuser}
                              setUpdate={setUpdate}
                              selected={selected}
                              setSelected={setSelected}
                              setALLmessages={setALLmessages}
                              setShowAllMessage={setShowAllMessage}
                              setModifiedMsgs={setModifiedMsgs}
                              uSERLIST={uSERLIST}
                              setPage={setPage}
                              setTotalPage={setTotalPage}
                            ></SingleTodo>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </>
    </Layout>
  );
};

export default Message;
