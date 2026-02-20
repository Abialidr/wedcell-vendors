import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PROXY } from "../../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginRoute, selectUser } from "../../redux/reducer/appEssentials";
import { useRouter } from "next/router";
import styles from "../../styles/reviewCard.module.css";

const ReviewCard = ({ pid, type, oneReview, subRev, setSubRev, subType }) => {
  const globleuser = useSelector(selectUser);
  const [qualitities, setQualities] = useState({
    valueformoney: false,
    fabricquality: false,
    color: false,
    clothstyle: false,
    comfort: false,
    food: false,
    banquet: false,
    hospitality: false,
    staff: false,
    qualitywork: false,
    professionalism: false,
    onTime: false,
  });
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const router = useRouter();

  const [value, setValue] = React.useState(2);

  const [reviewValues, setreviewValues] = useState({
    reviewbody: oneReview?.reviewBody ? oneReview.reviewBody : "",
    reviewtitle: oneReview?.reviewTitle ? oneReview.reviewTitle : "",
    reviewstars: oneReview?.rating ? oneReview.rating : "",
  });

  useEffect(() => {
    if (oneReview) {
      setQualities({
        valueformoney: oneReview?.valueForMoney,
        fabricquality: oneReview?.fabricQuality,
        color: oneReview?.colors,
        clothstyle: oneReview?.clothStyle,
        comfort: oneReview?.comfort,
        food: oneReview?.food,
        banquet: oneReview?.banquet,
        hospitality: oneReview?.hospitality,
        staff: oneReview?.staff,
        qualitywork: oneReview?.qualitywork,
        professionalism: oneReview?.professionalism,
        onTime: oneReview?.onTime,
      });
      setreviewValues({
        reviewbody: oneReview.reviewBody,
        reviewtitle: oneReview.reviewTitle,
        reviewstars: oneReview.rating,
      });
    } else {
      setQualities({
        valueformoney: false,
        fabricquality: false,
        color: false,
        clothstyle: false,
        comfort: false,
        food: false,
        banquet: false,
        hospitality: false,
        staff: false,
        qualitywork: false,
        professionalism: false,
        onTime: false,
      });
      setreviewValues({
        reviewbody: "",
        reviewtitle: "",
        reviewstars: "",
      });
    }
  }, [oneReview, subRev]);

  const handleReviewSubmit = async () => {
    if (reviewValues.reviewbody || reviewValues.reviewtitle) {
      if (globleuser) {
        const config = {
          headers: {
            authorization: globleuser?.data?.token,
          },
        };
        const body = {
          userid: globleuser?.data?._id,
          productid: pid,
          reviewBody: reviewValues.reviewbody,
          reviewTitle: reviewValues.reviewtitle,
          rating: parseInt(
            reviewValues.reviewstars ? reviewValues.reviewstars : "2"
          ),
          type: type,
          name: globleuser?.data?.name,
          valueForMoney: qualitities.valueformoney,
          fabricQuality: qualitities.fabricquality,
          colors: qualitities.color,
          clothStyle: qualitities.clothstyle,
          comfort: qualitities.comfort,
          food: qualitities.food,
          banquet: qualitities.banquet,
          hospitality: qualitities.hospitality,
          staff: qualitities.staff,
          qualitywork: qualitities.qualitywork,
          professionalism: qualitities.professionalism,
          onTime: qualitities.onTime,
        };

        const result = await axios.post(`${PROXY}/rr/reviews`, body, config);
      } else {
        router.push(`/customer-login`);
        dispatch(
          loginRoute({ pathname: router.pathname, query: router.query })
        );
      }
    } else {
      alert("Fill Review Form Properly");
    }
  };
  return (
    <div style={{ width: "100%", marginTop: "10px" }}>
      <div className="bg-white py-3">
        <h4 className="fw-bold text-center">Write A Review</h4>

        <span className="d-block text-center">Select Rating</span>

        <div className="stars-container d-flex align-items-center my-3 justify-content-center">
          {/* <span className={`${Styles.rating_icon} me-2`}>
                        <AiFillStar />
                      </span>
                      <span className={`${Styles.rating_icon} me-2`}>
                        <AiFillStar />
                      </span>
                      <span className={`${Styles.rating_icon} me-2`}>
                        <AiFillStar />
                      </span>
                      <span className={`${Styles.rating_icon} me-2`}>
                        <AiFillStar />
                      </span>
                      <span className={`${Styles.rating_icon} `}>
                        <AiFillStar />
                      </span> */}
          <Rating
            size="large"
            name="simple-controlled"
            value={reviewValues.reviewstars}
            onChange={(event, newValue) => {
              setValue(newValue);
              setreviewValues({
                ...reviewValues,
                reviewstars: newValue,
              });
            }}
          />
        </div>

        <div
          className="row gy-8"
          style={{
            margin: "20px",
          }}
        >
          <div className="col-md-12">
            <div className="field-container mb-3">
              <input
                type="text"
                className="form-control py-3"
                placeholder="Title"
                value={reviewValues.reviewtitle}
                onChange={(e) => {
                  setreviewValues({
                    ...reviewValues,
                    reviewtitle: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="field-container mb-3">
            <textarea
              value={reviewValues.reviewbody}
              onChange={(e) => {
                setreviewValues({
                  ...reviewValues,
                  reviewbody: e.target.value,
                });
              }}
              name=""
              id=""
              cols="30"
              rows="5"
              className="form-control"
              placeholder="Write Review..."
            ></textarea>
          </div>
          {type === "product" ? (
            <div className={styles.stickerContainer}>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.valueformoney}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, valueformoney: true });
                    } else {
                      setQualities({ ...qualitities, valueformoney: false });
                    }
                  }}
                />
                <span>Value for Money</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.fabricquality}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, fabricquality: true });
                    } else {
                      setQualities({ ...qualitities, fabricquality: false });
                    }
                  }}
                />
                <span>Fabric Quality</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.color}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, color: true });
                    } else {
                      setQualities({ ...qualitities, color: false });
                    }
                  }}
                />
                <span>Color</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.comfort}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, comfort: true });
                    } else {
                      setQualities({ ...qualitities, comfort: false });
                    }
                  }}
                />
                <span>Comfort</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.clothstyle}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, clothstyle: true });
                    } else {
                      setQualities({ ...qualitities, clothstyle: false });
                    }
                  }}
                />
                <span>Style</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {subType === "Venue" ? (
            <div className={styles.stickerContainer}>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.valueformoney}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, valueformoney: true });
                    } else {
                      setQualities({ ...qualitities, valueformoney: false });
                    }
                  }}
                />
                <span>Value for Money</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.food}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, food: true });
                    } else {
                      setQualities({ ...qualitities, food: false });
                    }
                  }}
                />
                <span>Quality Food</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.banquet}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, banquet: true });
                    } else {
                      setQualities({ ...qualitities, banquet: false });
                    }
                  }}
                />
                <span>Beautiful Banquet</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.hospitality}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, hospitality: true });
                    } else {
                      setQualities({ ...qualitities, hospitality: false });
                    }
                  }}
                />
                <span>Good Hospitality</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.staff}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, staff: true });
                    } else {
                      setQualities({ ...qualitities, staff: false });
                    }
                  }}
                />
                <span>Great Staff</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {subType === "Vendor" ? (
            <div className={styles.stickerContainer}>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.valueformoney}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, valueformoney: true });
                    } else {
                      setQualities({ ...qualitities, valueformoney: false });
                    }
                  }}
                />
                <span>Value for Money</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.qualitywork}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, qualitywork: true });
                    } else {
                      setQualities({ ...qualitities, qualitywork: false });
                    }
                  }}
                />
                <span>Quality Work</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.professionalism}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, professionalism: true });
                    } else {
                      setQualities({ ...qualitities, professionalism: false });
                    }
                  }}
                />
                <span>Professionalism</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.onTime}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, onTime: true });
                    } else {
                      setQualities({ ...qualitities, onTime: false });
                    }
                  }}
                />
                <span>On Time</span>
              </div>
              <div className={styles.sticker}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={qualitities.staff}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setQualities({ ...qualitities, staff: true });
                    } else {
                      setQualities({ ...qualitities, staff: false });
                    }
                  }}
                />
                <span>Great Staff</span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {oneReview ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <button
                className="primary-btn mt-3mx-auto d-block"
                style={{
                  width: "45%",
                  backgroundColor: "#b6255a",
                  fontWeight: "500",
                }}
                onClick={async () => {
                  const body = {
                    reviewBody: reviewValues.reviewbody,
                    reviewTitle: reviewValues.reviewtitle,
                    rating: reviewValues.reviewstars,
                    valueForMoney: qualitities.valueformoney,
                    fabricQuality: qualitities.fabricquality,
                    colors: qualitities.color,
                    clothStyle: qualitities.clothstyle,
                    comfort: qualitities.comfort,
                    food: qualitities.food,
                    banquet: qualitities.banquet,
                    hospitality: qualitities.hospitality,
                    staff: qualitities.staff,
                    qualitywork: qualitities.qualitywork,
                    professionalism: qualitities.professionalism,
                    onTime: qualitities.onTime,
                    _id: oneReview._id,
                  };
                  const config = {
                    headers: {
                      authorization: globleuser?.data?.token,
                    },
                  };
                  const res = await axios.put(
                    `${PROXY}/rr/reviews`,
                    body,
                    config
                  );
                  setSubRev(Math.random());
                }}
              >
                Update
              </button>
              <button
                className="primary-btn mt-3mx-auto d-block"
                style={{
                  width: "45%",
                  backgroundColor: "#fff",
                  color: "#b6255a",
                  fontWeight: "500",
                  border: "1px solid #b6255a",
                }}
                onClick={async () => {
                  const config = {
                    headers: {
                      authorization: globleuser?.data?.token,
                    },
                  };
                  const res = await axios.delete(
                    `${PROXY}/rr/reviews/${oneReview._id}`,
                    config
                  );
                  setSubRev(Math.random());
                }}
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleReviewSubmit();
                setSubRev(Math.random());
              }}
              className="primary-btn mt-3 w-100 mx-auto d-block"
              style={{
                backgroundColor: "#b6255a",
                fontWeight: "500",
              }}
            >
              Submit Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
