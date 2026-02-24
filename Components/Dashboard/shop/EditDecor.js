import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import React, { useCallback, useEffect, useState } from "react";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
// import Styles from "../../styles/Editlist.module.css";
import Styles from "../../../styles/Editlist.module.css";
import axios from "axios";

import { useRouter } from "next/router";

// import { PROXY } from "../../config";
import { PROXY, S3PROXY } from "../../../config";

import { RiDeleteBin6Line } from "react-icons/ri";
// import { ImageDelete } from "../Helpers/FileHandlers";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, user } from "../../../redux/reducer/appEssentials";
import compressAndAppendFiles from "../../compressAndAppendFiles";
import { ToastContainer } from "react-toastify";
import { profileforVendorVal } from "../../../yupValidations/SignupValidation";
import Steps from "../../Steps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: 0.5,
  },
  form: {
    width: "100%",
    marginTop: 1,
  },
  submit: {
    margin: 3,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: "black",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));
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

const CategotiesList = [
  // {
  //   name: "Bridal Wear",
  //   subCategories: [],
  // },
  // {
  //   name: "Groom Wear",
  //   subCategories: [],
  // },
  {
    name: "Food",
    subCategories: [
      "Chaat Counter",
      "Fruit Counter",
      "Catering services",
      "Pan Counter",
      "Cake",
      "Bar Tenders",
    ],
  },
  {
    name: "Invites & Gifts",
    subCategories: ["Invitation Card", "Invitation Gift"],
  },
  {
    name: "Music & Dance",
    subCategories: [
      "Anchor",
      "Artist management services",
      "Choreographer",
      "Singer",
      "DJ",
      "Ghodi & Baggi",
      "Band Baja",
      "Dhol",
      "Live band",
      "DJ based Band",
      "Male & Female Singer",
      "Dance Troupe",
    ],
  },
  {
    name: "Pandit Jee",
    subCategories: [],
  },
  {
    name: "Makeup",
    subCategories: ["Bridal Makeup", "Groom Makeup", "Family Makeup"],
  },
  {
    name: "Mehndi",
    subCategories: ["Bride Mehndi", "Family Member Mehndi"],
  },
  {
    name: "Photographers",
    subCategories: [
      "Cinema/Video",
      "Album",
      "Collage Maker",
      "Drone",
      "Pre Wedding Shoot",
    ],
  },
  {
    name: "Planning & Decor",
    subCategories: ["Wedding Decor", "Celebrities Management"],
  },
];

