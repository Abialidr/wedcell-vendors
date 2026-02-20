import * as React from "react";
import Header from "../../../Components/Dashboard/Header";
import Styles from "../../../styles/viewallreview.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import Sidebar from "../../../Components/Dashboard/Sidebar";

import { useRouter } from "next/router";
import axios from "axios";
import { PROXY, S3PROXY } from "../../../config";

import Reviews from "../../../Components/writeReviewCard/Reviews";
import moment from "moment";
import Layout from "../../../Components/Dashboard/layout";

const PopupWindow = ({
  onClose,
  oneReview,
  setReplyValues,
  replyValues,
  setShowPopup,
  oneReply,
  UpdateReply,
}) => {
  return (
    <div className={Styles.popupcontainer}>
      <div className={Styles.popupcontent}>
        <div className="bg-white">
          <h4 className="fw-bold text-center">Write A Reply</h4>
          <div className={Styles.ReviewContainer} style={{ padding: "20px" }}>
            <AccountCircleIcon fontSize="large"></AccountCircleIcon>
            <div className={Styles.ReviewUser}>
              <h6>{oneReview?.name}</h6>
              <span className={Styles.ReviewCountryDate}>
                {moment(oneReview?.createdAt).format("DD-MM-YYYY")}
              </span>
              <div className={Styles.ReviewSpan}>
                <span>{oneReview?.reviewBody}</span>
              </div>
            </div>
          </div>

          <div
            className="row gy-8"
            style={{
              margin: "10px",
            }}
          >
            <div className="field-container mb-3">
              <textarea
                value={replyValues.replyBody}
                onChange={(e) => {
                  setReplyValues({
                    ...replyValues,
                    replyBody: e.target.value,
                  });
                }}
                name=""
                id=""
                cols="30"
                rows="5"
                className="form-control"
                placeholder="Write Reply..."
              ></textarea>
            </div>

            <button
              onClick={UpdateReply}
              className="primary-btn mb-3 mx-auto d-block"
              style={{
                fontFamily: "Poppins",
                border: "1px solid #b6255a",
                fontWeight: "500",
                fontSize: "16px",
                width: "fit-content",
                padding: "8px 30px",
                borderRadius: "40px",
                color: "#b6255a",
                background: "white",
              }}
            >
              Submit Reply
            </button>
          </div>
        </div>
        <button className={Styles.popupClosebtn} onClick={onClose}>
          <img src={`${S3PROXY}/vendors/assets/images/close.png`} alt="" />
        </button>
      </div>
    </div>
  );
};
function createData(name, rating, comment, replies, _id) {
  return {
    name,
    rating,
    comment,
    replies,
    _id,
  };
}

