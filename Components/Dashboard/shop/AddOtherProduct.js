import { PlusOutlined } from "@ant-design/icons";
import { Modal as AntdModal, Upload } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PROXY, S3PROXY } from "../../../config";
import Styles from "../../../styles/Editlist.module.css";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducer/appEssentials";
import compressAndAppendFiles from "../../compressAndAppendFiles";
import { TextField } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
const uploadButton = (
  <div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </div>
);
function AddOtherProduct({ setCurrState, productId }) {
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  const [fileListmain, setFileListmain] = useState({
    images: [],
    videos: [],
    main: [],
  });
  const [form, setForm] = useState({
    vidLinks: [""],
    plans: [
      {
        name: "",
        value: "",
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);
  const id = productId ? productId : "";
  const [status, setStatus] = useState(productId ? "Edit" : "Submit");
  const [config, setConfig] = useState();

  const handleChangeImages = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.type.includes("image/")) {
        const newFile = fileListmain;
        newFile.images = newFileList;
        setFileListmain({ ...newFile });
      } else {
        return alert("Something Went Wrong");
      }
    } else {
      const data = newFileList
        .filter((data) => data?.url)
        .map((data) => data?.url);

      const newFile = fileListmain;
      newFile.images = newFileList;
      setFileListmain({ ...newFile });
    }
  };
  const handleChangeVideos = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.type.includes("video/")) {
        const newFile = fileListmain;
        newFile.videos = newFileList;
        setFileListmain({ ...newFile });
      } else {
        alert("Something Went Wrong");
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);

      const newFile = fileListmain;
      newFile.videos = newFileList;
      setFileListmain({ ...newFile });
    }
  };
  const onChangemain = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.type.includes("image/")) {
        const newFile = fileListmain;
        newFile.main = newFileList;
        setFileListmain({ ...newFile });
      } else {
        alert("Something Went Wrong");
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);

      const newFile = fileListmain;
      newFile.main = newFileList;
      setFileListmain({ ...newFile });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("wedcell") !== null) {
      const config = {
        headers: {
          authorization: globleuser?.data?.token,
        },
      };
      setConfig(config);
      setForm({
        ...form,
        vendorId: globleuser?.data._id,
        vendorDetails: globleuser?.data,
      });
    }
  }, []);

  const setDefaultImages = (url, uid) => {
    return {
      uid,
      status: "done",
      url: `${S3PROXY}${url}`,
    };
  };

  useEffect(() => {
    setIsLoading(true);
    if (id && config) {
      (async () => {
        await axios
          .post(
            `${PROXY}/product/get-one-other-products`,
            {
              _id: id,
            },
            config
          )
          .then((res) => {
            if (res.data.success) {
              // updateForm({ form: resData });
              setForm({
                ...res.data.data.product,
                vidLinks: JSON.parse(
                  JSON.stringify(res.data.data.product?.vidLinks)
                ),
              });

              setFileListmain({
                main: [setDefaultImages(res.data.data.product.mainImages)],
                images: res.data.data.product.images.map((images) =>
                  setDefaultImages(images)
                ),
                videos: res.data.data.product.videos.map((videos) =>
                  setDefaultImages(videos)
                ),
              });
              setIsLoading(false);

              // if (resData.images?.length) {
              //   const data = resData?.images?.map((url, uid) => {
              //     return setDefaultImages(url, uid);
              //   });
              //   setImages(data);
              //   setImagesLink(setDefaultImages1(data));
              // }
            }
          })
          .catch((e) => {
            alert(e.message);
            setIsLoading(false);
          });
      })();
    } else {
      setIsLoading(false);
    }
  }, [router, config, id]);

  const addHandler = async () => {
    setStatus("Loading...");
    const formdata = new FormData();
    form.category = globleuser.data.categories;
    form.city = globleuser.data.warehouse_address[0].city;

    await Promise.all(
      fileListmain.images
        .filter((data) => data.originFileObj)
        .map(async (images) => {
          // const img = await compressFileSingle(images.originFileObj);
          // formdata.append(`album${key}`, img);
          await compressAndAppendFiles([images], formdata, `album`);
        })
    );
    await Promise.all(
      fileListmain.main
        .filter((data) => data.originFileObj)
        .map(async (main, key) => {
          // const img = await compressFileSingle(main.originFileObj);
          // formdata.append(`main${key}`, img);
          await compressAndAppendFiles([main], formdata, `main`);
        })
    );
    fileListmain.videos
      .filter((data) => data.originFileObj)
      .forEach((videos, key) => formdata.append(`video`, videos.originFileObj));

    if (id) {
      const images = fileListmain.images
        .filter((data) => data.url)
        .map((data) => data.url);
      const videos = fileListmain.videos
        .filter((data) => data.url)
        .map((data) => data.url);
      const mainImages = fileListmain.main.find((data) => data.url);
      form.images = images;
      form.videos = videos;
      form.mainImages = mainImages?.url;
      form._id = productId;
      console.log(
        "🚀 ~ file: AddOtherProduct.js:245 ~ addHandler ~ form:",
        form
      );
      formdata.append("ProductData", JSON.stringify(form));

      axios
        .post(`${PROXY}/product/update-other-products`, formdata, config)
        .then((res) => {
          if (res.data.success) {
            setStatus("All Done");
            setCurrState("Listing");
          } else {
            setStatus("Edit");
            alert("Something went wrong");
          }
        })
        .catch((e) => console.error(e));
    } else {
      formdata.append("ProductData", JSON.stringify(form));

      axios
        .post(`${PROXY}/product/create-other-products`, formdata, config)
        .then((res) => {
          if (res.data.success) {
            setStatus("All Done");
            setCurrState("Listing");
          } else {
            setStatus("Submit");
            alert("Something went wrong");
          }
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <div
      className="bg-white py-2"
      style={{
        width: "95%",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "10px 30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 className="">{id ? "Edit" : "Add"} Shop Items</h1>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#b72e5a",
            color: "White",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={() => {
            setCurrState("Listing");
          }}
        >
          Go Back
        </button>
      </div>
      {isLoading || !form ? (
        <Spinner />
      ) : (
        <div className={Styles.form_container}>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Product Name</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                  type="text"
                  value={form.name}
                  placeholder="Product Name"
                  className={Styles.phone_tag}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              Included Items
              <span
                className={Styles.plus}
                onClick={() => {
                  const newArr = { name: "", value: "" };
                  const dummy = form;
                  dummy.plans.push(newArr);
                  setForm({ ...dummy });
                }}
              >
                +
              </span>
            </span>
            <div className="row mb-2">
              {form?.plans?.map((data, key) => (
                <div className="row mt-2" key={key}>
                  <div className="col-8">
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        const dummy = form;
                        dummy.plans[key].name = e.target.value;
                        setForm({ ...dummy });
                      }}
                      type="text"
                      value={data.name}
                      label="Product name"
                    />
                  </div>
                  <div className="col-3">
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        const dummy = form;
                        dummy.plans[key].value = e.target.value;
                        setForm({ ...dummy });
                      }}
                      value={data.value}
                      type="text"
                      label="Qauntity"
                    />
                  </div>
                  <div className="col-1" style={{ marginTop: 30 }}>
                    <span
                      onClick={() => {
                        const dummy = form;
                        dummy.plans.splice(key, 1);
                        setForm({ ...dummy });
                      }}
                      className="fs-5 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <label className={Styles.label}>Price</label>
              <br></br>
              <div className={Styles.category_section}>
                <input
                  onChange={(e) => {
                    setForm({ ...form, price: e.target.value });
                  }}
                  value={form.price}
                  type="number"
                  placeholder="Price"
                  className={Styles.phone_tag}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Description</label>
                <br></br>
                <textarea
                  onChange={(e) => {
                    setForm({ ...form, descrition: e.target.value });
                  }}
                  type="text"
                  value={form.descrition}
                  placeholder="Description"
                  className={Styles.phone_tag}
                ></textarea>
              </div>
            </div>
          </div>
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "20px",
              }}
              className={Styles.label}
            >
              Video Links
              <span
                onClick={() => {
                  const newArr = "";
                  const dummy = form;
                  dummy.vidLinks.push(newArr);
                  setForm({ ...dummy });
                }}
                className={Styles.plus}
              >
                +
              </span>
            </span>
            <div className="row">
              <div className="col-12 ">
                <div className={Styles.category_section}>
                  <br></br>
                  {form?.vidLinks.map((data, key) => (
                    <div className="row mb-3" key={key}>
                      <div className="col-11">
                        <TextField
                          fullWidth
                          key={key}
                          onChange={(e) => {
                            const dummy = form;
                            dummy.vidLinks[key] = e.target.value;
                            setForm({ ...dummy });
                          }}
                          value={data}
                          type="text"
                          placeholder="https://youtu.be/dOKQeqGNJwY"
                        />
                      </div>
                      <div className="col-1" style={{ marginTop: 10 }}>
                        <span
                          onClick={() => {
                            const dummy = form;
                            dummy.vidLinks.splice(key, 1);
                            setForm({ ...dummy });
                          }}
                          className="fs-5 cursor-pointer"
                        >
                          <RiDeleteBin6Line />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className={Styles.category_section}>
              <label className={Styles.label}>Upload Banner Images</label>
              <br></br>
              <ImgCrop rotationSlider aspect={1 / 1}>
                <Upload
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileListmain.main}
                  onChange={(e) => onChangemain(e)}
                  // onPreview={onPreview}
                >
                  {fileListmain.main?.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className={Styles.category_section}>
              <label className={Styles.label}>Upload Images</label>
              <br></br>
              <Upload
                accept=".jpg, .png, .svg"
                multiple
                listType="picture-card"
                fileList={fileListmain.images}
                onChange={(e) => handleChangeImages(e)}
              >
                {uploadButton}
              </Upload>
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className={Styles.category_section}>
              <label className={Styles.label}>Upload Videos</label>
              <br></br>
              <Upload
                accept=".mp4"
                multiple
                listType="picture-card"
                fileList={fileListmain.videos}
                onChange={(e) => handleChangeVideos(e)}
              >
                {uploadButton}
              </Upload>
            </div>
          </div>
          <div className="d-block mt-3">
            <button
              onClick={addHandler}
              className={` primary-btn`}
              disabled={false}
            >
              {status}
            </button>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
export default AddOtherProduct;