const CategoryDefault = {
  "Planning & Decor": [
    {
      name: "Wedding Décor",
      value: "",
    },
    {
      name: "Ring Ceremony Décor",
      value: "",
    },
    {
      name: "Reception Décor",
      value: "",
    },
    {
      name: "Mehndi Décor",
      value: "",
    },
    {
      name: "Haldi Decor",
      value: "",
    },
    {
      name: "Rokka Ceremony decor",
      value: "",
    },
    {
      name: "Birthday Décor",
      value: "",
    },
    {
      name: "Anniversary Décor",
      value: "",
    },
  ],
  Photographers: [
    {
      name: "Wedding",
      value: "",
    },
    {
      name: "Ring Ceremony",
      value: "",
    },
    {
      name: "Reception",
      value: "",
    },
    {
      name: "Mehndi",
      value: "",
    },
    {
      name: "Haldi",
      value: "",
    },
    {
      name: "Rokka Ceremony",
      value: "",
    },
    {
      name: "Birthday",
      value: "",
    },
    {
      name: "Anniversary",
      value: "",
    },
    {
      name: "Pre Wedding Shoots ",
      value: "",
    },
    {
      name: "Portfolio Shoots ",
      value: "",
    },
    {
      name: "Model Shoots ",
      value: "",
    },
  ],
  Mehndi: [
    {
      name: "Bride Mehndi",
      value: "",
    },
    {
      name: "Family Mehndi",
      value: "",
    },
  ],
  Makeup: [
    {
      name: "Bride Makeup",
      value: "",
    },
    {
      name: "Family Makeup",
      value: "",
    },
  ],
  "Pandit Jee": [],
  Venue: [
    {
      name: "Veg Menu",
      value: "",
    },
    {
      name: "Non Veg Menu",
      value: "",
    },
    {
      name: "Hi-Tea",
      value: "",
    },
    {
      name: "Flat Lunch",
      value: "",
    },
    {
      name: "Breakfast",
      value: "",
    },
    {
      name: "Restaurent Lunch/Dinner",
      value: "",
    },
  ],
};
const SubCategoryDefault = {
  "Invitation Gift": [
    {
      name: "Invitation Card ",
      value: "",
    },
    {
      name: "Special Gift Hamper",
      value: "",
    },
  ],
  "Celebrities Management": [
    {
      name: "Local Singer ",
      value: "",
    },
    {
      name: "Bollywood Singer ",
      value: "",
    },
    {
      name: "Punjabi Singer ",
      value: "",
    },
    {
      name: "Bollywood Actor ",
      value: "",
    },
    {
      name: "Bollywood Actress ",
      value: "",
    },
  ],
  "Chaat Counter": [
    {
      name: "Per Chat Counter ",
      value: "",
    },
  ],
  "Pan Counter": [
    {
      name: "Basic Pan Counter",
      value: "",
    },
    {
      name: "Special Pan Counter ",
      value: "",
    },
  ],
  "Invitation Card": [
    {
      name: "Invitation Card",
      value: "",
    },
    {
      name: "Designer Invitation Card",
      value: "",
    },
  ],
  "Catering services": [
    {
      name: "Veg Per Plat",
      value: "",
    },
    {
      name: "Non Veg Per Plat ",
      value: "",
    },
    {
      name: "Flat Lunch ",
      value: "",
    },
    {
      name: "Hi-Tea",
      value: "",
    },
    {
      name: "Breakfast ",
      value: "",
    },
  ],
  "Fruit Counter": [
    {
      name: "Indian Fruits ",
      value: "",
    },
    {
      name: "Imported Fruits ",
      value: "",
    },
  ],
  Cake: [
    {
      name: "Normal Cake ",
      value: "",
    },
    {
      name: "Celebrity Cake ",
      value: "",
    },
    {
      name: "Designer Cake ",
      value: "",
    },
    {
      name: "Hanging Cake ",
      value: "",
    },
  ],
  "Bar Tenders": [
    {
      name: "Indian Male Bar Tender ",
      value: "",
    },
    {
      name: "Indian Female Bar Tender ",
      value: "",
    },
    {
      name: "Russian Male Bar Tender ",
      value: "",
    },
    {
      name: "Russian  Female Bar Tender ",
      value: "",
    },
  ],
  Anchor: [
    {
      name: "Wedding Achoring ",
      value: "",
    },
    {
      name: "Travel",
      value: "",
    },
    {
      name: "Stay",
      value: "",
    },
    {
      name: "Food",
      value: "",
    },
  ],
  Choreographer: [
    {
      name: "Wedding Choregrapher ",
      value: "",
    },
    {
      name: "Travel",
      value: "",
    },
    {
      name: "Stay",
      value: "",
    },
    {
      name: "Food",
      value: "",
    },
  ],
  DJ: [
    {
      name: "DJ Player",
      value: "",
    },
    {
      name: "Noraml DJ",
      value: "",
    },
    {
      name: "DJ With LED Screen & Perfomance Stage",
      value: "",
    },
  ],
  "Ghodi & Baggi": [
    {
      name: "Ghodi ",
      value: "",
    },
    {
      name: "Baggi",
      value: "",
    },
  ],
  Dhol: [
    {
      name: "Local Dhol",
      value: "",
    },
    {
      name: "Artist Dhol",
      value: "",
    },
  ],
};

const CategotiesListVenue = [
  {
    name: "Hotel",
    subCategories: [],
  },
  {
    name: "Resort",
    subCategories: [],
  },
  {
    name: "Farm House",
    subCategories: [],
  },
  {
    name: "Banquet Hall",
    subCategories: [],
  },
  {
    name: "Lawn",
    subCategories: [],
  },
  {
    name: "Destination Wedding",
    subCategories: [],
  },
];

