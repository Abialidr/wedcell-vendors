import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROXY } from "../../config";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import Styles from "../../styles/Editlist.module.css";
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
  Modal,
  OutlinedInput,
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
import compressAndAppendFiles from "../compressAndAppendFiles";
import Steps from "../Steps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
const VendorModal = ({ openModal }) => {
  const [deleteAlert, setDeleteAlaert] = useState(false);
  const dispatch = useDispatch();
  const globleuser = useSelector(selectUser);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  let [fileListMain, setFileListMain] = useState([]);
  const [fileListAlbum, setFileListAlbum] = useState([]);
  const [albumImageDefault, setAlbumdefault] = useState([]);
  const [fileListBrochure, setFileListBrochure] = useState([]);
  const [fileListGallery, setFileListGallery] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    subSubCategory: [],
    subCategory: "",
    company_name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    price: "",
    password: "",
    termsandconditions: "",
    company_address: {
      address1: "",
      address2: "",
      landmark: "",
      state: "",
      city: "",
      pincode: "",
      country: "",
    },
    secondNumbers: [],
    plans: [{ name: "", value: "" }],
    vidLinks: [""],
  });
  useEffect(() => {
    setForm({
      ...form,
      termsandconditions:
        "'Booking Policy\n•    Pay 30% of the package price to book the package,\n•    Pay 50% amount before 15days of event \n•    Rest to be paid on the day of the event\n\nCancellation Policy\n•    This booking is non-cancellable. However the booking can be moved to another date at no extra charge.\n•    Advanced can be adjustable in future event if you plan any event with us\n \nTerms\n•    Transportation charges: No transportation charges apply within city. If the event is outside city, Travel & Stay charges shall be borne by the client. \n\n•    After booking confirmation, if you wish to change/alter your booked services in any way (e.g. your chosen event dates or location), we will do our utmost to accommodate these changes but it may not always be possible. Any request for changes must be in writing from the person who made the booking. All costs incurred due to amendments will be borne by you.'",
    });
  }, []);

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
    form.subCategory && formData.append("subCategory", form.subCategory);
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

    form.termsandconditions &&
      formData.append("termsandconditions", form.termsandconditions);
    form.subSubCategory &&
      formData.append("subSubCategory", JSON.stringify(form.subSubCategory));
    form.secondNumbers &&
      formData.append("secondNumbers", JSON.stringify(form.secondNumbers));
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
      .post(`${PROXY}/vendoruser/create`, formData)
      .then((res) => {
        alert("Create Successful");
        res.data.data.token = globleuser?.data?.token;
        res.data.role = globleuser?.role;
        dispatch(user(res.data));
        localStorage.setItem("wedcell", JSON.stringify(res.data));
        setTimeout(() => {
          router.push("/dashboard/sellersdashboard");
        }, 3000);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`🚀 ~ //.then ~ e:`, e);
        alert(e?.response?.data?.message);
        setIsLoading(false);
      });
    //   }
    // });

    // }
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
    height: "fit-content",
    maxHeight: "90vh",
    overflow: "scroll",
    zIndex: "-1",
    paddingBottom: "10px",
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
                        label="Name of Vendor"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6 mt-3">
                      <div className={Styles.category_section}>
                        <Select
                          fullWidth
                          onChange={(e) => {
                            const formm = {};
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
                            }
                            setForm({ ...form, ...formm });
                          }}
                          displayEmpty
                          value={form.category}
                          renderValue={
                            form?.category !== ""
                              ? undefined
                              : () => (
                                  <span style={{ color: "#0000009c" }}>
                                    Category
                                  </span>
                                )
                          }
                          id="category"
                        >
                          <MenuItem value={""} disabled>
                            --select--
                          </MenuItem>
                          {CategotiesList.map((list, key) => (
                            <MenuItem key={list.name} value={list.name}>
                              {list.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6 mt-3">
                      <div className={Styles.category_section}>
                        <Select
                          fullWidth
                          onChange={(e) => {
                            const formm = {};
                            formm.subCategory = e.target.value;
                            formm.subSubCategory = [];
                            if (
                              SubCategoryDefault[e.target.value] !== undefined
                            ) {
                              formm.plans = SubCategoryDefault[e.target.value];
                            } else {
                              formm.plans = [{ name: "", value: "" }];
                            }
                            setForm({ ...form, ...formm });
                          }}
                          displayEmpty
                          value={form.subCategory}
                          renderValue={
                            form?.subCategory !== ""
                              ? undefined
                              : () => (
                                  <span style={{ color: "#0000009c" }}>
                                    Sub Category
                                  </span>
                                )
                          }
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
                  {form.category === "Music & Dance" &&
                  form.subCategory !== "" ? (
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
                              setForm({
                                ...form,
                                subSubCategory: e.target.value,
                              });
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
                                // className={Styles.email_tag}
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
                  <div className="col-xl-12 col-lg-12 col-12 col-sm-12 col-12 mb-2">
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
                    <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6 ">
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
                    <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
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
                    <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6 ">
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
                          value={form?.company_address?.city}
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
                    <div className="col-xl-6 col-lg-6 col-6 col-sm-6 col-6">
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
              ) : currStep == 4 &&
                form.category !== "Music & Dance" &&
                form.category !== "Planning & Decor" ? (
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
                  {form.category !== "Music & Dance" &&
                  form.category !== "Planning & Decor" ? (
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
                      {" "}
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
                                <div
                                  className="col-1"
                                  style={{ marginTop: 10 }}
                                >
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
                  <button onClick={addHandler}>
                    {isLoading ? <Spinner /> : "Register"}
                  </button>
                ) : (
                  <button
                    className={Styles.nextButton}
                    onClick={() => {
                      if (
                        currStep === 1 &&
                        (form.category === "" || form.subCategory === "")
                      ) {
                        alert("please select Category and Sub Category");
                      } else setCurrentStep((prev) => prev + 1);
                    }}
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
                      `${PROXY}/vendoruser/delete/${globleuser.data._id}`,
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

export default VendorModal;
