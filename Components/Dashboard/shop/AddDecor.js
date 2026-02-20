import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROXY } from "../../../config";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import { selectUser, user } from "../../../redux/reducer/appEssentials";
import Styles from "../../../styles/Editlist.module.css";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import compressAndAppendFiles from "../../compressAndAppendFiles";
import Steps from "../../Steps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "../../../constants";
const uploadButton = (
  <div className={Styles.upload}>
    <FileUploadOutlinedIcon />
    <div>Upload</div>
  </div>
);
const AddDecor = ({ setCurrState }) => {
  const dispatch = useDispatch();
  const globleuser = useSelector(selectUser);
  let [fileListMain, setFileListMain] = useState([]);
  const [fileListAlbum, setFileListAlbum] = useState([
    { name: "Gate", value: [] },
    { name: "Stage", value: [] },
    { name: "Mandap", value: [] },
    { name: "Center table", value: [] },
    { name: "Center pieces", value: [] },
    { name: "Table cloth", value: [] },
    { name: "Chair bow", value: [] },
    { name: "Entrance props", value: [] },
    { name: "Jaimala", value: [] },
    { name: "Milni ke har", value: [] },
    { name: "Phonlo ki chadar", value: [] },
    { name: "Welcome board", value: [] },
    { name: "Photobooth", value: [] },
  ]);
  const [albumImageDefault, setAlbumdefault] = useState([]);
  const [fileListBrochure, setFileListBrochure] = useState([]);
  const [fileListGallery, setFileListGallery] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    termsandconditions:
      "'Booking Policy\n•    Pay 30% of the package price to book the package,\n•    Pay 50% amount before 15days of event \n•    Rest to be paid on the day of the event\n\nCancellation Policy\n•    This booking is non-cancellable. However the booking can be moved to another date at no extra charge.\n•    Advanced can be adjustable in future event if you plan any event with us\n \nTerms\n•    Transportation charges: No transportation charges apply within city. If the event is outside city, Travel & Stay charges shall be borne by the client. \n\n•    After booking confirmation, if you wish to change/alter your booked services in any way (e.g. your chosen event dates or location), we will do our utmost to accommodate these changes but it may not always be possible. Any request for changes must be in writing from the person who made the booking. All costs incurred due to amendments will be borne by you.'",
    plans: [{ name: "", value: "" }],
    vidLinks: [""],
  });

  const errorr = () => {
    alert("error");
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChangeMain = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 50000000000000) {
        setFileListMain(newFileList);
      } else {
        errorr();
      }
    } else {
      setFileListMain(newFileList);
      setMainImagedefault(null);
    }
  };
  const handleChangeAlbum = ({ fileList: newFileList, file }, key) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 50000000000000) {
        fileListAlbum[key].value = newFileList;
        setFileListAlbum([...fileListAlbum]);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      fileListAlbum[key].value = newFileList;
      setFileListAlbum([...fileListAlbum]);
      albumImageDefault[key].value = data;
      setAlbumdefault([...albumImageDefault]);
    }
  };

  const onChangeAlbumHandler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].name = e.target.value;
    setFileListAlbum(newArr);
  };

  const addHandler = async () => {
    const fileListAlbum1 = fileListAlbum.map((data) => {
      return {
        name: data.name,
        value: data.value.map((data, key) => key),
      };
    });

    const formData = new FormData();

    setIsLoading(true);

    form.name && formData.append("name", form.name);
    formData.append("vendorId", JSON.stringify(globleuser.data));
    formData.append("vendor_id", globleuser.data._id);
    form.category && formData.append("category", form.category);

    form.description && formData.append("description", form.description);
    formData.append("city", globleuser?.data?.city);
    // form.zipcode && formData.append("zipcode", form.zipcode);
    form.price &&
      formData.append(
        "price",
        /^\d+$/.test(form.price) ? parseInt(form.price) : 0
      );

    form.termsandconditions &&
      formData.append("termsandconditions", form.termsandconditions);

    form.plans && formData.append("plans", JSON.stringify(form.plans));
    form.vidLinks && formData.append("vidLinks", JSON.stringify(form.vidLinks));
    fileListAlbum && formData.append("album", JSON.stringify(fileListAlbum1));

    if (fileListAlbum) {
      await Promise.all(
        fileListAlbum.map(async (item, key) => {
          await compressAndAppendFiles(item.value, formData, `album${key}`);
        })
      );
    }
    await compressAndAppendFiles(fileListGallery, formData, "gallery");
    await compressAndAppendFiles(fileListMain, formData, "main");
    await compressAndAppendFiles(fileListBrochure, formData, "brochure");

    axios
      .post(`${PROXY}/decor/create`, formData)
      .then((res) => {
        alert("Create Successful");
        setCurrState("Listing");
      })
      .catch((e) => {
        console.log(`🚀 ~ //.then ~ e:`, e);
        alert(e?.response?.data?.message);
        setIsLoading(false);
      });
  };

  const [currStep, setCurrentStep] = useState(1);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: "20px",
          borderRadius: "10px",
          height: "fit-content",
          maxHeight: "100vh",
          overflow: "scroll",
          zIndex: "-1",
          paddingBottom: "10px",
          display: "block",
        }}
      >
        <div className="bg-white py-2 w-100">
          <div
            style={{ alignItems: "center", gap: "15px" }}
            className="form-title d-flex flex-column align-item-center"
          >
            <h5 style={{ color: "#b6255a" }}>Add Decor</h5>
            <Steps totalSteps={4} currStep={currStep}></Steps>
          </div>
          <div className={Styles.form_container}>
            {currStep === 1 ? (
              <div className={Styles.borders}>
                <span>Listing</span>
                <div className="col-xl-12 col-lg-12 col-12 col-sm-12 col-12">
                  <div className={Styles.category_section}>
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                      }}
                      type="text"
                      value={form?.name}
                      label="Name of Listing"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        setForm({ ...form, description: e.target.value });
                      }}
                      type="text"
                      value={form?.description}
                      label="Description / About"
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6 mt-3">
                    <div className={Styles.category_section}>
                      <Select
                        fullWidth
                        onChange={(e) => {
                          setForm({ ...form, category: e.target.value });
                        }}
                        displayEmpty
                        value={form.category}
                        id="category"
                      >
                        <MenuItem value={""} disabled>
                          --select--
                        </MenuItem>
                        {Theme.map((list, key) => (
                          <MenuItem key={list} value={list}>
                            {list}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            ) : currStep == 2 ? (
              <div className={Styles.borders}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  Plans / Packages
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
                          label="Plan Name"
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
                          label="Value"
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
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-12 col-sm-12 col-12">
                    <div className={Styles.category_section}>
                      <br></br>
                      <TextField
                        fullWidth
                        onChange={(e) => {
                          setForm({ ...form, price: e.target.value });
                        }}
                        type="text"
                        value={form?.price}
                        label="Amenity Price"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : currStep == 3 ? (
              <div className={Styles.borders}>
                <span>Terms & Conditions</span>

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-12 col-sm-12 col-12">
                    <div className={Styles.category_section}>
                      <br></br>
                      <TextField
                        multiline
                        fullWidth
                        rows={15}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            termsandconditions: e.target.value,
                          });
                        }}
                        value={form?.termsandconditions}
                        type="text"
                        label="Terms & Conditions"
                      ></TextField>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={Styles.borders}>
                <span>Images</span>

                <div className="row">
                  <div className="col-12 mt-4">
                    <div className={Styles.category_section1}>
                      <span>Main Image</span>
                      <br></br>
                      <Upload
                        listType="picture-card"
                        fileList={fileListMain}
                        onPreview={handlePreview}
                        onChange={handleChangeMain}
                      >
                        {fileListMain.length >= 1 ? null : uploadButton}
                      </Upload>
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                  className="mt-4"
                >
                  Albums
                  <span
                    className={Styles.plus}
                    onClick={() => {
                      const newitem = { name: "", value: [] };
                      setFileListAlbum((old) => [...old, newitem]);
                    }}
                  >
                    +
                  </span>
                </span>
                <br></br>
                <div className="row">
                  {fileListAlbum.map((album, key) => (
                    <div key={key}>
                      <div className="row mt-1 mb-3">
                        <div className="col-11">
                          <TextField
                            fullWidth
                            type="text"
                            onChange={onChangeAlbumHandler(key)}
                            label="Album name"
                            value={album.name}
                          />
                        </div>
                        <div className="col-1" style={{ marginTop: 10 }}>
                          <span
                            onClick={() => {
                              const newarr = [...fileListAlbum];
                              const newarr2 = [...albumImageDefault];
                              newarr.splice(key, 1);
                              newarr2.splice(key, 1);
                              setFileListAlbum(newarr);
                              setAlbumdefault(newarr2);
                            }}
                            className="fs-5 cursor-pointer"
                          >
                            <RiDeleteBin6Line />
                          </span>
                        </div>
                      </div>
                      <Upload
                        multiple
                        listType="picture-card"
                        fileList={fileListAlbum[key]?.value}
                        onPreview={handlePreview}
                        onChange={(e) => handleChangeAlbum(e, key)}
                      >
                        {uploadButton}
                      </Upload>
                    </div>
                  ))}
                </div>
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
              </div>
            )}
            <div className={Styles.btns}>
              {currStep == 1 ? (
                <></>
              ) : (
                <button
                  className={Styles.prevButton}
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                >
                  Previous
                </button>
              )}
              {currStep == 4 ? (
                <button onClick={addHandler}>
                  {isLoading ? <Spinner /> : "Create"}
                </button>
              ) : (
                <button
                  className={Styles.nextButton}
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default AddDecor;
