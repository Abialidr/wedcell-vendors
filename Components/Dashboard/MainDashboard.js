import React, { useEffect, useState } from "react";
import Styles from "../../styles/Dashboard/Dashboard.module.css";
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
const MainDashboard = () => {
  const globleuser = useSelector(selectUser);

  const router = useRouter();

  const [user, setUser] = useState(null);

  const [deleting, setDeleting] = useState(false);
  const [eventData, setEventData] = useState([]);
  const FetchEventData = (conf) => {
    axios.get(`${PROXY}/event/getbyvendorid`, conf).then((res) => {
      if (res.data.success) {
        setEventData(res.data.data);
      } else {
      }
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
      FetchEventData(config);
    }

    if (
      !auth ||
      JSON.parse(role).role === "User" ||
      JSON.parse(role).role === "Students"
    ) {
      router.push("/");
    }
  }, [router]);

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
    <div style={{ width: "95%", paddingBottom: "50px" }}>
      <div
        className={`dashboard-header py-3 px-4 bg-white text-capitalize ${Styles.border_3}`}
      >
        <h3>Hi, {user ? user.data.name : ""}</h3>
        <span className="text-gray d-block ">
          Here’s what’s happening with your wedding venue business today.
        </span>
      </div>
      <div className="cards-container mt-4">
        <div className="row gy-3 px-0">
          <div className="col-md-4">
            <div className="box-shadow bg-white py-3 px-5">
              <span className="fs-1 fw-bold primary-text">1</span>
              <span className="text-gray d-block">Your Reviews</span>

              <Link href={"#"}>
                <a className="mt-5 text-center d-block">View All</a>
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box-shadow bg-white py-3 px-5">
              <span className="fs-1 fw-bold primary-text">1</span>
              <span className="text-gray d-block">Your Reviews</span>

              <Link href={"#"}>
                <a className="mt-5 text-center d-block">View All</a>
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box-shadow bg-white py-3 px-5">
              <span className="fs-1 fw-bold primary-text">1</span>
              <span className="text-gray d-block">Your Reviews</span>

              <Link href={"#"}>
                <a className="mt-5 text-center d-block">View All</a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="cards-container mt-4">
        <div className="row gy-3 px-0">
          <div className="col-md-12">
            <div className="row gy-3 px-0">
              <div
                className="box-shadow bg-white venues-card py-3 px-4"
                style={{
                  height: "20rem",
                  overflow: "auto",
                }}
              >
                <div className="venue-card-header d-flex align-items-center justify-content-between">
                  <h5 className="primary-text fw-bold">Events</h5>
                  <Link
                    href={{
                      pathname: user ? `/event` : "/dashboard",
                      query: { name: "add" },
                    }}
                  >
                    <span className="fs-3 cursor-pointer">+</span>
                  </Link>
                </div>

                {eventData &&
                  eventData?.map((data, key) => {
                    return (
                      <div key={key} className="list-container mt-4">
                        <div className="list-item  mb-3">
                          <div className="list-item-title d-flex align-items-center justify-content-between">
                            <Link
                              href={
                                data.type === "Vendor"
                                  ? `${data.type.toLowerCase()}s/${data._id}`
                                  : `/venue/${data._id}`
                              }
                            >
                              <span className="fw-semi cursor-pointer">
                                {data.required_member} /{" "}
                                {data.required_member_type} /{" "}
                                {data.required_member}
                              </span>
                            </Link>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Link
                                href={{
                                  pathname: user ? `/event` : "/dashboard",
                                  query: { name: "edit", id: data.id },
                                }}
                              >
                                <div
                                  className="primary-text cursor-pointer"
                                  style={{ margin: 8, marginLeft: 9 }}
                                >
                                  Edit
                                </div>
                              </Link>

                              {deleting ? (
                                <Spinner />
                              ) : (
                                <div
                                  onClick={() => {
                                    submit3(data);
                                  }}
                                  style={{
                                    fontSize: "20px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                >
                                  <RiDeleteBin6Line />
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-gray">
                            {data.venue ? data.venue : "No address available"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MainDashboard;
