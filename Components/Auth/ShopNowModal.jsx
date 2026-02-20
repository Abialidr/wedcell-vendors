import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROXY } from "../../config";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import compressAndAppendFiles from "../compressAndAppendFiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cities = [
  "Mumbai",
  "Pune",
  "Delhi",
  "Jaipur",
  "Goa",
  "Udaipur",
  "Agra",
  "Noida",
  "Gurgaon",
  "Ranchi",
  "Patna",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Nashik",
  "Meerut",
  "Rajkot",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Allahabad",
  "Gwalior",
  "Jabalpur",
  "Coimbatore",
  "Vijayawada",
  "Jodhpur",
  "Raipur",
  "Kota",
  "Chandigarh",
  "Guwahati",
  "Mysore",
  "Bareilly",
  "Aligarh",
  "Moradabad",
  "Jalandhar",
  "Bhuba",
  "Gorakhpur",
  "Bikaner",
  "Saharanpur",
  "Jamshedpur",
  "Bhilai",
  "Cuttack",
  "Firozabad",
  "Kochi",
  "Dehradun",
  "Durgapur",
  "Ajmer",
  "Siliguri",
  "Gaya",
  "Tirupati",
  "Mathura",
  "Bilaspur",
  "Haridwar",
  "Gandhinagar",
  "Shimla",
  "Gangtok",
  "Nainital",
  "Jaisalmer",
  "Indor",
  "Rishikesh",
  "kaushali",
  "Pushkar",
  "Kerala",
  "Jim Corbet",
  "Mussoorie",
  "Faridabad",
  "Dubai",
  "Thailand",
  "Srilanka",
  "Bali",
  "Canada",
  "Maldives",
  "Vietnam",
  "Cambodia",
  "Philippine",
  "Malaysia",
];
const ShopNowModal = ({ openModal }) => {
  const [deleteAlert, setDeleteAlaert] = useState(false);
  const dispatch = useDispatch();
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [studentData, setStudenData] = useState({
    name: "",
    company_name: "",
    email: "",
    mobile: "",
    profile_pic: "",
    cover_pic: [],
    company_address: "",
    address1: "",
    address2: "",
    landmark: "",
    state: "",
    city: "",
    pincode: "",
    country: "",
    password: "",
    categories: "",
    is_email_verified: false,
    is_mobile_verified: false,
  });

  const [profilePic, setProfilePic] = useState([]);
  const [profilePicLink, setProfilePicLink] = useState("");
  const [coverPic, setCoverPic] = useState([]);
  const [coverPicLink, setCoverPicLink] = useState([]);

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
  const handleChangeCover = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      setCoverPic(newFileList);
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      setCoverPicLink(data);
      setCoverPic(newFileList);
    }
  };

  const handleChangeProfile = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      setProfilePic(newFileList);
    } else {
      setProfilePic(newFileList);
      setProfilePicLink("");
    }
  };
  const handleRegister = async () => {
    const form = new FormData();
    setIsloading(true);
    // coverPic &&
    //   coverPic.forEach((item, key) => {
    //     form.append("cover_pic", item.originFileObj);
    //   });
    // profilePic &&
    //   profilePic.forEach((item, key) => {
    //     form.append("profile_pic", item.originFileObj);
    //   });

    await compressAndAppendFiles(coverPic, form, "cover_pic");
    await compressAndAppendFiles(profilePic, form, "profile_pic");
    studentData.name && form.append("name", studentData.name);
    form.append("id", globleuser.data._id);
    studentData.company_name &&
      form.append("company_name", studentData.company_name);
    studentData.email && form.append("email", studentData.email);
    studentData.company_address &&
      form.append("company_address", studentData.company_address);
    studentData.address1 && form.append("address1", studentData.address1);
    studentData.address2 && form.append("address2", studentData.address2);
    studentData.landmark && form.append("landmark", studentData.landmark);
    studentData.state && form.append("state", studentData.state);
    studentData.pincode && form.append("pincode", studentData.pincode);
    studentData.country && form.append("country", studentData.country);
    studentData.city && form.append("city", studentData.city);
    studentData.categories && form.append("categories", studentData.categories);
    // axios
    //   .post(`${PROXY}/otp/verify`, {
    //     mobile: studentData.mobile,
    //     otp: otpprod,
    //   })
    //   .then((res) => {
    //     if (res.data.success) {
    axios
      .post(`${PROXY}/shopnowuser/create`, form)
      .then((res) => {
        alert("Create Successful");
        res.data.data.token = globleuser?.data?.token;
        res.data.role = globleuser?.role;
        dispatch(user(res.data));
        localStorage.setItem("wedcell", JSON.stringify(res.data));
        setTimeout(() => {
          router.push("/dashboard/sellersdashboard");
        }, 3000);
      })
      .catch((e) => {
        console.log(`🚀 ~ //.then ~ e:`, e);
        setIsloading(false);
        alert(e?.response?.data?.message);
        setTimeout(() => {
          // setEnterOtp(false);
        }, 5000);
      });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "20px",
    display: "flex",
    borderRadius: "10px",
    height: "95vh",
    overflow: "scroll",
    zIndex: "-1",
    paddingBottom: "40px",
  };
  return (
    <>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="register-form-container mt-4 px-4 w-100">
            <div className="form-title">
              <h5>Product Dealer Registration</h5>
            </div>

            <div style={{ width: "100%", paddingBottom: "20px" }}>
              <div className="form-container ">
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="name"
                  textNumSpace
                  minLength={1}
                  label="Name"
                  value={studentData?.name}
                  onChange={(text) => {
                    setStudenData({
                      ...studentData,
                      name: text.target.value,
                    });
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="company_name"
                  textNumSpace
                  minLength={1}
                  label="Company Name"
                  value={studentData?.company_name}
                  onChange={(text) => {
                    setStudenData({
                      ...studentData,
                      company_name: text.target.value,
                    });
                  }}
                />
                <TextField
                  type="email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="email"
                  textNumSpace
                  minLength={1}
                  label="Email"
                  value={studentData?.email}
                  onChange={(text) => {
                    setStudenData({
                      ...studentData,
                      email: text.target.value,
                    });
                  }}
                />
                <FormLabel id="currentlyEmployed">Categorie</FormLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={studentData.categories}
                  onChange={(e) => {
                    setStudenData({
                      ...studentData,
                      categories: e.target.value,
                    });
                  }}
                  fullWidth
                >
                  <MenuItem value={"Gifts"}>Invitation Gift</MenuItem>
                  <MenuItem value={"Cake"}>Cake</MenuItem>
                  <MenuItem value={"Invites"}>Invitation Card</MenuItem>
                  <MenuItem value={"Clothes"}>Clothes</MenuItem>
                </Select>
                <Grid
                  className="mt-4"
                  container
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid item xs={12}>
                    <FormLabel id="currentlyEmployed">Profile Images</FormLabel>
                    <br />
                    <br />
                    <Upload
                      listType="picture-card"
                      fileList={profilePic}
                      onPreview={handlePreview}
                      onChange={handleChangeProfile}
                    >
                      {profilePic.length >= 1 ? null : uploadButton}
                    </Upload>
                  </Grid>
                </Grid>
                <Grid
                  className="mt-4"
                  container
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid item xs={12}>
                    <FormLabel id="currentlyEmployed">Cover Images</FormLabel>
                    <br />
                    <br />
                    <Upload
                      listType="picture-card"
                      fileList={coverPic}
                      onPreview={handlePreview}
                      onChange={handleChangeCover}
                    >
                      {coverPic?.length >= 5 ? null : uploadButton}
                    </Upload>
                  </Grid>
                </Grid>
                <br />
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
                  <FormLabel id="currentlyEmployed">Company Address</FormLabel>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={3}
                    fullWidth
                    required
                    id="address"
                    textNumSpace
                    minLength={1}
                    label="Company Address"
                    value={studentData?.company_address}
                    onChange={(text) => {
                      setStudenData({
                        ...studentData,
                        company_address: text.target.value,
                      });
                    }}
                  />
                </div>
                <FormLabel id="currentlyEmployed">WareHouse Address</FormLabel>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="address"
                    textNumSpace
                    minLength={1}
                    label="Adderess 1"
                    value={studentData?.address1}
                    onChange={(text) => {
                      setStudenData({
                        ...studentData,
                        address1: text.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="address"
                    textNumSpace
                    minLength={1}
                    label="Adderess 2"
                    value={studentData?.address2}
                    onChange={(text) => {
                      setStudenData({
                        ...studentData,
                        address2: text.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="address"
                    textNumSpace
                    minLength={1}
                    label="Landmark"
                    value={studentData?.landmark}
                    onChange={(text) => {
                      setStudenData({
                        ...studentData,
                        landmark: text.target.value,
                      });
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="address"
                      textNumSpace
                      minLength={1}
                      label="State"
                      value={studentData?.state}
                      onChange={(text) => {
                        setStudenData({
                          ...studentData,
                          state: text.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="address"
                      textNumSpace
                      minLength={1}
                      label="Country"
                      value={studentData?.country}
                      onChange={(text) => {
                        setStudenData({
                          ...studentData,
                          country: text.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <Select
                      fullWidth
                      onChange={(text) => {
                        setStudenData({
                          ...studentData,
                          city: text.target.value,
                        });
                      }}
                      displayEmpty
                      renderValue={
                        studentData?.city !== ""
                          ? undefined
                          : () => (
                              <span style={{ color: "#0000009c" }}>City</span>
                            )
                      }
                    >
                      <MenuItem value={null} selected disabled>
                        ---Select---
                      </MenuItem>
                      {cities.map((city) => {
                        return <MenuItem value={city}>{city}</MenuItem>;
                      })}
                    </Select>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="address"
                      textNumSpace
                      minLength={1}
                      label="Pincode"
                      value={studentData?.pincode}
                      onChange={(text) => {
                        setStudenData({
                          ...studentData,
                          pincode: text.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 d-flex justify-content-center align-item-center gap-3">
                <button className="primary-btn" onClick={handleRegister}>
                  {isLoading ? <Spinner /> : "Register"}
                </button>
                <button
                  className="primary-btn"
                  onClick={() => {
                    dispatch(user(undefined));
                    localStorage.removeItem("wedcell");
                    localStorage.removeItem("role");
                    localStorage.setItem("wedcellIsLoged", "");
                    router.push("/");
                  }}
                >
                  {"Logout"}
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "20px 0px",
                  margin: "20px 30px",
                }}
                onClick={() => {
                  setDeleteAlaert(true);
                }}
              >
                <FontAwesomeIcon
                  style={{
                    height: "24px",
                  }}
                  icon={["fa", "fa-trash"]}
                  color="#BB2131"
                ></FontAwesomeIcon>
                <h1
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "20px",
                    textAlign: "left",
                    color: "#BB2131",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  delete Account
                </h1>
              </div>
              <Dialog
                open={deleteAlert}
                onClose={() => {
                  setDeleteAlaert(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle
                  id="alert-dialog-title"
                  style={{
                    background: " #B6255A",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      fontWeight: "400",
                      lineHeight: "20px",
                      textAlign: "center",
                      color: "#ffffff",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    Delete Account
                  </span>
                </DialogTitle>
                <DialogContent
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  <DialogContentText id="alert-dialog-description">
                    <span
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "20px",
                        textAlign: "center",
                        color: "#000000",
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      Are you sure ?
                    </span>
                    <br></br>
                    <span
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "20px",
                        textAlign: "center",
                        color: "#000000",
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      Once you confirm, all of your account data will be
                      permanently deleted.
                    </span>
                  </DialogContentText>
                </DialogContent>
                <DialogActions
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      background: " #B6255A",
                      color: "white",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      setDeleteAlaert(false);
                    }}
                    color="primary"
                  >
                    cancel
                  </Button>
                  <Button
                    style={{
                      background: " #B6255A",
                      color: "white",
                      textAlign: "center",
                    }}
                    onClick={async () => {
                      const res = await axios.delete(
                        `${PROXY}/shopnowuser/delete/${globleuser.data._id}`,
                        {
                          headers: {
                            authorization: globleuser.data.token,
                          },
                        }
                      );
                      console.log("🚀 ~ onClick={ ~ res:", res);
                      if (res.data.success) {
                        alert(
                          "we are sad to let you go\nuser deleted successfully"
                        );
                        dispatch(user(undefined));
                        localStorage.removeItem("wedcell");
                        localStorage.removeItem("role");
                        localStorage.setItem("wedcellIsLoged", "");
                        router.push("/");
                      }
                    }}
                    color="primary"
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ShopNowModal;
