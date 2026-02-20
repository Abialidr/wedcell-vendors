import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { profileforVenueVal } from "../../yupValidations/SignupValidation";
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
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import compressAndAppendFiles from "../compressAndAppendFiles";
import MuiPhoneNumber from "material-ui-phone-number";
import Steps from "../Steps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const VenueProfile = ({ query }) => {
  const [deleteAlert, setDeleteAlaert] = useState(false);
  const errorr = () => {};
  const [secondNumbers, setSecondNumbers] = useState([""]);

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
  const [fileListLMenu, setFileListLMenu] = useState([]);
  const [brochureImageDefault, setBrochureImagedefault] = useState([]);
  const [albumImageDefault, setAlbumdefault] = useState([]);
  const [menuImageDefault, setMenuImagedefault] = useState([]);
  const [lMenuImageDefault, setLMenuImagedefault] = useState([]);
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
        `${PROXY}/venueuser/updatewithpass`,
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
  const handleChangeLMenu = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 50000000000000) {
        setFileListLMenu(newFileList);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      setLMenuImagedefault(data);
      setFileListLMenu(newFileList);
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
  const [disable, setDisable] = useState(false);
  const [vidLinks, setVidLinks] = useState([""]);
  const [amenities, setAmenities] = useState([{ name: "", min: "", max: "" }]);
  const [plans, setPlans] = useState([{ name: "", value: "" }]);
  const [features, setFeatures] = useState([{ name: "", value: false }]);
  const [deleting, setDeleting] = useState(false);
  const [allowedVendors, setAllowedVendors] = useState([
    { name: "Decor", value: false },
    { name: "DJ", value: false },
    { name: "Cake", value: false },
    { name: "Liquor", value: false },
    { name: "Pan Counter", value: false },
  ]);
  const globleuser = useSelector(selectUser);
  console.log(`🚀 ~ file: VenueProfile.js:422 ~ globleuser:`, globleuser);
  const [form, setForm] = useState({
    name: "",
    category: "",
    subCategory: "",
    company_name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    price: "",
    vegPerPlate: "",
    nonVegPerPlate: "",
    password: "",
    termsandconditions: "",
    allowedVendors: [],
    address: "",
    state: "",
    city: "",
    zipcode: "",
    country: "",
    totalRooms: "",
    totalBanquet: "",
    totalLawns: "",
    amenities: [{ name: "", min: "", max: "", layout: [], sqaurefeet: "" }],
    secondNumbers: [],
    features: [{ name: "", value: false }],
    plans: [{ name: "", value: "" }],
    vidLinks: [""],
  });
  console.log(`🚀 ~ file: VenueProfile.js:455 ~ form:`, form);
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

  const setDefaultImages1 = (data) => data.map((data) => `${S3PROXY}${data.url}`);

  const getdata = async () => {
    // .then((res) => {

    const resData = globleuser?.data;
    console.log("🚀 ~ //.then ~ resData:", resData);

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
    if (resData.lmenu?.length) {
      let data;
      console.log("🚀 ~ //.then ~ typeof lmenu:", typeof lmenu);
      if (typeof resData.lmenu == "string") {
        data = setDefaultImages(resData.lmenu, 1);
        setFileListLMenu([data]);
        setLMenuImagedefault(data.url);
      } else {
        data = resData.lmenu?.map((url, uid) => {
          return setDefaultImages(url, uid);
        });
        setFileListLMenu(data);
        setLMenuImagedefault(setDefaultImages1(data));
      }
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
      secondNumbers: JSON.parse(JSON.stringify(resData?.secondNumbers)),
      plans: JSON.parse(JSON.stringify(resData?.plans)),
      vidLinks: JSON.parse(JSON.stringify(resData?.vidLinks)),
      allowedVendors: JSON.parse(JSON.stringify(resData?.allowedVendors)),
      amenities: JSON.parse(JSON.stringify(resData?.amenities)),
      features: JSON.parse(JSON.stringify(resData?.features)),
      vendorId: globleuser.data?._id,
    });
    setValue(resData.contactPhone);
    setSecondNumbers(resData?.secondNumbers);
    setAmenities(resData?.amenities);
    setPlans(resData?.plans);
    setFeatures(resData?.features);
    setVidLinks(resData?.vidLinks);
    setIsLoading(false);
    setAllowedVendors(resData.allowedVendors);
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
      await profileforVenueVal.validate({
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
      // setUploading(true);

      const fileListAlbum1 = fileListAlbum.map((data) => {
        return {
          name: data.name,
          value: data.value.map((data, key) => key),
        };
      });

      const formData = new FormData();
      form.name && formData.append("name", form.name);
      form.category && formData.append("category", form.category);
      form.password && formData.append("password", form.password);
      form.company_name && formData.append("company_name", form.company_name);
      form.zipcode && formData.append("zipcode", form.zipcode);
      form.city && formData.append("city", form.city);
      form.country && formData.append("country", form.country);
      form.state && formData.append("state", form.state);
      form.address && formData.append("address", form.address);
      form.description && formData.append("description", form.description);
      form.contactEmail && formData.append("contactEmail", form.contactEmail);
      form.contactPhone && formData.append("contactPhone", form.contactPhone);
      form.price &&
        formData.append(
          "price",
          /^\d+$/.test(form.price) ? parseInt(form.price) : 0
        );
      form.totalRooms && formData.append("totalRooms", form.totalRooms);
      form.totalBanquet && formData.append("totalBanquet", form.totalBanquet);
      form.totalLawns && formData.append("totalLawns", form.totalLawns);
      form.vegPerPlate && formData.append("vegPerPlate", form.vegPerPlate);
      form.nonVegPerPlate &&
        formData.append("nonVegPerPlate", form.nonVegPerPlate);
      form.termsandconditions &&
        formData.append("termsandconditions", form.termsandconditions);

      form.allowedVendors &&
        formData.append("allowedVendors", JSON.stringify(form.allowedVendors));
      form.secondNumbers &&
        formData.append("secondNumbers", JSON.stringify(form.secondNumbers));
      form.features &&
        formData.append("features", JSON.stringify(form.features));
      form.plans && formData.append("plans", JSON.stringify(form.plans));
      form.vidLinks &&
        formData.append("vidLinks", JSON.stringify(form.vidLinks));

      fileListAlbum && formData.append("album", JSON.stringify(fileListAlbum1));

      mainImageDefault && formData.append("mainLink", mainImageDefault);
      galleryImageDefault &&
        formData.append("galleryLink", JSON.stringify(galleryImageDefault));
      albumImageDefault &&
        formData.append("albumLink", JSON.stringify(albumImageDefault));

      menuImageDefault &&
        formData.append("menuLink", JSON.stringify(menuImageDefault));
      lMenuImageDefault &&
        formData.append("lmenuLink", JSON.stringify(lMenuImageDefault));
      brochureImageDefault &&
        formData.append("brochureLink", brochureImageDefault);

      // fileListAlbum &&
      //   fileListAlbum.forEach((item, key) => {
      //     item.value.forEach((data) =>
      //       formData.append(`album${key}`, data.originFileObj)
      //     );
      //   });
      // fileListMenu &&
      //   fileListMenu.forEach((item, key) => {
      //     formData.append("menu", item.originFileObj);
      //   });
      // fileListBrochure &&
      //   fileListBrochure.forEach((item, key) => {
      //     formData.append("brochure", item.originFileObj);
      //   });
      // fileListGallery &&
      //   fileListGallery.forEach((item, key) => {
      //     formData.append("gallery", item.originFileObj);
      //   });
      // fileListMain &&
      //   fileListMain.forEach((item, key) => {
      //     formData.append("main", item.originFileObj);
      //   });
      if (fileListAlbum) {
        await Promise.all(
          fileListAlbum.map(async (item, key) => {
            await compressAndAppendFiles(
              item.value,
              formData,
              `album${key}`,
              "qwqwq"
            );
          })
        );
      }

      const am = await Promise.all(
        form.amenities.map(async (item, key) => {
          console.log(
            `🚀 ~ file: VenueProfile.js:695 ~ a.map ~ item:`,
            !item?.layout[0]?.url,
            item?.layout
          );
          const i = JSON.parse(JSON.stringify(item));
          if (!item?.layout[0]?.url) {
            console.log(
              `🚀 ~ file: VenueProfile.js:710 ~ a.map ~ i?.layout,:`,
              i?.layout
            );
            await compressAndAppendFiles(
              item?.layout,
              formData,
              `amenities${key}`,
              "amen"
            );
            delete i.layout;
          } else {
            i.layout = item.layout[0].url;
          }
          return i;
        })
      );

      am && formData.append("amenities", JSON.stringify(am));

      await compressAndAppendFiles(fileListMenu, formData, "menu", "menu");
      await compressAndAppendFiles(fileListLMenu, formData, "lmenu", "lmenu");
      await compressAndAppendFiles(
        fileListGallery,
        formData,
        "gallery",
        "gallery"
      );
      await compressAndAppendFiles(fileListMain, formData, "main", "main");
      await compressAndAppendFiles(
        fileListBrochure,
        formData,
        "brochure",
        "brochure"
      );
      // submitItem.brochure = brochure;
      // submitItem.images = galleryImages;
      // submitItem.albums = albums;
      // menu && type === "Venue" ? (submitItem.menu = menu) : null;
      // amenities && type === "Venue" ? (submitItem.amenities = amenities) : null;
      // features && type === "Venue" ? (submitItem.features = features) : null;
      // submitItem.mainImage = mainImage;
      // if (!submitItem.name?.length) {
      //   return alert("Please fill name");
      // }
      // if (!submitItem.type?.length) {
      //   return alert("Please fill type");
      // }
      // if (!submitItem.category?.length) {
      //   return alert("Please fill category");
      // }
      // if (!submitItem.address?.length) {
      //   return alert("Please fill address");
      // }
      // if (!submitItem.city?.length) {
      //   return alert("Please fill city");
      // }
      // if (
      //   !fileListMain.length ||
      //   !form.type ||
      //   !form.city ||
      //   !form.category ||
      //   !form.name ||
      //   !form.description ||
      //   !form.contactEmail ||
      //   !form.contactPhone ||
      //   !form.address ||
      //   !form.zipcode ||
      //   !form.price ||
      //   !form.plans.length ||
      //   !form.termsandconditions ||
      //   !fileListGallery.length ||
      //   !fileListBrochure.length ||
      //   !fileListAlbum.length ||
      //   !form.vidLinks.length
      // ) {
      //   return alert("Fill All Fields In The Form");
      // }
      // if (form.type === "Vendor" && !form.subCategory) {
      //   return alert("Fill All Fields In The Form");
      // }
      // if (
      //   form.type === "Venue" &&
      //   (!form.amenities.length ||
      //     !form.allowedVendors.length ||
      //     !form.features.length ||
      //     !fileListMenu.length ||
      //     !form.vegPerPlate ||
      //     !form.nonVegPerPlate)
      // ) {
      //   return alert("Fill All Fields In The Form");
      // }

      axios
        .put(`${PROXY}/venueuser/update`, formData, config)
        .then((res) => {
          setStatus("Edit Done");
          setUploading(false);
          editSucsess();
          res.data.data.token = globleuser?.data?.token;
          res.data.role = globleuser?.role;
          const data = JSON.parse(JSON.stringify(res.data));
          if (data.data.amenities.length) {
            const am = data.data.amenities.map((dat, key) => {
              let d = JSON.parse(JSON.stringify(dat));
              if (dat.layout) {
                d.layout = [
                  {
                    uid: key,
                    status: "done",
                    url: dat.layout,
                  },
                ];
              }
              return d;
            });
            data.data.amenities = am;
          }
          dispatch(user(data));

          localStorage.setItem("wedcell", JSON.stringify(data));
          alert("Update Successful");
          setTimeout(() => {
            // location.reload();
            router.push("/dashboard");
            setStatus("Edit");
          }, 3000);
        })
        .catch((e) => {
          console.error(e.message);
          setStatus("Error Occured");
          uploadErrorr();
          setUploading(false);
        });
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
    <div
      className="bg-white py-2 "
      style={{
        width: "100%",
        marginTop: window.innerWidth > 900 ? "20px" : "",
        borderRadius: "10px",
      }}
    >
      <h5 className="text-center"></h5>

      <div
        style={{ alignItems: "center", gap: "15px" }}
        className="form-title d-flex flex-column align-item-center"
      >
        <h5 style={{ color: "#b6255a" }}>Venue Profile</h5>
        <Steps totalSteps={6} currStep={currStep}></Steps>
      </div>
      <div className={Styles.form_container}>
        {/* <div className="row">
          <div className="col-xl-12 col-lg-12 col-12 col-sm-12 col-12">
            <div className={Styles.category_section}>
              <br></br>
              <TextField
                fullWidth
                onChange={(e) => {
                  setForm({ ...form, company_name: e.target.value });
                }}
                type="text"
                value={form?.company_name}
                label="Name of Listing"
              />
            </div>
          </div>
        </div> */}
        {currStep === 1 ? (
          <div className={Styles.borders}>
            <span>Listing</span>
            <div className="row">
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
              <div className="col-xl-12 col-lg-12 col-12 col-sm-12 col-12 mt-3">
                <div className={Styles.category_section}>
                  <InputLabel>Category</InputLabel>
                  <br></br>

                  <Select
                    fullWidth
                    onChange={(e) => {
                      setForm({ ...form, category: e.target.value });
                    }}
                    id="category"
                    value={form?.category}
                  >
                    <MenuItem
                      value={""}
                      disabled
                      // selected={editable ? false : true}
                    >
                      --select--
                    </MenuItem>
                    {CategotiesListVenue.map((list, key) => (
                      <MenuItem key={list.name} value={list.name}>
                        {list.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
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
              <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
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
              <div
                style={{
                  width: window.innerWidth > 900 ? "" : "100%",
                }}
                className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6"
              >
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
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "20px",
              }}
              className={Styles.label}
            >
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
              {form?.secondNumbers?.map((data, key) => {
                return (
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="mt-2"
                  >
                    <div className=" col-11">
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
          </div>
        ) : currStep == 2 ? (
          <div className={Styles.borders}>
            <span>Company Address</span>
            <div className="col-xl-12 col-lg-12 col-12 col-sm-12 col-12 mb-2">
              <div className={Styles.category_section}>
                <br></br>
                <TextField
                  fullWidth
                  onChange={(e) => {
                    setForm({
                      ...form,
                      address: e.target.value,
                    });
                  }}
                  value={form?.address}
                  type="text"
                  label="Address"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6 ">
                <div className={Styles.category_section}>
                  <br></br>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setForm({
                        ...form,
                        country: e.target.value,
                      });
                    }}
                    value={form?.country}
                    type="text"
                    label="Country"
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
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
              <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6 ">
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
                  {/* <TextField
                fullWidth
                onChange={(e) => {
                  setForm({
                    ...form,
                    city: e.target.value,
                  });
                }}
                value={form?.city}
                type="text"
                label="City"
              /> */}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
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
        ) : currStep == 3 ? (
          <div className={Styles.borders}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className={Styles.label}
            >
              Amenities / Halls
              <span
                onClick={() => {
                  const newArr = {
                    name: "",
                    min: "",
                    max: "",
                    layout: [],
                    sqaurefeet: "",
                  };
                  const dummy = form;
                  dummy.amenities.push(newArr);
                  setForm({ ...dummy });
                }}
                className={Styles.plus}
              >
                +
              </span>
            </span>
            {form?.amenities.map((data, key) => {
              console.log(
                `🚀 ~ file: VenueProfile.js:1153 ~ {form?.amenities.map ~ data:`,
                data
              );

              return (
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <div style={{ width: "50%" }}>
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        const dummy = form;
                        dummy.amenities[key].name = e.target.value;
                        setForm({ ...dummy });
                      }}
                      type="text"
                      value={data.name}
                      label="Name"
                    />
                  </div>
                  <div>
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        const dummy = form;
                        dummy.amenities[key].min = e.target.value;
                        setForm({ ...dummy });
                      }}
                      type="number"
                      value={data.min}
                      label="Minimum Capacity"
                    />
                  </div>
                  <div>
                    <br></br>
                    <TextField
                      fullWidth
                      type="number"
                      onChange={(e) => {
                        const dummy = form;
                        dummy.amenities[key].max = e.target.value;
                        setForm({ ...dummy });
                      }}
                      value={data.max}
                      label="Maximum Capacity"
                    />
                  </div>
                  <div>
                    <br></br>
                    <TextField
                      type="number"
                      fullWidth
                      onChange={(e) => {
                        const dummy = form;
                        dummy.amenities[key].sqaurefeet = e.target.value;
                        setForm({ ...dummy });
                      }}
                      value={data.sqaurefeet}
                      label="Sqaure Feet"
                    />
                  </div>
                  <div>
                    <br></br>
                    <Upload
                      listType="picture-card"
                      fileList={data.layout}
                      onPreview={handlePreview}
                      onChange={({ fileList: newFileList, file }) => {
                        console.log(
                          `🚀 ~ file: VenueProfile.js:1287 ~ {form?.amenities.map ~ newFileList:`,
                          newFileList
                        );
                        const dummy = form;
                        dummy.amenities[key].layout = newFileList;
                        setForm({ ...dummy });
                      }}
                    >
                      {data.layout?.length ? null : uploadButton}
                    </Upload>
                  </div>
                  {form?.amenities.length > 1 ? (
                    <span
                      onClick={() => {
                        const dummy = form;
                        dummy.amenities.splice(key, 1);
                        setForm({ ...dummy });
                      }}
                      className="fs-5 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
            <span style={{ marginTop: "20px" }}>Vendor Allow Policy</span>
            <div className="row mt-3 mb-1">
              <div className="col-3">
                <span className={Styles.vendorAllow}>Vendor Name</span>
                <br></br>
              </div>
              <div className="col-3">
                <span className={Styles.vendorAllow}>
                  Allowed / Not Allowed
                </span>
                <br></br>
              </div>
            </div>
            {form?.allowedVendors.map((data, key) => (
              <div className="row mt-3 mb-3" key={key}>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="col-3"
                >
                  <span
                    style={{ fontWeight: "400" }}
                    className={Styles.vendorAllow}
                  >
                    {data.name}
                  </span>
                </div>
                <div
                  // style={{ display: 'flex', justifyContent: 'center' }}
                  className="col-3"
                >
                  <Checkbox
                    fullWidth
                    type="checkbox"
                    onChange={(e) => {
                      const dummy = form;
                      dummy.allowedVendors[key].value = e.target.checked;
                      setForm({ ...dummy });
                    }}
                    checked={data.value}
                  />
                </div>
              </div>
            ))}

            {form?.category === "Hotel" || form?.category === "Resort" ? (
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
                      label="Room Price"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
                <div className={Styles.category_section}>
                  <br></br>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setForm({ ...form, vegPerPlate: e.target.value });
                    }}
                    type="text"
                    value={form?.vegPerPlate}
                    label="Veg Platter Price (in ₹)"
                  />
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
                <br></br>
                <TextField
                  fullWidth
                  onChange={(e) => {
                    setForm({ ...form, nonVegPerPlate: e.target.value });
                  }}
                  value={form?.nonVegPerPlate}
                  type="text"
                  label="NonVeg Platter Price (in ₹)"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
                <div className={Styles.category_section}>
                  <br></br>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setForm({ ...form, totalRooms: e.target.value });
                    }}
                    type="text"
                    value={form?.totalRooms}
                    label="Total Rooms"
                  />
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
                <br></br>
                <TextField
                  fullWidth
                  onChange={(e) => {
                    setForm({ ...form, totalBanquet: e.target.value });
                  }}
                  value={form?.totalBanquet}
                  type="text"
                  label="Total Banquets"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
                <br></br>
                <TextField
                  fullWidth
                  onChange={(e) => {
                    setForm({ ...form, totalLawns: e.target.value });
                  }}
                  value={form?.totalLawns}
                  type="text"
                  label="Total Lawns"
                />
              </div>
            </div>
          </div>
        ) : currStep === 4 ? (
          <div className={Styles.borders}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "17px",
              }}
              className={Styles.label}
            >
              Features
              <span
                onClick={() => {
                  const newArr = { name: "", value: "" };
                  const dummy = form;
                  dummy.features.push(newArr);
                  setForm({ ...dummy });
                }}
                className={Styles.plus}
              >
                +
              </span>
            </span>
            {form?.features?.map((data, key) => (
              <div className="row mt-1 mb-3" key={key}>
                <div className="col-10">
                  <br></br>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      const dummy = form;
                      dummy.features[key].name = e.target.value;
                      setForm({ ...dummy });
                    }}
                    value={data.name}
                    type="text"
                    label="Name"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                  className="col-1"
                >
                  <span className={Styles.vendorAllow2}>Available</span>
                  <Checkbox
                    style={{ height: "10px" }}
                    fullWidth
                    type="checkbox"
                    onChange={(e) => {
                      const dummy = form;
                      dummy.features[key].value = e.target.checked;
                      setForm({ ...dummy });
                    }}
                    checked={data.value}
                  />
                </div>
                <div
                  className="col-1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    onClick={() => {
                      const dummy = form;
                      dummy.features.splice(key, 1);
                      setForm({ ...dummy });
                    }}
                    className="fs-5 cursor-pointer"
                  >
                    <RiDeleteBin6Line />
                  </span>
                </div>
              </div>
            ))}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "17px",
                marginTop: "20px",
              }}
              className={Styles.label}
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
                <div className="row mb-3" key={key}>
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
          </div>
        ) : currStep == 5 ? (
          <div className={Styles.borders}>
            <span>Terms & Conditions</span>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-12 col-sm-12 col-12">
                <div className={Styles.category_section}>
                  <br></br>
                  <TextField
                    multiline
                    fullWidth
                    rows={25}
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
            <div className="row mt-4">
              <div className="col-12">
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
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-12 col-sm-12 col-12 mt-4">
                <div className={Styles.category_section1}>
                  <span className={Styles.label}>Menu</span>
                  <br></br>
                  <Upload
                    multiple
                    listType="picture-card"
                    fileList={fileListMenu}
                    onPreview={handlePreview}
                    onChange={handleChangeMenu}
                  >
                    {fileListMenu.length >= 1 ? null : uploadButton}
                  </Upload>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-12 col-sm-12 col-12 mt-4">
                <div className={Styles.category_section1}>
                  <span className={Styles.label}>Liqour Menu</span>
                  <br></br>
                  <Upload
                    multiple
                    listType="picture-card"
                    fileList={fileListLMenu}
                    onPreview={handlePreview}
                    onChange={handleChangeLMenu}
                  >
                    {fileListLMenu.length >= 1 ? null : uploadButton}
                  </Upload>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className={Styles.category_section1}>
                <span className={Styles.label}>Gallery</span>
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
                <span className={Styles.label}>Brochure</span>
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
                onClick={() => {
                  const newitem = { name: "", value: [] };
                  setFileListAlbum((old) => [...old, newitem]);
                }}
                className={Styles.plus}
              >
                +
              </span>
            </span>
            <br></br>
            <div className="row">
              {fileListAlbum.map((album, key) => (
                <div key={key}>
                  <div className="row mt-3 mb-3">
                    <div className="col-10">
                      <TextField
                        fullWidth
                        type="text"
                        onChange={onChangeAlbumHandler(key)}
                        label="Album name"
                        value={album.name}
                      />
                    </div>
                    <div className="col-2" style={{ marginTop: 10 }}>
                      {deleting ? (
                        <Spinner />
                      ) : (
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
                      )}
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
              <div className="col-12">
                <div className={Styles.category_section}>
                  <br />
                  {form?.vidLinks.map((data, key) => (
                    <div className="row mt-3 mb-3" key={key}>
                      <div className="col-10">
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
                      <div className="col-2" style={{ marginTop: 10 }}>
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
          {currStep == 6 ? (
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
                `${PROXY}/venueuser/delete/${globleuser?.data?._id} `,
                config
              );
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

export default VenueProfile;