const Reviews1 = () => {
  const [detailData, setDetailData] = useState();
  const [detailDatavar, setDetailDatavar] = useState();
  const [exclusive, setExclusive] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [config, setConfig] = useState(null);
  const [rows, setRows] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [newReply, setNewReply] = useState("");
  const [addId, setAddId] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [reviewData, setReviewData] = useState([]);
  const [totalReview, setTotalReview] = useState();
  const [subRev, setSubRev] = useState();
  const router = useRouter();
  const { id } = router.query;
  const type = router.query.type;
  const [replyValues, setReplyValues] = useState({
    replyBody: "",
  });
  const getreviewData = async () => {
    const conditions = {};
    conditions.productid = id;
    conditions.userid = "";
    conditions.page = page;
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    const result = await axios.post(`${PROXY}/rr/reviews/all`, conditions);
    setReviewData([...reviewData, ...result.data.data]);
    setTotalReview(result.data);
  };
  const getData = async () => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    let res;
    if (type === "product") {
      res = await axios.post(
        `${PROXY}/product/getoneproduct`,
        {
          _id: id,
        },
        config
      );
    } else if (type === "other-product") {
      res = await axios.post(
        `${PROXY}/product/get-one-other-products`,
        {
          _id: id,
        },
        config
      );
    } else if (type === "Venue") {
      res = await axios.post(`${PROXY}/venueuser/getAll`, {
        _id: id,
      });
    } else if (type === "Vendor") {
      res = await axios.post(`${PROXY}/vendoruser/getAll`, {
        _id: id,
      });
    }
    setDetailData(res?.data?.data[0]);
    if (res?.data?.data?.variants) {
      setDetailDatavar(res?.data?.data?.variants[0]);
    }
  };
  useEffect(() => {
    getreviewData();
  }, [page]);
  useEffect(() => {
    getData();
  }, [id, subRev]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("wedcell") !== null) {
      const user = JSON.parse(localStorage.getItem("wedcell")).data;

      setUser(user);
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell")).data.token,
          vendorId: user._id,
        },
      };
      setConfig(config);
    } else {
      router.push("/vendor-login");
    }
  }, [router]);

  useEffect(() => {
    if (!!user && !!config.headers.authorization) {
      axios
        .get(
          `${PROXY}/reviews/getForVendor`,

          config
        )
        .then(async (res) => {
          let data = [];

          const resData = res.data.data;
          for (const item of resData) {
            let replies = [];
            for (const reply of item.replies) {
              replies.push({
                name: reply.name,
                reply: reply.reply,
                reply_id: reply._id,
              });
            }
            data.push(
              createData(
                item.review.name,
                item.review.rating,
                item.review.comment,
                replies,
                item._id
              )
            );
          }
          setRows(data);
        })
        .catch((e) => {
          console.error("e: ", e.message);
        });
    }
  }, [config, user, count]);
  const [showPopup, setShowPopup] = useState(false);
  const [oneReview, setOneReview] = useState();
  const [oneReply, setOneReply] = useState();
  const handleViewMore = (e) => {
    setPage(page + 1);
  };
  const handleButtonClick = (pid, uid, rid, setIsOpen) => {
    if (rid) {
      const getOnereply = async () => {
        const resu = await axios.get(`${PROXY}/rr/replies/${rid}`);
        setOneReply(resu.data.data);
        setReplyValues({ ...replyValues, replyBody: resu.data.data.replyBody });
        setIsOpen(false);
      };
      getOnereply();
    }
    const getOneReview = async () => {
      const res = await axios.post(`${PROXY}/rr/reviews/one`, {
        userid: uid,
        productid: pid,
      });
      setOneReview(res.data.data[0]);
    };

    getOneReview();
    setShowPopup(true);
  };

  const UpdateReply = async () => {
    if (replyValues.replyBody) {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      };
      if (oneReply) {
        const body = {
          replyBody: replyValues.replyBody,
          _id: oneReply._id,
        };
        const result = await axios.put(`${PROXY}/rr/replies`, body, config);
        setOneReply(null);
      } else {
        const body = {
          userid: JSON.parse(localStorage.getItem("wedcell"))?.data?._id,
          reviewid: oneReview?._id,
          replyBody: replyValues.replyBody,
          name: JSON.parse(localStorage.getItem("wedcell"))?.data?.name,
          profilePic: "",
        };
        const result = await axios.post(`${PROXY}/rr/replies`, body, config);
      }
      setShowPopup(false);
      window.location.reload();
    } else {
      alert("Write Some Reply");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Layout>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          // padding: "50px",
          background: "#ffffff",
        }}
      >
        {showPopup && (
          <PopupWindow
            onClose={handleClosePopup}
            oneReview={oneReview}
            setReplyValues={setReplyValues}
            replyValues={replyValues}
            setShowPopup={setShowPopup}
            oneReply={oneReply}
            UpdateReply={UpdateReply}
          />
        )}
        <div className={Styles.RevCard}>
          {type !== "product" ? (
            <div className={Styles.DetailCard}>
              <div className={Styles.ImgContainer}>
                {}
                <img src={`${S3PROXY}${detailData?.mainImage}`} alt="" />
                {detailData?.popular ? (
                  <div className={Styles.exclusive2}>
                    <img src={`${S3PROXY}/vendors/img/exclusive.png`} alt="" />
                    <span className={Styles.excluivespan}>Exclusive</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className={Styles.WrittenDetail}>
                <h4>
                  {type === "Vendor"
                    ? detailData?.name
                    : detailData?.company_name}
                </h4>
                {detailData?.popular ? (
                  <div className={Styles.exclusive1}>
                    <img
                      src={`${S3PROXY}/vendors/img/exclusive.png`}
                      // className={styles.rectangle1}
                      alt=""
                    />
                    <span className={Styles.excluivespan}>Exclusive</span>
                  </div>
                ) : (
                  <></>
                )}
                <p
                  className={Styles.instock}
                  style={{ display: "flex", gap: "5px" }}
                >
                  Category : <hgroup>{detailData?.category}</hgroup>
                </p>
                <p className={Styles.instock}>
                  Description : <span>{detailData?.description}</span>
                </p>
                <p style={{ display: "flex", gap: "5px" }}>
                  Price : <hgroup>₹{detailData?.price}</hgroup>
                  <span>/Per Night</span>
                </p>
                {/* <div className={Styles.Cats}>
                    <p className={Styles.Heads}>Size :</p>
                    <p className={Styles.Values}>
                      {" "}
                      S, L
                      {item?.product?.size.map((items, key) => {
                  if (item?.product?.size?.length - 1 === key) {
                    return <span>{`${items}`}</span>;
                  } else {
                    return <span>{`${items}, `}</span>;
                  }
                })}
                    </p>
                  </div> */}
              </div>
            </div>
          ) : (
            <div className={Styles.DetailCard}>
              <div className={Styles.ImgContainer}>
                {}
                <img src={`${S3PROXY}${detailData?.mainImage}`} alt="" />
              </div>
              <div className={Styles.WrittenDetail}>
                <h4>
                  {type === "Vendor"
                    ? detailData?.name
                    : detailData?.company_name}
                </h4>
                {detailData?.popular ? (
                  <div className={Styles.exclusive1}>
                    <img src={`${S3PROXY}/vendors/img/exclusive.png`} alt="" />
                    <span className={Styles.excluivespan}>Exclusive</span>
                  </div>
                ) : (
                  <></>
                )}
                <p
                  className={Styles.instock}
                  style={{ display: "flex", gap: "5px" }}
                >
                  Category : <hgroup>{detailData?.category}</hgroup>
                </p>
                <p className={Styles.instock}>
                  Description : <span>{detailData?.description}</span>
                </p>
              </div>
            </div>
          )}
          <div className={Styles.ReviewCard}>
            <div className={Styles.ReviewContainer}>
              {reviewData?.map((item) => {
                return (
                  <article>
                    <Reviews
                      setSubRev={setSubRev}
                      handleButtonClick={handleButtonClick}
                      item={item}
                      main={true}
                      totalReview={totalReview}
                    ></Reviews>
                    <span
                      onClick={() =>
                        handleButtonClick(item?.productid, item?.userid)
                      }
                      className={Styles.Viewbtn1}
                      // onClick={() => setViewReview(!viewReview)}
                    >
                      Add Reply
                    </span>
                  </article>
                );
              })}
              <span
                onClick={(e) => {
                  handleViewMore();
                }}
                className={Styles.Viewbtn}
                style={{
                  display: "flex",
                  paddingLeft: "0px",
                }}
              >
                {totalReview?.remainingReviews
                  ? `${totalReview?.remainingReviews} Remaning `
                  : ""}
              </span>
            </div>
          </div>
        </div>

        {/* <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Reply</DialogTitle>
            <DialogContent>
              <DialogContentText>Add your reply here</DialogContentText>
              <TextField
                sx={{ width: 400 }}
                autoFocus
                margin="dense"
                multiline
                id="reply"
                label=""
                type="text"
                fullWidth
                variant="standard"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={AddReply}>Add</Button>
            </DialogActions>
          </Dialog>

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="right">Comment&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows.map((row, key) => (
                    <Row
                      key={key}
                      row={row}
                      openDialogue={handleClickOpen}
                      setAddId={setAddId}
                      DeleteReply={DeleteReply}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer> */}
        {/* 
                    <div className="review-cards-container mb-5">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="bg-white py-4 px-5">
                                    <h5 className="title">
                                        Average Ratings
                                    </h5>
                                    <div className="rating">
                                        <span className="fs-2 fw-bold">0</span>
                                        <span className="text-warning fs-1 ms-1">
                                            <AiFillStar />
                                        </span>
                                        <span className="text-gray d-block mt-2">
                                            0 average based on 0 ratings.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="bg-white py-4 px-5">
                                    <div className="header mb-3">
                                        <h5 className="title fw-bold">
                                            Reviews
                                        </h5>
                                    </div>
                                    <div className="row mx-0 gy-4">
                                        <div className="col-3 ">
                                            <div className="rating-title ps-0 ms-0">
                                            <span>Quality Service</span>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="progress">
                                                <div className="progress-bar bg-warning" role="progressbar" style={{width: "75%"}} aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-3 ">
                                            <div className="rating-title ps-0 ms-0">
                                            <span>Facilities</span>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="progress">
                                                <div className="progress-bar bg-warning" role="progressbar" style={{width: "45%"}} aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-3 ">
                                            <div className="rating-title ps-0 ms-0">
                                            <span>Staff</span>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="progress">
                                                <div className="progress-bar bg-warning" role="progressbar" style={{width: "55%"}} aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-3 ">
                                            <div className="rating-title ps-0 ms-0">
                                            <span>Flexibility</span>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="progress">
                                                <div className="progress-bar bg-warning" role="progressbar" style={{width: "25%"}} aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="col-3 ">
                                            <div className="rating-title ps-0 ms-0">
                                            <span>Value Of Money</span>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="progress">
                                                <div className="progress-bar bg-warning" role="progressbar" style={{width: "25%"}} aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="table-container bg-white py-3 px-4">
                        <table className="table ">
                            <thead>
                                <td>Name</td>
                                <td>Rating</td>
                                <td>Email</td>
                                <td>Date</td>
                                <td>Action</td>
                            </thead>
                        </table>
                    </div> */}
      </div>
    </Layout>
  );
};

