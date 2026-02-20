import React, { useState } from "react";
import Styles from "../../styles/reviews.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarRatings from "react-star-ratings";
import moment from "moment";
import axios from "axios";
import { PROXY, S3PROXY } from "../../config";
import { useRef } from "react";
import Reply from "./Reply";
const Reviews = ({ item, totalReview, setSubRev, main, handleButtonClick }) => {
  const [page, setPage] = useState(1);
  const [viewReview, setViewReview] = useState(false);
  const [isReply, setisReply] = useState(true);
  const [allReplies, setAllReplies] = useState([]);
  const [totalReplies, setTotalReplies] = useState();
  const handleViewMore = () => {};
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const handleViewReply = async (id) => {
    const res = await axios.post(`${PROXY}/rr/replies/all`, {
      page: page,
      reviewid: id,
    });
    setAllReplies([...allReplies, ...res.data.data]);
    setTotalReplies(res.data);
    setPage(page + 1);

    // setSubRev(Math.random);
    setViewReview(true);
  };
  const handleDeleteReply = async (id) => {
    const res = await axios.delete(`${PROXY}/rr/replies/${id}`);
    if (res.data.success) {
      window.location.reload();
    }
  };
  return (
    <>
      <div className={Styles.ReviewContainer}>
        <div className={Styles.ReviewUser}>
          <article>
            <AccountCircleIcon fontSize="large"></AccountCircleIcon>
            <h6>
              {item?.name}{" "}
              <span className={Styles.ReviewCountryDate}>
                {moment(item?.createdAt).format("DD-MM-YYYY")}
              </span>
            </h6>
          </article>
          <StarRatings
            rating={item?.rating}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension="17px"
            starSpacing="2px"
          />
        </div>
        <div className={Styles.ReviewStar}>
          <span>{item?.reviewTitle}</span>
        </div>
        <div className={Styles.ReviewSpan}>
          <span>{item?.reviewBody}</span>
        </div>
        <div
          className={Styles.qualitycontainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))",
            width: "100%",
            maxWidth: "calc(148px * 3)",
          }}
        >
          {item?.valueForMoney ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/profit.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Value For Money</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {item?.fabricQuality ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/fabric-pattern.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Fabric Quality</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {item?.colors ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/colour.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Colors</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {item?.clothStyle ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/tuxedo.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Style</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {item?.comfort ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/comfort-zone.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Comfort</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {item?.food ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/dish.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Food</span>
              </div>
            </div>
          ) : (
            <></>
          )}{" "}
          {item?.banquet ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/wedding.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Beautiful Banquet</span>
              </div>
            </div>
          ) : (
            <></>
          )}{" "}
          {item?.hospitality ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/hospitality.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Good Hospitality</span>
              </div>
            </div>
          ) : (
            <></>
          )}{" "}
          {item?.staff ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/teamwork.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Great Staff</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {item?.qualitywork ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/quality-service.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Quality Work</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {item?.professionalism ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/professional.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>Professionalism</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {item?.onTime ? (
            <div className={Styles.exclusivecontainer}>
              <div className={Styles.exclusive}>
                <img
                  className={Styles.rectangle}
                  src={
                    `${S3PROXY}/vendors/img/Rectangle 13.png`
                  }
                  alt=""
                />
                <img
                  className={Styles.star2}
                  src={
                    `${S3PROXY}/vendors/img/working-time.png`
                  }
                  alt=""
                />
                <span className={Styles.excluivespan}>On Time</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className={Styles.ReplyContainer}
          style={{
            display: viewReview ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          {allReplies?.map((items, index) => {
            return (
              <Reply
                items={items}
                item={item}
                handleButtonClick={handleButtonClick}
                handleDeleteReply={handleDeleteReply}
              />
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <span
            className={Styles.Viewbtn1}
            style={{
              display: isReply ? "flex" : "none",
              paddingLeft: viewReview ? "50px" : "",
              // width: "80px",
              marginRight: "10px",
            }}
            onClick={async (e) => {
              e.stopPropagation();
              if (!viewReview && page === 1) {
                setViewReview(true);
                handleViewReply(item?._id);
              } else {
                setViewReview(!viewReview);
              }
            }}
          >
            {viewReview ? "Hide Reply" : "View Reply"}
          </span>
          <span
            onClick={(e) => {
              handleViewReply(item?._id);
            }}
            className={Styles.Viewbtn}
            style={{
              display: "flex",
              paddingLeft: "0px",
            }}
          >
            {totalReplies?.remainingReplies && viewReview
              ? `${totalReplies?.remainingReplies} Remaning `
              : ""}
          </span>
        </div>
      </div>
    </>
  );
};

export default Reviews;
