import { PlusOutlined } from "@ant-design/icons";
import { Modal as AntdModal, Upload } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// import Input from "../../Components/Input";
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
  Typography,
} from "@mui/material";
import AlertDialog from "../../Components/common/AlertDialogue";
import { useRouter } from "next/router";
import Colors from "../../constants/colors";
import axios from "axios";
import { PROXY, S3PROXY } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import Layout from "../../Components/Dashboard/layout";
import VendorProfile from "../../Components/Dashboard/VendorProfile";
import VenueProfile from "../../Components/Dashboard/VenueProfile";
import compressAndAppendFiles from "../../Components/compressAndAppendFiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
const ProfileScreenTemplate = () => {
  const [deleteAlert, setDeleteAlaert] = useState(false);

  const globleuser = useSelector(selectUser);
  console.log("🚀 ~ file: profile.js:58 ~ globleuser:", globleuser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   !globleuser.success && router.push("/");
  // }, []);
  //for sidebars
  const router = useRouter();

  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!globleuser) {
      router.push("/");
    }

    setRole(globleuser.data);
  }, [router]);

  //body
  const [profilePic, setProfilePic] = useState([]);
  const [profilePicLink, setProfilePicLink] = useState("");
  const [coverPic, setCoverPic] = useState([]);
  const [coverPicLink, setCoverPicLink] = useState([]);
  const [currentPass, setCurrentPass] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPassword2] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [commonAlert, setCommonAlert] = useState({ open: false, msg: "" });
  const [studentData, setStudenData] = useState({
    name: "",
    company_name: "",
    email: "",
    mobile: "",
    profile_pic: "",
    company_address: "",
    cover_pic: [],
    shipping_address: "",
    city: "",
    is_email_verified: false,
    is_mobile_verified: false,
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const setDefaultImages = (url, uid) => {
    return {
      uid,
      status: "done",
      url: `${S3PROXY}${url}`,
    };
  };
  const setDefaultImages1 = (data) =>
    data.map((data) => `${S3PROXY}${data.url}`);

  const handleCancel = () => setPreviewOpen(false);
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

  const [isMobileOtpSent, setIsMobileOtpSent] = useState({
    status: false,
    timeOut: null,
  });
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
  useEffect(() => {
    if (globleuser?.role === "ShopNow") {
      console.log(
        "🚀 ~ file: profile.js:163 ~ useEffect ~ role?.categories:",
        role?.categories
      );
      setStudenData({
        ...studentData,
        name: role?.name,
        company_name: role?.company_name,
        mobile: role?.mobile,
        email: role?.email,
        categories: role?.categories,
        company_address: role?.company_address,
        address1: role?.warehouse_address[0].address1,
        address2: role?.warehouse_address[0].address2,
        landmark: role?.warehouse_address[0].landmark,
        state: role?.warehouse_address[0].state,
        city: role?.warehouse_address[0].city,
        pincode: role?.warehouse_address[0].pincode,
        country: role?.warehouse_address[0].country,
        is_email_verified: role?.is_email_verified,
        is_mobile_verified: role?.is_mobile_verified,
      });
    } else {
      setStudenData({
        ...studentData,
        name: role?.name,
        company_name: role?.company_name,
        mobile: role?.mobile,
        email: role?.email,
        address1: globleuser?.data?.address1,
        address2: globleuser?.data?.address2,
        landmark: globleuser?.data?.landmark,
        state: globleuser?.data?.data?.state,
        city: globleuser?.data?.city,
        pincode: globleuser?.data?.pincode,
        country: globleuser?.data?.country,
        is_email_verified: role?.is_email_verified,
        is_mobile_verified: role?.is_mobile_verified,
      });
    }

    if (role?.profile_pic) {
      const data = setDefaultImages(role?.profile_pic, 1);

      setProfilePic([data]);
      setProfilePicLink(data.url);
    }

    if (role?.cover_pic?.length) {
      const data = role?.cover_pic?.map((url, uid) => {
        return setDefaultImages(url, uid);
      });
      setCoverPic(data);
      setCoverPicLink(setDefaultImages1(data));
    }
  }, [role]);

  //Header

  const handleCommonAlertClose = (e) => {
    e.preventDefault();
    setCommonAlert({ open: false, msg: "" });
  };

  const updatePassword = async () => {
    if (!currentPass) {
      alert("please enter current Password");
      return;
    }
    if (!Password) {
      alert("please enter new Password");
      return;
    }
    if (!Password2) {
      alert("please re-enter new Password");
      return;
    }
    if (Password !== Password2) {
      alert("new passwords are not same");
      return;
    }
    if (Password === currentPass) {
      alert("new passwords should be different from old Password");
      return;
    }
    try {
      if (globleuser?.role === "ShopNow") {
        const data = await axios.put(
          `${PROXY}/shopnowuser/updatewithpass`,
          {
            currentPassword: currentPass,
            password: Password,
          },
          {
            headers: {
              authorization: role.token,
            },
          }
        );
        if (data.data.success) {
          alert("password changed successfully");
          setCurrentPass("");
          setPassword("");
          setPassword2("");
        }
      } else {
        const data = await axios.patch(
          `${PROXY}/users/updatewithpass`,
          {
            currentPassword: currentPass,
            password: Password,
            _id: role._id,
          },
          {
            headers: {
              authorization: role.token,
            },
          }
        );
        if (data.data.success) {
          alert("password changed successfully");
        }
      }
    } catch (error) {
      if (error?.response?.data?.error?.message) {
        alert(error?.response?.data?.error?.message);
        return;
      } else {
        alert("Something went wrong");
      }
    }
  };

  const updateProfile = async () => {
    try {
      const form = new FormData();
      let data;
      if (globleuser?.role === "ShopNow") {
        data = {
          name: studentData.name,
          company_name: studentData.company_name,
          email: studentData.email,
          mobile: `${studentData.mobile}`,
          company_address: studentData.company_address,
          categories: studentData.categories,
          warehouse_address: [
            {
              address1: studentData.address1,
              address2: studentData.address2,
              landmark: studentData.landmark,
              state: studentData.state,
              city: studentData.city,
              pincode: studentData.pincode,
              country: studentData.country,
            },
          ],
        };
      } else {
        data = {
          name: studentData.name,
          company_name: studentData.company_name,
          email: studentData.contactEmail,
          mobile: `${studentData.mobile}`,
          address1: studentData.address1,
          address2: studentData.address2,
          landmark: studentData.landmark,
          state: studentData.state,
          city: studentData.city,
          pincode: studentData.pincode,
          country: studentData.country,
          _id: studentData._id,
          token: studentData.token,
        };
      }

      form.append("data", JSON.stringify(data));
      // profilePic &&
      //   profilePic.forEach((item, key) => {
      //     form.append("profile", item.originFileObj);
      //   });
      // coverPic &&
      //   coverPic.forEach((item, key) => {
      //     form.append("cover", item.originFileObj);
      //   });
      await compressAndAppendFiles(coverPic, form, "cover");
      await compressAndAppendFiles(profilePic, form, "profile");

      form.append("profilelink", profilePicLink);
      form.append("coverlink", JSON.stringify(coverPicLink));
      if (globleuser?.role === "ShopNow") {
        const res = await axios.put(`${PROXY}/shopnowuser/update`, form, {
          headers: {
            authorization: globleuser?.data?.token,
          },
        });
        if (res) {
          (res.data.data.token = role?.token),
            localStorage.setItem(
              "wedcell",
              JSON.stringify({
                ...res.data,
              })
            );
          alert("updated Succesfully");
          res.data.data.token = globleuser?.data?.token;
          dispatch(user(res.data));
          localStorage.setItem("wedcell", JSON.stringify(res.data));
          router.push("/dashboard/sellersdashboard");
          // location.reload(true);
        }
      } else if (globleuser?.role === "Product") {
        const res = await axios.put(`${PROXY}/productuser/update`, form, {
          headers: {
            authorization: globleuser?.data?.token,
          },
        });
        if (res) {
          (res.data.data.token = role?.token),
            localStorage.setItem(
              "wedcell",
              JSON.stringify({
                ...res.data,
              })
            );
          alert("updated Succesfully");
          res.data.data.token = globleuser?.data?.token;
          dispatch(user(res.data));
          localStorage.setItem("wedcell", JSON.stringify(res.data));
          router.push("/dashboard");
          // location.reload(true);
        }
      } else {
        const res = await axios.patch(`${PROXY}/users/update`, form, {
          headers: {
            authorization: globleuser?.data?.token,
          },
        });
        if (res) {
          (res.data.data.token = role?.token),
            localStorage.setItem(
              "wedcell",
              JSON.stringify({
                ...res.data,
              })
            );
          alert("updated Succesfully");
          res.data.data.token = globleuser?.data?.token;
          dispatch(user(res.data));
          localStorage.setItem("wedcell", JSON.stringify(res.data));
          router.push("/dashboard");
          // location.reload(true);
        }
      }
    } catch (error) {
      console.error("rr", error);
      alert(error?.response?.data?.error?.message);
    }
  };

  const SendMobileOTP = async (type) => {
    if (type === "sent") {
      if (!isMobileOtpSent.status) {
        const persisOtpData = {};
        try {
          const data = await axios.post(`${PROXY}/otp`, {
            mobile: studentData.mobile,
          });
          if (data) {
            persisOtpData.status = true;
            const timeout = setTimeout(() => {
              setIsMobileOtpSent({
                ...isMobileOtpSent,
                status: false,
              });
            }, 300000);
            persisOtpData.timeOut = timeout;
            setIsMobileOtpSent(persisOtpData);
            alert("otp Sent Successfuly");
          }
        } catch (error) {
          console.error(
            `🚀 ~ file: profile.jsx:352 ~ SendMobileOTP ~ error:`,
            error
          );
          alert("error occured while sending otp");
        }
      }
    } else {
      try {
        const data = axios.post(`${PROXY}/otp`, {
          mobile: studentData.mobile,
        });
        if (data) {
          clearTimeout(isMobileOtpSent.timeOut);
          const timeout = setTimeout(() => {
            setIsMobileOtpSent({
              ...isMobileOtpSent,
              status: false,
            });
          }, 300000);
          setIsMobileOtpSent({
            ...isMobileOtpSent,
            timeOut: timeout,
          });
          alert("otp re-Sent Successfuly");
        }
      } catch (error) {
        console.error(
          `🚀 ~ file: profile.jsx:352 ~ SendMobileOTP ~ error:`,
          error
        );
        alert("error occured while sending otp");
      }
    }
    setModalVisible(true);
  };

  const VerifyOTP = async (type) => {
    if (!otp.length) {
      alert("please neter otp");
      return;
    }
    if (type === "mobile") {
      const response = await axios.post(`${PROXY}/otp/verify`, {
        mobile: studentData.mobile,
        otp,
      });

      if (response.data.success) {
        const responce = await axios.post(
          `${PROXY}/student/verify`,
          { mobile: studentData.mobile },
          {
            headers: {
              authorization: role?.token,
            },
          }
        );
        role.student.is_mobile_verified = true;
        role.student.is_approved = true;
        role.student.mobile = studentData.mobile;
        setRole(role);
        localStorage.setItem(
          "wedcell",
          JSON.stringify({
            student: role.student,
            token: role.token,
          })
        );
        alert("mobile verify succesfully");
        location.reload(true);
      }
    }

    setModalVisible(false);
  };

  const errorr = () =>
    toast.error("image cant be uploaded with size bigger then 500kb", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
      if (file.size / 1028 <= 500) {
        setProfilePic(newFileList);
      } else {
        errorr();
      }
    } else {
      setProfilePic(newFileList);
      setProfilePicLink("");
    }
  };

  return (
    <Layout>
      {globleuser?.role === "Vendor" ? (
        <VendorProfile></VendorProfile>
      ) : globleuser?.role === "Venue" ? (
        <VenueProfile></VenueProfile>
      ) : globleuser?.role === "ShopNow" ? (
        <>
          <Modal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={styles.centeredBox}>
                <Box sx={styles.modalBox}>
                  <Typography sx={styles.modalText}>
                    Type OTP received
                  </Typography>
                  <TextField
                    floatingPlaceholder
                    floatOnFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="OTP"
                    type="number"
                    style={{
                      marginBottom: "10px",
                    }}
                  />
                  <Box onClick={() => SendMobileOTP("re-sent")}>
                    <Typography
                      sx={{ color: Colors.primary, fontWeight: "bold" }}
                    >
                      Resend OTP
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "15px",
                    }}
                  >
                    <Button variant="text" onClick={() => VerifyOTP("mobile")}>
                      Confirm
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => setModalVisible(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Modal>
          <div style={{ width: "95%" }}>
            <div className="form-container">
              <h4 className="mb-4">Company Info</h4>

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
              {role?.is_email_verified ? (
                <Typography sx={{ color: "green", marginBottom: 1 }}>
                  Verified
                </Typography>
              ) : (
                <Box onClick={() => {}}>
                  <Typography
                    sx={{
                      color: Colors.primary,
                      fontWeight: "bold",
                      marginBottom: 1,
                    }}
                  >
                    Send OTP
                  </Typography>
                </Box>
              )}
              <TextField
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="phone"
                textNumSpace
                minLength={1}
                label="Phone"
                value={studentData?.mobile}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    mobile: text.target.value,
                  });
                  if (isMobileOtpSent) {
                    clearTimeout(isMobileOtpSent.timeOut);
                    setIsMobileOtpSent({
                      status: false,
                      timeOut: null,
                    });
                  }
                }}
              />
              {role?.is_mobile_verified ? (
                <Typography sx={{ color: "green", marginBottom: 1 }}>
                  Verified
                </Typography>
              ) : (
                <Box onClick={() => SendMobileOTP("sent")}>
                  <Typography
                    sx={{
                      color: Colors.primary,
                      fontWeight: "bold",
                      marginBottom: 1,
                    }}
                  >
                    Send OTP
                  </Typography>
                </Box>
              )}

              <Grid
                container
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item xs={3}>
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
                <Grid item xs={9}>
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
              <FormLabel
                id="currentlyEmployed"
                style={{ fontSize: "17px", marginBottom: "12PX" }}
              >
                Company Address
              </FormLabel>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  id="Company Address..."
                  textNumSpace
                  InputLabelProps={{ shrink: true }}
                  minLength={1}
                  label="Company Address..."
                  value={studentData?.company_address}
                  onChange={(text) => {
                    setStudenData({
                      ...studentData,
                      company_address: text.target.value,
                    });
                  }}
                />
              </div>
              <FormLabel
                id="currentlyEmployed"
                style={{
                  fontSize: "17px",
                  marginBottom: "12PX",
                  marginTop: "15px",
                }}
              >
                Warehouse Address
              </FormLabel>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="address"
                  textNumSpace
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    value={studentData?.country}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="address"
                    textNumSpace
                    minLength={1}
                    label="Country"
                    InputLabelProps={{ shrink: true }}
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
                        ? () => (
                            <span style={{ color: "#0000009c" }}>
                              {studentData.city}
                            </span>
                          )
                        : () => <span style={{ color: "#0000009c" }}>City</span>
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
                    InputLabelProps={{ shrink: true }}
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

              <Button fullWidth onClick={updateProfile}>
                Update Profile
              </Button>
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
              {/* <Input
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="productTitle"
              textNumSpace
              minLength={1}
              label="Product Title"
              name="productTitle"
              autoComplete="productTitle"
              errorText="Please enter a valid title!"
              //   keyboardType="default"
              //   autoCapitalize="sentences"
              //   autoCorrect
              returnKeyType="next"
              onInputChange={(text) => {
              }}
              initialValue={"Value"}
              initiallyValid={true}
            /> */}
              {/* <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter Old Password"
                    className="form-control py-2"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter New Password"
                    className="form-control py-2"
                  />
                </div>
              </div>
            </div> */}
              {/* <button className="primary-sm-btn">Submit</button> */}
            </div>
          </div>
          <AlertDialog open={commonAlert.open} onClose={handleCommonAlertClose}>
            {commonAlert.msg}
          </AlertDialog>

          <AntdModal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </AntdModal>
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
        </>
      ) : (
        <>
          <Modal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={styles.centeredBox}>
                <Box sx={styles.modalBox}>
                  <Typography sx={styles.modalText}>
                    Type OTP received
                  </Typography>
                  <TextField
                    floatingPlaceholder
                    floatOnFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="OTP"
                    type="number"
                    style={{
                      marginBottom: "10px",
                    }}
                  />
                  <Box onClick={() => SendMobileOTP("re-sent")}>
                    <Typography
                      sx={{ color: Colors.primary, fontWeight: "bold" }}
                    >
                      Resend OTP
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "15px",
                    }}
                  >
                    <Button variant="text" onClick={() => VerifyOTP("mobile")}>
                      Confirm
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => setModalVisible(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Modal>
          <div style={{ width: "95%" }}>
            <div className="form-container">
              <h4 className="mb-4">Company Info</h4>

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
              {role?.is_email_verified ? (
                <Typography sx={{ color: "green", marginBottom: 1 }}>
                  Verified
                </Typography>
              ) : (
                <Box onClick={() => {}}>
                  <Typography
                    sx={{
                      color: Colors.primary,
                      fontWeight: "bold",
                      marginBottom: 1,
                    }}
                  >
                    Send OTP
                  </Typography>
                </Box>
              )}
              <TextField
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="phone"
                textNumSpace
                minLength={1}
                label="Phone"
                value={studentData?.mobile}
                onChange={(text) => {
                  setStudenData({
                    ...studentData,
                    mobile: text.target.value,
                  });
                  if (isMobileOtpSent) {
                    clearTimeout(isMobileOtpSent.timeOut);
                    setIsMobileOtpSent({
                      status: false,
                      timeOut: null,
                    });
                  }
                }}
              />
              {role?.is_mobile_verified ? (
                <Typography sx={{ color: "green", marginBottom: 1 }}>
                  Verified
                </Typography>
              ) : (
                <Box onClick={() => SendMobileOTP("sent")}>
                  <Typography
                    sx={{
                      color: Colors.primary,
                      fontWeight: "bold",
                      marginBottom: 1,
                    }}
                  >
                    Send OTP
                  </Typography>
                </Box>
              )}
              <Grid
                container
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item xs={3}>
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
                <Grid item xs={9}>
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
              <FormLabel
                id="currentlyEmployed"
                style={{ fontSize: "17px", marginBottom: "12PX" }}
              >
                Company Address
              </FormLabel>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  id="Company Address..."
                  textNumSpace
                  InputLabelProps={{ shrink: true }}
                  minLength={1}
                  label="Company Address..."
                  value={studentData?.company_address}
                  onChange={(text) => {
                    setStudenData({
                      ...studentData,
                      company_address: text.target.value,
                    });
                  }}
                />
              </div>
              <FormLabel
                id="currentlyEmployed"
                style={{
                  fontSize: "17px",
                  marginBottom: "12PX",
                  marginTop: "15px",
                }}
              >
                Warehouse Address
              </FormLabel>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="address"
                  textNumSpace
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    value={studentData?.country}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="address"
                    textNumSpace
                    minLength={1}
                    label="Country"
                    InputLabelProps={{ shrink: true }}
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
                  <TextField
                    value={studentData?.city}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="address"
                    textNumSpace
                    minLength={1}
                    InputLabelProps={{ shrink: true }}
                    label="City"
                    onChange={(text) => {
                      setStudenData({
                        ...studentData,
                        city: text.target.value,
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
                    label="Pincode"
                    InputLabelProps={{ shrink: true }}
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

              <Button fullWidth onClick={updateProfile}>
                Update Profile
              </Button>
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
              {/* <Input
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="productTitle"
              textNumSpace
              minLength={1}
              label="Product Title"
              name="productTitle"
              autoComplete="productTitle"
              errorText="Please enter a valid title!"
              //   keyboardType="default"
              //   autoCapitalize="sentences"
              //   autoCorrect
              returnKeyType="next"
              onInputChange={(text) => {
              }}
              initialValue={"Value"}
              initiallyValid={true}
            /> */}
              {/* <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter Old Password"
                    className="form-control py-2"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter New Password"
                    className="form-control py-2"
                  />
                </div>
              </div>
            </div> */}
              {/* <button className="primary-sm-btn">Submit</button> */}
            </div>
          </div>
          <AlertDialog open={commonAlert.open} onClose={handleCommonAlertClose}>
            {commonAlert.msg}
          </AlertDialog>

          <AntdModal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </AntdModal>
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
        </>
      )}
    </Layout>
  );
};

export default ProfileScreenTemplate;

const styles = {
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: "20px",
    fontSize: "24px",
    textAlign: "start",
  },
};
