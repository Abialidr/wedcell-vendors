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
import Styles from "../../styles/Editlist.module.css";
import axios from "axios";
import { useRouter } from "next/router";
// import { PROXY } from "../../config";
import { PROXY, S3PROXY } from "../../config";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { ImageDelete } from "../Helpers/FileHandlers";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import compressAndAppendFiles from "../compressAndAppendFiles";
import MuiPhoneNumber from "material-ui-phone-number";
import { ToastContainer } from "react-toastify";
import {
  profileforVendorMusicVal,
  profileforVendorVal,
} from "../../yupValidations/SignupValidation";
import Steps from "../Steps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
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
const musicCat = {
  Anchor: ["Male Emcee", "Female Emcee"],
  Choreographer: [],
  DJ: ["Male dj", "Female dj", "Celebrity dj"],
  "Live band": [
    "Classical band",
    "Fusion band",
    "Indo- fusion band",
    "sufi/ Qawwali band",
    "Bollywood Rock band",
  ],
  "DJ based Band": [],
  "Male & Female Singer": [
    "Bollywood singer",
    "Punjabi singer",
    "solo singer",
    "Duo singer",
  ],
};
const CategotiesList = [
  {
    name: "Food",
    subCategories: [
      "Chaat Counter",
      "Fruit Counter",
      "Catering services",
      "Pan Counter",
      "Bar Tenders",
    ],
  },
  {
    name: "Music & Dance",
    subCategories: [
      "Anchor",
      "Choreographer",
      "DJ",
      "Live band",
      "DJ based Band",
      "Male & Female Singer",
      "Bride and Groom Entry",
    ],
  },
  {
    name: "Planning & Decor",
    subCategories: ["Wedding Decor"],
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
const VendorProfile = ({ query }) => {
  const [deleteAlert, setDeleteAlaert] = useState(false);
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
  const [fileListMenu, setFileListMenu] = useState([]);
  const [mainImageDefault, setMainImagedefault] = useState([]);
  const [brochureImageDefault, setBrochureImagedefault] = useState([]);
  const [albumImageDefault, setAlbumdefault] = useState([]);
  const [menuImageDefault, setMenuImagedefault] = useState([]);
  const [fileListGallery, setFileListGallery] = useState([]);

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
  const editable = true;
  const [status, setStatus] = useState(editable ? "Edit" : "Submit");
  const [config, setConfig] = useState();
  const [uploading, setUploading] = useState(false);
  const globleuser = useSelector(selectUser);
  const [form, setForm] = useState({
    subSubCategory: [],
    name: "",
    category: "",
    subCategory: "",
    company_name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    price: "",
    password: "",
    termsandconditions: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    country: "",
    secondNumbers: [],
    plans: [{ name: "", value: "" }],
    vidLinks: [""],
    bookedDate: [],
  });
  console.log("🚀 ~ file: VendorProfile.js:811 ~ form:", form);
  console.log(musicCat[form.subCategory], "sasasasassa");
  const classes = useStyles();
  // const { width } = useWindowDimensions();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const Div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const setDefaultImages = (url, uid) => {
    return {
      uid,
      status: "done",
      url: `${S3PROXY}${url}`,
    };
  };
  const setDefaultImages1 = (data) =>
    data.map((data) => `${S3PROXY}${data.url}`);
  const getdata = async () => {
    const res = globleuser;
    // .then((res) => {
    const resData = globleuser?.data;
    if (resData.brochure) {
      const data = resData.brochure.map((url, uid) => {
        return setDefaultImages(url, uid);
      });
      setFileListBrochure(data);
      setBrochureImagedefault(setDefaultImages1(data));
    }
    if (resData.mainImage) {
      const data = setDefaultImages(resData.mainImage, 1);
      setFileListMain([data]);
      setMainImagedefault(data.url);
    }
    if (resData.images?.length) {
      const data = resData.images.map((url, uid) => {
        return setDefaultImages(url, uid);
      });
      setFileListGallery(data);
      setGalleryImagedefault(setDefaultImages1(data));
    }
    if (resData.menu?.length) {
      const data = resData.menu.map((url, uid) => {
        return setDefaultImages(url, uid);
      });
      setFileListMenu(data);
      setMenuImagedefault(setDefaultImages1(data));
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
    console.log(
      "🚀 ~ file: VendorProfile.js:907 ~ //.then ~ resData:",
      resData
    );
    setForm({
      ...resData,
      secondNumbers: JSON.parse(JSON.stringify(resData?.secondNumbers)),
      plans: JSON.parse(JSON.stringify(resData?.plans)),
      vidLinks: JSON.parse(JSON.stringify(resData?.vidLinks)),
      vendorId: globleuser.data?._id,
    });
    setValue(resData.contactPhone);
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    const editable = true;
    if (localStorage.getItem("wedcell") !== null) {
      const config = {
        headers: {
          authorization: globleuser?.data?.token,
        },
      };
      setConfig(config);
    }
    if (editable) {
      getdata();
    } else {
      setForm({
        name: "",
        category: "",
        type: "",
        city: "",
        address: "",
        images: [],
        albums: [],
        brochure: [],
        menu: [],
        vendorId: globleuser.data?._id,
      });
      setIsLoading(false);
    }
  }, [editable, router, globleuser]);
  const onChangeAlbumHandler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].name = e.target.value;
    setFileListAlbum(newArr);
  };
  // useEffect(() => {
  // }, [form]);
  const addHandler = async () => {
    try {
      if (form.category === "Music & Dance") {
        await profileforVendorMusicVal.validate({
          ...form,
          fileListMain,
          fileListBrochure,
          fileListGallery,
          fileListAlbum,
          fileListMenu,
          price:
            form.category !== "Hotel" && form.category !== "Resort"
              ? "1"
              : form.price,
        });
      } else {
        await profileforVendorVal.validate({
          ...form,
          fileListMain,
          fileListBrochure,
          fileListGallery,
          fileListAlbum,
          fileListMenu,
          price:
            form.category !== "Hotel" && form.category !== "Resort"
              ? "1"
              : form.price,
        });
      }
      const formData = new FormData();
      // additional &&
      //   formData.append("additionalDetails", JSON.stringify(additional));
      form.name && formData.append("name", form.name);
      form.category && formData.append("category", form.category);
      form.subCategory && formData.append("subCategory", form.subCategory);
      form.password && formData.append("password", form.password);
      form.company_name && formData.append("company_name", form.company_name);
      form.zipcode && formData.append("zipcode", form.zipcode);
      form.city && formData.append("city", form.city);
      form.country && formData.append("country", form.country);
      form.state && formData.append("state", form.state);
      form.address && formData.append("address", form.address);
      // form.city && formData.append("city", form.city);
      // form.address && formData.append("address", form.address);
      // form.vendorId && formData.append("vendorId", form.vendorId);
      form.description && formData.append("description", form.description);
      form.contactEmail && formData.append("contactEmail", form.contactEmail);
      form.contactPhone && formData.append("contactPhone", form.contactPhone);
      // form.zipcode && formData.append("zipcode", form.zipcode);
      form.price &&
        formData.append(
          "price",
          /^\d+$/.test(form.price) ? parseInt(form.price) : 0
        );
      form.termsandconditions &&
        formData.append("termsandconditions", form.termsandconditions);
      form.secondNumbers &&
        formData.append("secondNumbers", JSON.stringify(form.secondNumbers));
      form.plans && formData.append("plans", JSON.stringify(form.plans));
      const today = dayjs().subtract(1, "day"); // Get the start of today to ensure whole day comparison
      const bd = form.bookedDate.filter((date) => {
        console.log(
          "🚀 ~ file: VendorProfile.js:993 ~ addHandler ~ today:",
          today
        );

        console.log(
          "🚀 ~ file: VendorProfile.js:1001 ~ bd ~ dayjs(date):",
          dayjs(date)
        );
        console.log(
          "🚀 ~ file: VendorProfile.js:1005 ~ bd ~ dayjs(date).isBefore(:",
          dayjs(date).isBefore(today, "day")
        );
        return dayjs(date).isAfter(today, "day");
      });
      console.log("🚀 ~ file: VendorProfile.js:994 ~ addHandler ~ bd:", bd);

      bd && formData.append("bookedDate", JSON.stringify(bd));
      form.vidLinks &&
        formData.append("vidLinks", JSON.stringify(form.vidLinks));
      editable && formData.append("_id", form._id);
      // form.vendorId && formData.append("vendorId", JSON.stringify(form.vendorId));
      fileListAlbum && formData.append("album", JSON.stringify(fileListAlbum));
      form.subSubCategory &&
        formData.append("subSubCategory", JSON.stringify(form.subSubCategory));
      mainImageDefault && formData.append("mainLink", mainImageDefault);
      galleryImageDefault &&
        formData.append("galleryLink", JSON.stringify(galleryImageDefault));
      albumImageDefault &&
        formData.append("albumLink", JSON.stringify(albumImageDefault));
      brochureImageDefault &&
        formData.append("brochureLink", brochureImageDefault);
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
      editable && formData.append("_id", form._id);
      // form.vendorId && formData.append("vendorId", JSON.stringify(form.vendorId));
      setStatus("Wait....Uploading");
      if (editable) {
        axios
          .put(`${PROXY}/vendoruser/update`, formData, config)
          .then((res) => {
            setStatus("Edit Done");
            setUploading(false);
            editSucsess();
            res.data.data.token = globleuser?.data?.token;
            dispatch(user(res.data));
            localStorage.setItem("wedcell", JSON.stringify(res.data));
            alert("Update Successful");
            setTimeout(() => {
              // location.reload();
              // router.push("/dashboard");
              setStatus("Edit");
            }, 3000);
          })
          .catch((e) => {
            console.error(e.message);
            setStatus("Error Occured");
            uploadErrorr();
            setUploading(false);
          });
      } else {
        axios
          .post(`${PROXY}/item/create`, formData, config)
          .then((res) => {
            setStatus("All Done");
            setUploading(false);
            uploadSucsess();
            setTimeout(() => {
              setStatus("Submit");
              // location.reload();
              router.push("/dashboard");
            }, 3000);
            // location.reload();
            router.push("/dashboard");
          })
          .catch((e) => {
            console.error(e.message);
            setStatus("Error Occured");
            uploadErrorr();
            setUploading(false);
          });
      }
    } catch (e) {
      alert(e);
      console.log(`🚀 ~ addHandler ~ e:`, e);
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
        <h5 style={{ color: "#b6255a" }}>Vendor Registration</h5>
        <Steps
          totalSteps={
            form.category === "Music & Dance"
              ? 4
              : form.category === "Planning & Decor"
              ? 3
              : 5
          }
          currStep={currStep}
        ></Steps>
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
                  label="Name of Vendor"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                <div className={Styles.category_section}>
                  <br></br>
                  <InputLabel id="demo-simple-select-helper-label12">
                    Category
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label12"
                    onChange={(e) => {
                      const formm = {};
                      console.log(
                        "🚀 ~ getdata ~ e.target.value:",
                        e.target.value
                      );
                      formm.category = e.target.value;
                      if (CategoryDefault[e.target.value] !== undefined) {
                        formm.plans = CategoryDefault[e.target.value];
                        if (e.target.value === "Pandit Jee") {
                          form.subCategory = "Pandit Jee";
                        } else {
                          form.subCategory = "";
                        }
                      } else {
                        formm.plans = [{ name: "", value: "" }];
                        form.subCategory = "";
                      }
                      setForm({ ...form, ...formm });
                    }}
                    id="category"
                    value={form?.category}
                  >
                    <MenuItem value={""} disabled>
                      --select--
                    </MenuItem>
                    {CategotiesList?.map((list, key) => (
                      <MenuItem key={list.name} value={list.name}>
                        {list.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                <div className={Styles.category_section}>
                  <br></br>
                  <InputLabel id="demo-simple-select-helper-label123">
                    SubCategory
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label123"
                    onChange={(e) => {
                      const formm = {};
                      formm.subCategory = e.target.value;
                      formm.subSubCategory = [];
                      if (SubCategoryDefault[e.target.value] !== undefined) {
                        formm.plans = SubCategoryDefault[e.target.value];
                      } else {
                        formm.plans = [{ name: "", value: "" }];
                      }
                      setForm({ ...form, ...formm });
                    }}
                    value={form.subCategory}
                  >
                    <MenuItem value={""} disabled>
                      --select--
                    </MenuItem>
                    {CategotiesList.map((list) =>
                      form?.category === list.name
                        ? list.subCategories.map((sub) => (
                            <MenuItem key={sub} value={sub}>
                              {sub}
                            </MenuItem>
                          ))
                        : ""
                    )}
                  </Select>
                </div>
              </div>
            </div>
            {form.category === "Music & Dance" && form.subCategory !== "" ? (
              <div className="row">
                <div className=" col-12">
                  <div className={Styles.category_section}>
                    <br></br>
                    <InputLabel id="demo-simple-select-helper-label123">
                      Sub Sub Category
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-helper-label123"
                      multiple
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                      onChange={(e) => {
                        setForm({ ...form, subSubCategory: e.target.value });
                      }}
                      value={form.subSubCategory}
                    >
                      <MenuItem value={""} disabled>
                        --select--
                      </MenuItem>
                      {musicCat[form.subCategory].map((list) => (
                        <MenuItem key={list} value={list}>
                          {list}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
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
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                <div className={Styles.category_section}>
                  <br></br>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setForm({ ...form, contactEmail: e.target.value });
                    }}
                    required
                    type="text"
                    value={form?.contactEmail}
                    label="Contact Email"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
                <br></br>
                <MuiPhoneNumber
                  value={value}
                  id="outlined-basic"
                  label="Mobile No"
                  variant="outlined"
                  fullWidth
                  defaultCountry={"in"}
                  onChange={handleChangeNumber}
                  onlyCountries={[
                    "ae",
                    "in",
                    "th",
                    "lk",
                    "id",
                    "ca",
                    "mv",
                    "vn",
                    "kh",
                    "ph",
                    "my",
                  ]}
                />
                {/* <TextField
              fullWidth
              onChange={(e) => {
                setForm({ ...form, contactPhone: e.target.value });
              }}
              required
              type='text'
              value={form?.contactPhone}
              label='Contact Number'
            /> */}
              </div>
            </div>
            <span className={Styles.label}>
              Second Contact
              <span
                className={Styles.plus}
                style={{ fontSize: "17px", marginLeft: "5px" }}
                onClick={() => {
                  const newArr = "";
                  const dummy = form;
                  dummy.secondNumbers.push(newArr);
                  setForm({ ...dummy });
                }}
              >
                +
              </span>
            </span>
            <div className="col-12">
              <br></br>
              {form?.secondNumbers?.map((data, key) => {
                return (
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="mt-2"
                  >
                    <div className="col-11">
                      <TextField
                        fullWidth
                        onChange={(e) => {
                          const dummy = form;
                          dummy.secondNumbers[key] = e.target.value;
                          setForm({ ...dummy });
                        }}
                        type="number"
                        value={data}
                      />
                    </div>
                    <div
                      className="col-1"
                      style={{ marginTop: -3, marginLeft: 10 }}
                    >
                      <span
                        onClick={() => {
                          const dummy = form;
                          dummy.secondNumbers.splice(key, 1);
                          setForm({ ...dummy });
                        }}
                        className="fs-5 cursor-pointer"
                      >
                        <RiDeleteBin6Line />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              booked Date
              <span
                onClick={() => {
                  const newArr = "";
                  const dummy = JSON.parse(JSON.stringify(form));

                  dummy.bookedDate.push("");
                  setForm({ ...dummy });
                }}
                className={Styles.plus}
              >
                +
              </span>
            </span>
            <div className="row  mb-3">
              {form?.bookedDate?.map((data, key) => {
                return (
                  <div className="row mt-2" key={key}>
                    <div className="col-8">
                      <br></br>
                      <LocalizationProvider
                        style={{
                          zIndex: "1401",
                        }}
                        dateAdapter={AdapterDayjs}
                      >
                        <DatePicker
                          style={{
                            zIndex: "1401",
                          }}
                          shouldDisableDate={(date) =>
                            date.isBefore(dayjs().subtract(1, "day"))
                          }
                          defaultValue={dayjs(data)}
                          onChange={(e) => {
                            const dummy = form;
                            dummy.bookedDate[key] = e.$d;
                            setForm({ ...dummy });
                            //   setorm({
                            //   ...form,
                            //   eventDate: e.$d,
                            // })}
                          }}
                        />
                      </LocalizationProvider>
                    </div>

                    <div className="col-1" style={{ marginTop: 30 }}>
                      <span
                        onClick={() => {
                          const dummy = JSON.parse(JSON.stringify(form));
                          dummy.bookedDate.splice(key, 1);
                          setForm({ ...dummy });
                        }}
                        className="fs-5 cursor-pointer"
                      >
                        <RiDeleteBin6Line />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : currStep == 2 ? (
          <div className={Styles.borders}>
            <span>Company Address</span>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-2">
              <div className={Styles.category_section}>
                <br></br>
                <TextField
                  onChange={(e) => {
                    setForm({
                      ...form,
                      address: e.target.value,
                    });
                  }}
                  value={form?.address}
                  fullWidth
                  type="text"
                  label="Address"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ">
                <div className={Styles.category_section}>
                  <br></br>
                  <TextField
                    onChange={(e) => {
                      setForm({
                        ...form,
                        country: e.target.value,
                      });
                    }}
                    fullWidth
                    value={form?.country}
                    type="text"
                    label="Country"
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                <div className={Styles.category_section}>
                  <br></br>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setForm({
                        ...form,
                        state: e.target.value,
                      });
                    }}
                    value={form?.state}
                    type="text"
                    label="State"
                  />
                </div>
              </div>
            </div>
            <div className="row  mb-2">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ">
                <div className={Styles.category_section}>
                  <br></br>
                  <Select
                    fullWidth
                    onChange={(e) => {
                      setForm({
                        ...form,
                        city: e.target.value,
                      });
                    }}
                    value={form?.city}
                  >
                    <MenuItem selected disabled>
                      ---Select---
                    </MenuItem>
                    {cities?.map((city) => {
                      return <MenuItem value={city}>{city}</MenuItem>;
                    })}
                  </Select>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                <div className={Styles.category_section}>
                  <br></br>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setForm({
                        ...form,
                        zipcode: e.target.value,
                      });
                    }}
                    value={form?.zipcode}
                    type="Number"
                    label="Pincode"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : currStep == 3 && form.category !== "Planning & Decor" ? (
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
              {form?.plans?.map((data, key) => {
                return (
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
                );
              })}
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
        ) : currStep == 4 &&
          form.category !== "Music & Dance" &&
          form.category !== "Planning & Decor" ? (
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
            {form.category !== "Planning & Decor" ? (
              <>
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
                <div className="mt-4">
                  <div className={Styles.category_section1}>
                    <span>Gallery</span>
                    <br></br>
                    <Upload
                      multiple
                      listType="picture-card"
                      fileList={fileListGallery}
                      onPreview={handlePreview}
                      onChange={handleChangeGallery}
                    >
                      {uploadButton}
                    </Upload>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6 mt-4">
                  <div className={Styles.category_section1}>
                    <span>Brochure</span>
                    <br></br>
                    <Upload
                      listType="picture-card"
                      fileList={fileListBrochure}
                      onPreview={handlePreview}
                      onChange={handleChangeBrochure}
                    >
                      {fileListBrochure.length >= 1 ? null : uploadButton}
                    </Upload>
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
                </div>{" "}
              </>
            ) : form.category == "Planning & Decor" ? (
              <>
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
              </>
            ) : (
              <></>
            )}
            {form.category !== "Planning & Decor" ? (
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
            ) : (
              <></>
            )}
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
          {currStep == 5 ||
          (currStep == 4 && form.category === "Music & Dance") ||
          (currStep == 3 && form.category === "Planning & Decor") ? (
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
            {isLoading ? <Spinner /> : "Update Profile"}
          </button>
        </div>
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
              Once you confirm, all of your account data will be permanently
              deleted.
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
                `${PROXY}/vendoruser/delete/${globleuser.data._id}`,
                {
                  headers: {
                    authorization: globleuser.data.token,
                  },
                }
              );
              console.log("🚀 ~ onClick={ ~ res:", res);
              if (res.data.success) {
                alert("we are sad to let you go\nuser deleted successfully");
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
      <Modal
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
      </Modal>
    </div>
  );
};
export default VendorProfile;
