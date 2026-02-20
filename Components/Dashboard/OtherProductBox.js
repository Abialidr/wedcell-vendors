import React, { useEffect, useState } from "react";
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
import { Divider } from "@mui/material";
const OtherProductBox = ({ setCurrState, setproductId }) => {
  const globleuser = useSelector(selectUser);

  const router = useRouter();

  const [user, setUser] = useState(null);

  const [config, setConfig] = useState(null);
  const [oneDatadone, setOneDatadone] = useState(null);
  const [data, setData] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [productData, setProductData] = useState([]);
  console.log(
    "🚀 ~ file: OtherProductBox.js:26 ~ OtherProductBox ~ productData:",
    productData
  );
  const [eventData, setEventData] = useState([]);

  const FetchData = (user, con) => {
    axios
      .post(
        `${PROXY}/item/get`,
        {
          _id: user?.data?._id,
        },
        con
      )
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setOneDatadone(res?.data?.data[0]?.type);
        } else {
          setOneDatadone(null);
        }
      });
    // .catch((e) => alert('Someting went wrong: check your connection 1', e));
  };

  const FetchEventData = (conf) => {
    axios.get(`${PROXY}/event/getbyvendorid`, conf).then((res) => {
      if (res.data.success) {
        setEventData(res.data.data);
      } else {
      }
    });
    // .catch((e) => alert("Someting went wrong: check your connection 2", e));
  };

  const FetchProductData = (user, con) => {
    axios
      .post(
        `${PROXY}/product/get-other-products`,
        {
          _id: user?.data?._id,
        },
        con
      )
      .then((res) => {
        if (res.data.success) {
          setProductData(res.data.data);
          if (res.data.data.length) {
            setOneDatadone("Product");
          } else {
            if (!oneDatadone) {
              setOneDatadone(null);
            }
          }
        }
      })
      .catch((e) => {
        alert("Someting went wrong: check your connection 3", e);
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
      setConfig(config);
      if (oneDatadone !== "Product" || oneDatadone === null) {
        FetchData(globleuser, config);
        FetchEventData(config);
      }
      if (oneDatadone !== "Venue" || oneDatadone !== "Vendor") {
        FetchProductData(globleuser, config);
      }
    }
  }, [router]);

  const bulkDelete = async (files) => {
    try {
      for (const file of files) {
        await ImageDelete(file);
      }
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };
  const productDelete = (id, images) => {
    setDeleting(true);
    bulkDelete(images).then(() => {
      axios
        .delete(`${PROXY}/product/delete-other-products/${id}`, config)
        .then(() => {
          const filteredProducts = productData.filter(
            (item) => item._id !== id
          );
          setProductData(filteredProducts);
          setDeleting(false);
        })
        .catch((e) => {
          alert("Failed to delete");
          setDeleting(false);
        });
    });
  };

  const vendorDelete = (id, images) => {
    setDeleting(true);
    bulkDelete(images)
      .then((res1) => {
        axios
          .post(`${PROXY}/item/delete`, { _id: id }, config)
          .then((res) => {
            const filteredProducts = data.filter((item) => item._id !== id);
            setData(filteredProducts);
            setDeleting(false);
          })
          .catch((e) => {
            alert("Failed to delete");
            setDeleting(false);
          });
      })
      .catch((e) => {
        setDeleting(false);
      });
  };

  const submit = (id, images) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            productDelete(id, images);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const submit2 = (id, images) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            vendorDelete(id, images);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

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
    <div style={{ width: "95%" }}>
      <div className="cards-container mt-2">
        <div className="row gy-3 px-0 mt-2 ">
          <div className="col-md-12 ">
            {(oneDatadone !== "Venue" && oneDatadone !== "Vendor") ||
            oneDatadone === null ? (
              <div className="box-shadow bg-white venues-card py-3 px-4">
                <div className="venue-card-header d-flex align-items-center justify-content-between mb-5">
                  <h5 className="primary-text fw-bold">Products Listing</h5>
                  {/* <Link
                    href={{
                      pathname: user
                        ? `/dashboard/shop/${user.data._id}`
                        : "/dashboard",
                      query: { name: "add" },
                    }}
                  > */}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    <button
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#b72e5a",
                        color: "White",
                        border: "none",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setCurrState("AddShopItem");
                        setproductId("");
                      }}
                    >
                      + Add Product
                    </button>
                  </div>

                  {/* </Link> */}
                </div>
                <Divider />
                <div
                  style={{
                    height: "calc(100vh - 200px)",
                    overflow: "auto",
                  }}
                >
                  {productData &&
                    productData?.map((data, key) => {
                      return (
                        <div key={key} className="list-container mt-4">
                          <div className="list-item  mb-3">
                            <div className="list-item-title d-flex align-items-center justify-content-between">
                              <span className="fw-semi cursor-pointer">
                                {data.name} / {data.category}
                              </span>
                              {/* <Link
                              passHref
                              href={{
                                pathname: user
                                  ? `/dashboard/shop/${user.data._id}`
                                  : "/dashboard",
                                query: { name: "edit", id: data._id },
                              }}
                            > */}
                              <div className="list-item-title d-flex align-items-center justify-content-between">
                                <div
                                  className="primary-text "
                                  style={{
                                    cursor: "pointer",
                                    margin: 8,
                                  }}
                                >
                                  <button
                                    onClick={() => {
                                      setCurrState("AddShopItem");
                                      setproductId(data._id);
                                    }}
                                    style={{
                                      padding: "6px 20px",
                                      background: "#B6255A",
                                      border: "none",
                                      marginRight: "5px",
                                      fontSize: "12px",
                                      border: "0.5px solid #B6255A",
                                      color: "white",
                                    }}
                                    className="cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                </div>
                                {/* </Link> */}
                                <div
                                  onClick={() =>
                                    router.push(
                                      `/dashboard/reviews1/${data._id}?type=other-product`
                                    )
                                  }
                                  style={{
                                    marginRight: "3px",
                                  }}
                                >
                                  <button
                                    style={{
                                      padding: "6px",
                                      background: "none",
                                      border: "none",
                                      marginRight: "5px",
                                      fontSize: "12px",
                                      border: "0.5px solid #B6255A",
                                      color: "#B6255A",
                                    }}
                                    className="cursor-pointer"
                                  >
                                    View Review
                                  </button>
                                </div>
                                {deleting ? (
                                  <Spinner />
                                ) : (
                                  <div
                                    // onClick={() => {
                                    //   // setImages([]);
                                    //   // setForm({ ...form, images: [] });
                                    //   // productDelete(data._id, data.images);
                                    // }}
                                    onClick={() =>
                                      submit(data._id, data.images)
                                    }
                                    style={{
                                      marginBottom: "10px",
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
                            {/* <p className='text-gray'>
                            ₹ {data.price ? data.price : 'No Price available'}
                          </p> */}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProductBox;