export default Reviews1;

//     </div>
//   </div>
// ) : (
//   <div className={Styles.DetailCard}>
//     <div className={Styles.ImgContainer}>
//       <img src={detailData?.images[0]} alt="" />
//     </div>
//     <div className={Styles.WrittenDetail}>
//       <h4>{detailData?.productName}</h4>
//       {detailData?.popular ? (
//         <div className={Styles.exclusive1}>
//           <img src={{`${S3PROXY}/vendors/img/Rectangle 13.png"} alt="`} />
//           <img className={Styles.star2} src={{`${S3PROXY}/vendors/img/Star 2.png"} alt="`} />
//           <span className={Styles.excluivespan}>Exclusive</span>
//         </div>
//       ) : (
//         <></>
//       )}
//       <p className={Styles.instock}>Category : {detailData?.category}</p>
//       <p className={Styles.instock}>Description : {detailData?.descrition}</p>
//       <p className={Styles.instock}>Quantity : {detailData?.quantity}</p>
//       <h6 style={{ fontSize: "16px" }}>Price: ₹{detailData?.productPrice}</h6>
//       <div className={Styles.Cats}>
//         <p className={Styles.Heads}>Size :</p>
//         <p className={Styles.Values}>
//           {detailData?.size.map((items, key) => {
//             if (detailData?.size?.length - 1 === key) {
//               return <span>{`${items}`}</span>;
//             } else {
//               return <span>{`${items}, `}</span>;
//             }
//           })}
//         </p>
//       </div>
//     </div>
//   </div>
// )}