const EditDecor = ({ setCurrState, productId }) => {
  const [deleteAlert, setDeleteAlaert] = useState(false);

  const [secondNumbers, setSecondNumbers] = useState([""]);
  const errorr = () => {};

  const uploadErrorr = () => {};
  const uploadSucsess = () => {};
  const editSucsess = () => {};
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  let [fileListMain, setFileListMain] = useState([]);
  const [fileListAlbum, setFileListAlbum] = useState([]);
  const [fileListBrochure, setFileListBrochure] = useState([]);
  const [fileListGallery, setFileListGallery] = useState([]);
  const [fileListMenu, setFileListMenu] = useState([]);
  const [mainImageDefault, setMainImagedefault] = useState([]);
  const [brochureImageDefault, setBrochureImagedefault] = useState([]);
  const [albumImageDefault, setAlbumdefault] = useState([]);
  const [menuImageDefault, setMenuImagedefault] = useState([]);
  const [galleryImageDefault, setGalleryImagedefault] = useState([]);
  const [additional, setAdditional] = useState({
    booking_amount: "",
    parking: "",
    rental_cost_per_plate: false,
    primary_venue_type: "",
    year_of_start: "",
    special_feature: "",
    veg_starting_price: "",
    nov_veg_starting_price: "",
    venue_type: [],
    rooms_in_accomodation: "",
    basic_starting_price: "",
    policy_on_catering: "",
    policy_on_decor: "",
    policy_on_dj: "",
    policy_on_alcohol: "",
    minimum_decor_price: "",
    policy_on_decor: "",
    policy_cancellation: "",
    minimum_advanced_booking: "",
  });

  const [state, setState] = React.useState({
    Indoor: false,
    Outdoor: false,
    Poolside: false,
    Terrace: false,
  });
  const { Poolside, Indoor, Outdoor, Terrace } = state;
  const [typeFilter, setTypeFilter] = useState([]);

  const handleChange = (event) => {
    let newArr = additional.venue_type;
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    if (event.target.checked) {
      newArr.push(event.target.name);
    } else {
      newArr = newArr.filter((item) => item !== event.target.name);
    }

    setAdditional({
      ...additional,
      venue_type: newArr,
    });
    setTypeFilter(newArr);
  };
  const [currentPass, setCurrentPass] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPassword2] = useState("");
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
      const data = await axios.put(
        `${PROXY}/vendoruser/updatewithpass`,
        {
          currentPassword: currentPass,
          password: Password,
        },
        {
          headers: {
            authorization: globleuser?.data?.token,
          },
        }
      );
      if (data.data.success) {
        alert("password changed successfully");
        setCurrentPass("");
        setPassword("");
        setPassword2("");
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
  //   const data = newFileList
  //   .filter((data) => data.url)
  //   .map((data) => data.url);
  const handleChangeBrochure = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 50000000000000) {
        setFileListBrochure(newFileList);
      } else {
        errorr();
      }
    } else {
      setFileListBrochure(newFileList);
      setBrochureImagedefault(null);
    }
  };

  const handleChangeGallery = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 50000000000000) {
        setFileListGallery(newFileList);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      setGalleryImagedefault(data);
      setFileListGallery(newFileList);
    }
  };

  const handleChangeMenu = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 50000000000000) {
        setFileListMenu(newFileList);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      setMenuImagedefault(data);
      setFileListMenu(newFileList);
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
  const uploadButton = (
    <div className={Styles.upload}>
      <FileUploadOutlinedIcon />
      <div>Upload</div>
    </div>
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState();
  const globleuser = useSelector(selectUser);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    termsandconditions: "",
    plans: [{ name: "", value: "" }],
    vidLinks: [""],
  });

  const setDefaultImages = (url, uid) => {
    return {
      uid,
      status: "done",
      url: `${S3PROXY}${url}`,
    };
  };

  const setDefaultImages1 = (data) => data.map((data) => `${S3PROXY}${data.url}`);


  useEffect(() => {
    if (localStorage.getItem("wedcell") !== null) {
      const config = {
        headers: {
          authorization: globleuser?.data?.token,
        },
      };
      setConfig(config);
    }

    (async () => {
      const result = await axios.post(
        `${PROXY}/decor/getall`,
        {
          _id: productId,
        },
        config
      );
      const resData = result.data.data[0];
      console.log("🚀 ~ file: EditDecor.js:865 ~ resData:", resData);
      if (resData.mainImage) {
        const data = setDefaultImages(resData.mainImage, 1);

        setFileListMain([data]);
        setMainImagedefault(data.url);
      }

      if (resData.albums?.length) {
        const album = [];
        const album2 = [];
        resData.albums.forEach((data) => {
          const al = {
            name: data.name,
            value: data.value.map((data2, key2) => {
              return setDefaultImages(data2, key2);
            }),
          };
          album.push(al);
          const al2 = {
            value: data.value.map((data2) => {
              return data2;
            }),
          };
          album2.push(al2);
        });
        setFileListAlbum(album);
        setAlbumdefault(album2);
      }

      setForm({
        ...resData,

        plans: JSON.parse(JSON.stringify(resData?.plans)),
        vidLinks: JSON.parse(JSON.stringify(resData?.vidLinks)),
      });
    })();
  }, [router, globleuser]);
  const onChangeAlbumHandler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].name = e.target.value;
    setFileListAlbum(newArr);
  };

  // useEffect(() => {

  // }, [form]);

  const addHandler = async () => {
    try {
      const formData = new FormData();

      form.name && formData.append("name", form.name);
      form.category && formData.append("category", form.category);
      formData.append("city", globleuser?.data?.city);

      form.description && formData.append("description", form.description);
      form.price &&
        formData.append(
          "price",
          /^\d+$/.test(form.price) ? parseInt(form.price) : 0
        );
      form.termsandconditions &&
        formData.append("termsandconditions", form.termsandconditions);

      form.plans && formData.append("plans", JSON.stringify(form.plans));
      form.vidLinks &&
        formData.append("vidLinks", JSON.stringify(form.vidLinks));
      fileListAlbum && formData.append("album", JSON.stringify(fileListAlbum));
      mainImageDefault && formData.append("mainLink", mainImageDefault);

      albumImageDefault &&
        formData.append("albumLink", JSON.stringify(albumImageDefault));

      if (fileListAlbum) {
        await Promise.all(
          fileListAlbum.map(async (item, key) => {
            await compressAndAppendFiles(item.value, formData, `album${key}`);
          })
        );
      }
      await compressAndAppendFiles(fileListMain, formData, "main");
      formData.append("_id", form._id);
      formData.append("vendorId", JSON.stringify(globleuser.data));
      formData.append("vendor_id", globleuser.data._id);

      // form.vendorId && formData.append("vendorId", JSON.stringify(form.vendorId));

      axios
        .put(`${PROXY}/decor/update`, formData, config)
        .then((res) => {
          alert("successfully updated");
          setCurrState("Listing");
        })
        .catch((e) => {
          console.error(e.message);
          uploadErrorr();
        });
    } catch (e) {
      alert(e);
    }
  };
  const [value, setValue] = useState("");
  const handleChangeNumber = (newValue, country) => {
    setValue(newValue);
    setForm({ ...form, contactPhone: newValue.replace(/[^\d]/g, "") });
  };
  const [currStep, setCurrentStep] = useState(1);

  return (
    <div className="bg-white py-2" style={{ width: "100%" }}>
      <div
        style={{ alignItems: "center", gap: "15px" }}
        className="form-title d-flex flex-column align-item-center"
      >
        <h5 style={{ color: "#b6255a" }}>Edit Decor</h5>
        <Steps totalSteps={4} currStep={currStep}></Steps>
      </div>
      <div className={Styles.form_container}>
        <ToastContainer />
        {currStep === 1 ? (
          <div className={Styles.borders}>
            <span>Listing</span>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
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
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
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
                onClick={() => {
                  const newArr = { name: "", value: "" };
                  const dummy = form;
                  dummy.plans.push(newArr);
                  setForm({ ...dummy });
                }}
                className={Styles.plus}
              >
                +
              </span>
            </span>
            <div className="row  mb-3">
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
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
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
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
                <div className={Styles.category_section}>
                  <br></br>
                  <TextField
                    multiline
                    rows={20}
                    fullWidth
                    onChange={(e) => {
                      setForm({
                        ...form,
                        termsandconditions: e.target.value,
                      });
                    }}
                    value={form?.termsandconditions}
                    type="text"
                    label="Terms and Conditions"
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
          {currStep == 5 ? (
            <></>
          ) : (
            <button
              className={Styles.nextButton}
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              Next
            </button>
          )}
          <button onClick={addHandler}>
            {isLoading ? <Spinner /> : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDecor;
