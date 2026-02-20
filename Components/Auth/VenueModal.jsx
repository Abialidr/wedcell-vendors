import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROXY } from "../../config";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import Styles from "../../styles/Editlist.module.css";
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
  InputLabel,
  MenuItem,
  Modal,
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
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { RiDeleteBin6Line } from "react-icons/ri";
import compressFiles from "../compressAndAppendFiles.js";
import Steps from "../Steps.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VenueModal = ({ openModal }) => {
  const [deleteAlert, setDeleteAlaert] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    padding: "20px",

    display: "flex",
    borderRadius: "10px",
    height: "fit-content",
    maxHeight: "90vh",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
    paddingBottom: "40px",
  };
  const globleuser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  let [fileListMain, setFileListMain] = useState([]);
  const [fileListBrochure, setFileListBrochure] = useState([]);
  const [fileListGallery, setFileListGallery] = useState([]);
  const [fileListAlbum, setFileListAlbum] = useState([]);
  const [fileListMenu, setFileListMenu] = useState([]);
  const [fileListLMenu, setFileListLMenu] = useState([]);
  const [mainImageDefault, setMainImagedefault] = useState([]);
  const [brochureImageDefault, setBrochureImagedefault] = useState([]);
  const [albumImageDefault, setAlbumdefault] = useState([]);
  const [menuImageDefault, setMenuImagedefault] = useState([]);
  const [galleryImageDefault, setGalleryImagedefault] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
    totalRooms: "",
    totalBanquet: "",
    totalLawns: "",
    allowedVendors: [
      { name: "Decor", value: false },
      { name: "DJ", value: false },
      { name: "Cake", value: false },
      { name: "Liquor", value: false },
      { name: "Pan Counter", value: false },
    ],
    company_address: {
      address1: "",
      address2: "",
      landmark: "",
      state: "",
      city: "",
      pincode: "",
      country: "",
    },
    amenities: [{ name: "", min: "", max: "", layout: [], sqaurefeet: "" }],
    secondNumbers: [],
    features: [
      { name: "Wi-Fi", value: false },
      { name: "Swimming pool", value: false },
      { name: "Laundry", value: false },
      { name: "Room service", value: false },
      { name: "Fitness center", value: false },
      { name: "Breakfast", value: false },
      { name: "Housekeeping", value: false },
      { name: "Spa", value: false },
      { name: "Parking", value: false },
      { name: "Valet parking", value: false },
      { name: "Hair dryer", value: false },
      { name: "Restaurant", value: false },
      { name: "Minibar", value: false },
      { name: "Personal care products", value: false },
      { name: "Slippers", value: false },
      { name: "Towel", value: false },
      { name: "Shaving kit", value: false },
      { name: "Bathrobes", value: false },
      { name: "Free breakfast", value: false },
      { name: "Smart TV", value: false },
      { name: "Pet-friendly hotels", value: false },
      { name: "Concierge", value: false },
      { name: "Air conditioning", value: false },
      { name: "Iron and Ironing Board", value: false },
    ],
    plans: [{ name: "", value: "" }],
    vidLinks: [""],
  });
  useEffect(() => {
    setForm({
      ...form,
      termsandconditions:
        "Booking & Payment\n\n•    Advance: 50% of total Fee to be paid for booking the venue\n•    Remaining Booking Amount: to be paid at least 30 days prior to the event date(100% Booking Fee).\n•    Tax as applicable.\n•    Bookings are done on first come first server basis.\n•    Booking Confirmation Receipt will be given to client after Advance booking.\n•    Payment Mode: Cash, Bank Transfer(NEFT), Demand Draft are accepted.\n\nFacilities:\n\n•    Banquet Timings: Morning 8 a.m – 5 a.m & Evening 7 Pm till  Next Day (Extra charges for additional hours).\n•    Client must inspect the premises prior to taking possession. Similarly the venue is expected to be vacated in the same condition as it was handover to them.\n•    Client will be fully responsible for all liabilities, including food or any damage to the building, carpeting, equipments or other furnishings.\n•    Damage repair charges will be evaluated as per present market value & to be deducted from the Security deposit.\n•    Management is not responsible for any mishap. Natural Calamities and theft.\n•    Music system: 5 p.m- 10 p.m sharp.\n•    For DJ/Orchestra/ Any musical arrangement, guest has to arrange all valid licenses & permission . Asmi shall take no responsibility for the same.\n•    All statutory permission (police, sound, excise etc.) will sole responsibility of client, copy of such permission will have to be presented in the office before 3 days of the event.\n•    Smoking or Spitting of paan, gutkhas and other tobacco consumption is strictly prohibited inside the banquet premises.\n•    Spitting in the venue would attract the penalty of Rs.1,000/-.\n•    Venue representatives have the exclusive rights to restrict entry of certain guests into the premises.\n•    No animals and pets are permitted in the premises.\n•    Firearms and weapons are not allowed in the premises.\n•    Fireworks & firecrackers are strictly prohibited.",
      plans: CategoryDefault["Venue"],
    });
  }, []);
  const [timer, setTimer] = useState(30); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, timer]);
  const [state, setState] = useState({
    Indoor: false,
    Outdoor: false,
    Poolside: false,
    Terrace: false,
  });

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

  const errorr = () => {
    alert("error");
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
  const onChangeAlbumHandler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].name = e.target.value;
    setFileListAlbum(newArr);
  };

  const addHandler = async () => {
    // setUploading(true);

    const fileListAlbum1 = fileListAlbum.map((data) => {
      return {
        name: data.name,
        value: data.value.map((data, key) => key),
      };
    });

    const formData = new FormData();
    setIsLoading(true);
    form.name && formData.append("name", form.name);
    formData.append("id", globleuser.data._id);
    form.category && formData.append("category", form.category);
    form.company_name && formData.append("company_name", form.company_name);
    form.company_address.pincode &&
      formData.append("zipcode", form.company_address.pincode);
    form.company_address.city &&
      formData.append("city", form.company_address.city);
    form.company_address.country &&
      formData.append("country", form.company_address.country);
    form.company_address.state &&
      formData.append("state", form.company_address.state);
    form.company_address.address1 &&
      formData.append("address", form.company_address.address1);
    form.description && formData.append("description", form.description);
    form.contactEmail && formData.append("contactEmail", form.contactEmail);
    form.price &&
      formData.append(
        "price",
        /^\d+$/.test(form.price) ? parseInt(form.price) : 0
      );
    // -----------------------------------------------
    form.totalRooms && formData.append("totalRooms", form.totalRooms);
    form.totalBanquet && formData.append("totalBanquet", form.totalBanquet);
    form.totalLawns && formData.append("totalLawns", form.totalLawns);
    // ------------------------------------------------
    form.vegPerPlate && formData.append("vegPerPlate", form.vegPerPlate);
    form.nonVegPerPlate &&
      formData.append("nonVegPerPlate", form.nonVegPerPlate);
    form.termsandconditions &&
      formData.append("termsandconditions", form.termsandconditions);

    form.allowedVendors &&
      formData.append("allowedVendors", JSON.stringify(form.allowedVendors));
    form.secondNumbers &&
      formData.append("secondNumbers", JSON.stringify(form.secondNumbers));
    form.features && formData.append("features", JSON.stringify(form.features));
    form.plans && formData.append("plans", JSON.stringify(form.plans));
    form.vidLinks && formData.append("vidLinks", JSON.stringify(form.vidLinks));

    fileListAlbum && formData.append("album", JSON.stringify(fileListAlbum1));

    // mainImageDefault && formData.append("mainLink", mainImageDefault);
    // galleryImageDefault &&
    //   formData.append("galleryLink", JSON.stringify(galleryImageDefault));
    // albumImageDefault &&
    //   formData.append("albumLink", JSON.stringify(albumImageDefault));

    // menuImageDefault &&
    //   formData.append("menuLink", JSON.stringify(menuImageDefault));
    // brochureImageDefault &&
    //   formData.append("brochureLink", brochureImageDefault);

    // fileListBrochure &&
    //   fileListBrochure.forEach((item, key) => {
    //     formData.append("brochure", item.originFileObj);
    //   });
    // fileListGallery &&
    //   fileListGallery.forEach((item, key) => {
    //     formData.append("gallery", item.originFileObj);
    //   });
    // fileListMenu &&
    //   fileListMenu.forEach((item, key) => {
    //     formData.append("menu", item.originFileObj);
    //   });
    fileListAlbum &&
      fileListAlbum.forEach(async (item, key) => {
        await compressFiles(item.value, formData, `album${key}`);
      });
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
          await compressFiles(
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
    await compressFiles(fileListMenu, formData, "menu");
    await compressFiles(fileListLMenu, formData, "lmenu");
    await compressFiles(fileListGallery, formData, "gallery");
    await compressFiles(fileListMain, formData, "main");
    await compressFiles(fileListBrochure, formData, "brochure");

    // fileListMain &&
    //   fileListMain.forEach((item, key) => {
    //     formData.append("main", item.blob);
    //   });
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

    // setStatus("Wait....Uploading");

    // if (editable) {
    //   axios
    //     .post(`${PROXY}/item/update`, formData, config)
    //     .then((res) => {
    //       setStatus("Edit Done");
    //       setUploading(false);
    //       editSucsess();
    //       setTimeout(() => {
    //         // location.reload();
    //         router.push("/dashboard");
    //         setStatus("Edit");
    //       }, 3000);
    //     })
    //     .catch((e) => {
    //       console.error(e.message);
    //       setStatus("Error Occured");
    //       uploadErrorr();
    //       setUploading(false);
    //     });
    // } else {
    // axios
    //   .post(`${PROXY}/otp/verify`, {
    //     mobile: form.contactPhone,
    //     otp: otpprod,
    //   })
    //   .then((res) => {
    // if (res.data.success) {
    axios
      .post(`${PROXY}/venueuser/create`, formData)
      .then((res) => {
        alert("Create Successful");
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
        setTimeout(() => {
          // location.reload();
          router.push("/dashboard");
        }, 3000);
        setIsLoading(false);
      })
      .catch((e) => {
        alert(e?.response?.data?.message);
        setIsLoading(false);
        setUploading(false);
      });
    //   }
    // });

    // }
  };
  const [currStep, setCurrentStep] = useState(1);
  return (
    <>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-white py-2 w-100">
            <button
              onClick={() => {
                dispatch(user(undefined));
                localStorage.removeItem("wedcell");
                localStorage.removeItem("role");
                localStorage.setItem("wedcellIsLoged", "");
                router.push("/");
              }}
              className={Styles.logout}
            >
              Logout
            </button>
            <div
              style={{ alignItems: "center", gap: "15px" }}
              className="form-title d-flex flex-column align-item-center"
            >
              <h5 style={{ color: "#b6255a" }}>Venue Registration</h5>
              <Steps totalSteps={6} currStep={currStep}></Steps>
            </div>
            <div className={Styles.form_container}>
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                      <div className={Styles.category_section}>
                        <Select
                          onChange={(e) => {
                            setForm({ ...form, category: e.target.value });
                          }}
                          labelId="asdhbavsgd"
                          // placeholder="category"
                          defaultValue={""}
                          displayEmpty
                          renderValue={
                            form?.category !== ""
                              ? undefined
                              : () => (
                                  <span style={{ color: "#0000009c" }}>
                                    Category
                                  </span>
                                )
                          }
                          fullWidth
                        >
                          <MenuItem
                            value={""}
                            disabled
                            // selected
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
                    <div className="col-12 mt-4">
                      <InputLabel
                        style={{ display: "flex", alignItems: "center" }}
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
                      </InputLabel>
                      <br></br>

                      {form?.secondNumbers?.map((data, key) => {
                        return (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                            className="mt-2"
                          >
                            <div className="col-10">
                              <TextField
                                fullWidth
                                onChange={(e) => {
                                  const dummy = form;
                                  dummy.secondNumbers[key] = e.target.value;
                                  setForm({ ...dummy });
                                }}
                                type="number"
                                value={data}
                                label="Contact Number"
                              />
                            </div>
                            <div
                              className="col-2"
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
                </div>
              ) : currStep == 2 ? (
                <div className={Styles.borders}>
                  <span>Company Address</span>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-2">
                    <div className={Styles.category_section}>
                      <br></br>
                      <TextField
                        fullWidth
                        onChange={(e) => {
                          setForm({
                            ...form,
                            company_address: {
                              ...form.company_address,
                              address1: e.target.value,
                            },
                          });
                        }}
                        value={form?.company_address?.address1}
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
                          fullWidth
                          onChange={(e) => {
                            setForm({
                              ...form,
                              company_address: {
                                ...form.company_address,
                                country: e.target.value,
                              },
                            });
                          }}
                          value={form?.company_address?.country}
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
                              company_address: {
                                ...form.company_address,
                                state: e.target.value,
                              },
                            });
                          }}
                          value={form?.company_address?.state}
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
                              company_address: {
                                ...form.company_address,
                                city: e.target.value,
                              },
                            });
                          }}
                          displayEmpty
                          renderValue={
                            form?.company_address?.city !== ""
                              ? undefined
                              : () => (
                                  <span style={{ color: "#0000009c" }}>
                                    City
                                  </span>
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
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                      <div className={Styles.category_section}>
                        <br></br>
                        <TextField
                          fullWidth
                          onChange={(e) => {
                            setForm({
                              ...form,
                              company_address: {
                                ...form.company_address,
                                pincode: e.target.value,
                              },
                            });
                          }}
                          value={form?.company_address?.pincode}
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
                      className={Styles.plus}
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
                    >
                      +
                    </span>
                  </span>
                  {/* <div className='row mt-3 mb-3'> */}
                  {form?.amenities.map((data, key) => {
                    console.log(
                      `🚀 ~ file: VenueProfile.js:1153 ~ {form?.amenities.map ~ data:`,
                      data
                    );

                    return (
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          alignItems: "center",
                        }}
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
                  {/* </div> */}
                  <span style={{ marginTop: "20px" }}>Vendor Allow Policy</span>
                  <div className="row mt-3 mb-1">
                    <div className="col-3">
                      <span className={Styles.vendorAllow}>Vendor Name</span>
                      <br></br>
                    </div>
                    <div style={{ textAlign: "center" }} className="col-3">
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
                        style={{ display: "flex", justifyContent: "center" }}
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
                    <>
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
                              label="Room Price"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
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

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
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
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
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

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
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
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
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
                      className={Styles.plus}
                      onClick={() => {
                        const newArr = { name: "", value: "" };
                        const dummy = form;
                        dummy.features.push(newArr);
                        setForm({ ...dummy });
                      }}
                    >
                      +
                    </span>
                  </span>
                  {form?.features?.map((data, key) => (
                    <div className="row mt-1 mb-3" key={key}>
                      <div className="col-10">
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
                      marginTop: "30px",
                      marginBottom: "10px",
                    }}
                    className={Styles.label}
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
                  <div className="row  mb-3">
                    {form?.plans?.map((data, key) => (
                      <div className="row mt-3 mb-3" key={key}>
                        <div className="col-8">
                          {/* <br></br> */}
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
                          {/* <br></br> */}
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
                    <div className="col-12">
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
                          label="Terms & Conditions"
                        ></TextField>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={Styles.borders}>
                  <span>Images</span>
                  <div className="row mt-4">
                    <div className="col-12 ">
                      <div className={Styles.category_section1}>
                        <span>Main Image</span>
                        <br></br>
                        <Upload
                          listType="picture-card"
                          fileList={fileListMain}
                          onChange={(fileList, file) =>
                            handleChangeMain(fileList, file)
                          }
                        >
                          {fileListMain.length >= 1 ? null : uploadButton}
                        </Upload>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                      <div className={Styles.category_section1}>
                        <span className={Styles.label}>Liquor Menu</span>
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
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-4">
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
                  <div className="row">
                    {fileListAlbum.map((album, key) => (
                      <div key={key}>
                        <div className="row mt-3 mb-3">
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
                      className={Styles.plus}
                      onClick={() => {
                        const newArr = "";
                        const dummy = form;
                        dummy.vidLinks.push(newArr);
                        setForm({ ...dummy });
                      }}
                    >
                      +
                    </span>
                  </span>
                  <div className="row">
                    <div className=" ol-12">
                      <div className={Styles.category_section}>
                        {form?.vidLinks.map((data, key) => (
                          <div className="row mt-2 mb-3" key={key}>
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
              {/* <div className='mt-5 d-flex justify-content-center align-item-center gap-3'>
                    <button
                      className='primary-btn'
                      onClick={addHandler}
                    >
                      {isLoading ? <Spinner /> : 'Register'}
                    </button>
                    <button
                      className='primary-btn'
                      onClick={() => {
                        dispatch(user(undefined));
                        localStorage.removeItem('wedcell');
                        localStorage.removeItem('role');
                        localStorage.setItem('wedcellIsLoged', '');
                        router.push('/');
                      }}
                    >
                      {'Logout'}
                    </button>
                  </div> */}
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
                  <button onClick={addHandler}>
                    {isLoading ? <Spinner /> : "Register"}
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
                      `${PROXY}/venueuser/delete/${globleuser.data._id}`,
                      {
                        headers: {
                          authorization: globleuser.data.token,
                        },
                      }
                    );
                    console.log("🚀 ~ onClick={ ~ res:", res)
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
        </Box>
      </Modal>
    </>
  );
};

export default VenueModal;