// <div className={Styles.ReviewCard}>
//   <div className={Styles.ReviewContainer}>
//     <div className={Styles.ReviewUser}>
//       <AccountCircleIcon fontSize="large"></AccountCircleIcon>
//       <h6>Name</h6>
//     </div>
//     <div className={Styles.ReviewStar}>
//       <StarRatings
//         rating={4.3}
//         starRatedColor="gold"
//         numberOfStars={5}
//         name="rating"
//         starDimension="17px"
//         starSpacing="2px"
//       />
//     </div>
//     <span className={Styles.ReviewCountryDate}>Reviwed on date</span>
//     <div className={Styles.ReviewSpan}>
//       <span>
//         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
//         error voluptatum sed asperiores quis consectetur illo deleniti fugit
//         autem saepe!
//       </span>
//     </div>
//     {/* <div
//             className={Styles.ReplyContainer}
//             style={{
//               display: viewReview ? "flex" : "none",
//               flexDirection: "column",
//             }}
//           >
//             <div className={Styles.ReviewUser}>
//               <AccountCircleIcon fontSize="medium"></AccountCircleIcon>
//               <h6>Name</h6>
//             </div>
//             <span className={Styles.ReviewCountryDate}>Reply on date</span>
//             <div className={Styles.ReviewSpan}>
//               <span>
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
//                 doloremque iusto blanditiis amet, odit culpa modi explicabo.
//                 Dicta, inventore officiis!
//               </span>
//             </div>
//           </div> */}
//     <div className={Styles.btndiv}>
//       <span
//         className={Styles.Viewbtn}
//         // onClick={() => setViewReview(!viewReview)}
//       >
//         View Reply
//       </span>

//     </div>
//   </div>
// </div>
// </div>; */}
