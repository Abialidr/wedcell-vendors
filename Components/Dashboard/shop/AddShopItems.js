import { PlusOutlined } from "@ant-design/icons";
import { Modal as AntdModal, Upload } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImgCrop from "antd-img-crop";
import { useTheme } from "@mui/styles";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PROXY, S3PROXY } from "../../../config";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
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

import Styles from "../../../styles/Editlist.module.css";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducer/appEssentials";
import compressAndAppendFiles from "../../compressAndAppendFiles";
import compressFileSingle from "../../compressFileSingle";

function AddShopItems({ setCurrState, productId }) {
  const globleuser = useSelector(selectUser);
  const [products, setproducts] = useState([
    {
      name: "",
      psizes: {
        Small: {
          qauntity: 0,
          priceInclusive: 0,
          priceExclusive: 0,
          discount: 0,
          weight: 0,
        },
        Medium: {
          qauntity: 0,
          priceInclusive: 0,
          priceExclusive: 0,
          discount: 0,
          weight: 0,
        },
        Large: {
          qauntity: 0,
          priceInclusive: 0,
          priceExclusive: 0,
          discount: 0,
          weight: 0,
        },
        "Extra Large": {
          qauntity: 0,
          priceInclusive: 0,
          priceExclusive: 0,
          discount: 0,
          weight: 0,
        },
        XXL: {
          qauntity: 0,
          priceInclusive: 0,
          priceExclusive: 0,
          discount: 0,
          weight: 0,
        },
        XXXL: {
          qauntity: 0,
          priceInclusive: 0,
          priceExclusive: 0,
          discount: 0,
          weight: 0,
        },
      },
      fabric: "",
      sleeveLength: "",
      discount: "",
      priceInclusive: 0,
      priceExclusive: 0,
      vidLinks: [""],
    },
  ]);

  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const theme = useTheme();
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

  const [images, setImages] = useState([{}]);

  let [fileListmain, setFileListmain] = useState([
    {
      images: [],
      videos: [],
      main: [],
    },
  ]);
  let [fileListmainDefault, setFileListmainDefault] = useState([]);
  const handleChangeImages = ({ fileList: newFileList, file }, key) => {
    if (file.status !== "removed") {
      if (file.type.includes("image/")) {
        const newFile = fileListmain;
        newFile[key].images = newFileList;
        setFileListmain([...newFile]);
      } else {
        return alert("Something Went Wrong");
      }
    } else {
      const data = newFileList
        .filter((data) => data?.url)
        .map((data) => data?.url);
      const oldFile = products;
      oldFile[key].images = data;
      setproducts([...oldFile]);

      const newFile = fileListmain;
      newFile[key].images = newFileList;
      setFileListmain([...newFile]);
    }
  };
  const handleChangeVideos = ({ fileList: newFileList, file }, key) => {
    if (file.status !== "removed") {
      if (file.type.includes("video/")) {
        const newFile = fileListmain;
        newFile[key].videos = newFileList;
        setFileListmain([...newFile]);
      } else {
        alert("Something Went Wrong");
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      const oldFile = products;
      oldFile[key].videos = data;
      setproducts([...oldFile]);

      const newFile = fileListmain;
      newFile[key].videos = newFileList;
      setFileListmain([...newFile]);
    }
  };

  const onChangemain = ({ fileList: newFileList, file }, key) => {
    if (file.status !== "removed") {
      if (file.type.includes("image/")) {
        const newFile = fileListmain;
        newFile[key].main = newFileList;
        setFileListmain([...newFile]);
      } else {
        alert("Something Went Wrong");
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      const oldFile = products;
      oldFile[key].mainImages = data;
      setproducts([...oldFile]);

      const newFile = fileListmain;
      newFile[key].main = newFileList;
      setFileListmain([...newFile]);
    }
  };
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
  const colors = [
    "Red",
    "Yellow",
    "Green",
    "Blue",
    "Black",
    "White",
    "Brown",
    "Orange",
    "Pink",
    "Grey",
    "Violet",
    "Purple",
    "Cyan",
    "Gold",
  ];
  const categories = [
    {
      name: "Bridal Wear",
      subCategories: [
        "Lehenga",
        "Bridal Lehenga",
        "Gowns",
        "Sharara",
        "Anarkali",
        "Indo Western",
        "Kurta",
      ],
    },
    {
      name: "Groom Wear",
      subCategories: ["Sherwani", "Indo Western"],
    },
  ];

  const occations = [
    "Engagement",
    "Haldi",
    "Mehendi",
    "Cocktail",
    "Wedding",
    "Reception",
    "Sangeet",
  ];

  const sizes = ["Small", "Medium", "Large", "Extra Large", "XXL", "XXXL"];
  const handleSize = (prodkey, size, value, type) => {
    if (type === "discount") {
      if (value >= 0 && value <= 100) {
        const prod1 = products;
        prod1[prodkey].psizes[size][type] = parseInt(value);
        setproducts([...prod1]);
      }
    } else {
      if (value >= 0) {
        const prod1 = products;
        prod1[prodkey].psizes[size][type] = parseInt(value);
        setproducts([...prod1]);
      }
    }
  };

  const [form, setForm] = useState({
    address: "",
    area: "",
    category: "",
    city: "",
    companyName: "",
    contactEmail: "",
    contactPhone: "",
    descrition: "",
    discount: "",
    garmentType: "",
    manufacturingDetails: "",
    occation: "",
    productName: "",
    subCategory: "",
    priceInclusive: 0,
    priceExclusive: 0,
  });
  const [imagesLink, setImagesLink] = useState([]);
  const [width, setWidth] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [vendorId, setVendorId] = useState("");

  const id = productId ? productId : "";
  const [status, setStatus] = useState(productId ? "Edit" : "Submit");

  const [config, setConfig] = useState();

  useEffect(() => {
    if (localStorage.getItem("wedcell") !== null) {
      const config = {
        headers: {
          authorization: globleuser?.data?.token,
        },
      };
      setConfig(config);
      setForm({ ...form, vendorId: globleuser?.data?._id });
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

  const [getState, setGetState] = useState(true);
  useEffect(() => {
    const getdata = async () => {
      await axios
        .post(
          `${PROXY}/product/getoneproduct`,
          {
            _id: id,
            type: "vendors",
            role: "Vendors",
          },
          config
        )
        .then((res) => {
          if (res.data.success) {
            // updateForm({ form: resData });
            setForm(res.data.data.product);
            setproducts(res.data.data.variants);

            let files = res.data.data.variants.map((data) => {
              return {
                main: [setDefaultImages(data.mainImages)],
                images: data.images.map((images) => setDefaultImages(images)),
                videos: data.videos.map((videos) => setDefaultImages(videos)),
              };
            });
            setFileListmain(files);
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
    };

    setIsLoading(true);
    if (id && config) {
      getdata();
    } else {
      setIsLoading(false);
    }
  }, [router, config, id, getState]);

  const [isopen, setisopen] = useState(false);

  const deleteVariant = async (data, key) => {
    if (data._id) {
      try {
        const result = await axios.delete(
          `${PROXY}/product/deleteVariant/${data._id}`,
          config
        );
        if (result.data.success) {
          const newarr = [...products];
          newarr.splice(key, 1);
          const newFile = [...fileListmain];
          newFile.splice(key, 1);
          setproducts(newarr);
          setFileListmain(newFile);
        }
      } catch (error) {
        console.error(
          `🚀 ~ file: AddShopItems.js:469 ~ deleteVariant ~ error:`,
          error
        );
      }
    } else {
      const newarr = [...products];
      newarr.splice(key, 1);
      const newFile = [...fileListmain];
      newFile.splice(key, 1);
      setproducts(newarr);
      setFileListmain(newFile);
    }
  };

  const updateVariant = async (data, type, key) => {
    let variantcheck = {
      status: 0,
    };

    if (
      !products[key].name.length ||
      !products[key].sleeveLength.length ||
      !products[key].fabric.length ||
      !products[key].vidLinks ||
      !products[key].color ||
      !fileListmain[key].images.length ||
      !fileListmain[key].videos.length ||
      !fileListmain[key].main.length
    ) {
      variantcheck.status = 1;
    }
    if (products[key].vidLinks.length < 1 && products[key].vidLinks[0] === "") {
      alert("no Video link found");
    }
    if (variantcheck.status === 1) {
      let message = `please fill all fields in variants ${key}`;
      return alert(message);
    }

    const formdata = new FormData();
    formdata.append("VariantsData", JSON.stringify(products[key]));
    formdata.append("type", type);
    formdata.append("productId", id);

    await Promise.all(
      fileListmain[key].images
        .filter((data) => data.originFileObj)
        .map(async (images) => {
          await compressAndAppendFiles([images], formdata, `album`);
        })
    );
    await Promise.all(
      fileListmain[key].main
        .filter((data) => data.originFileObj)
        .map(async (main) => {
          // formdata.append(`main`, main.originFileObj);
          await compressAndAppendFiles([main], formdata, `main`);
        })
    );
    fileListmain[key].videos
      .filter((data) => data.originFileObj)
      .forEach((videos) => formdata.append(`video`, videos.originFileObj));

    axios
      .post(`${PROXY}/product/updateVariants`, formdata, config)
      .then((res) => {
        if (res.data.success) {
          setGetState(!getState);
          alert("Success");
        } else {
        }
      })
      .catch((e) => console.error(e));
  };

  const addHandler = async () => {
    setStatus("Loading...");
    let variantcheck = {
      status: 0,
      variants: [],
    };
    let productcheck = 0;
    if (
      !form.category.length ||
      !form.descrition.length ||
      !form.garmentType.length ||
      !form.manufacturingDetails.length ||
      !form.occation.length ||
      !form.productName.length ||
      !form.subCategory.length
    ) {
      productcheck = 1;
    }
    products.forEach((data, key) => {
      if (
        !data.name.length ||
        !data.sleeveLength.length ||
        !data.fabric.length ||
        !data.color
      ) {
        variantcheck.status = 1;
        variantcheck.variants.push(key + 1);
      }
      if (data.vidLinks.length < 1) {
        alert("no Video link found");
      }
    });
    fileListmain.forEach((data, key) => {
      if (!data.images.length || !data.videos.length || !data.main.length) {
        variantcheck.status = 1;
        variantcheck.variants.push(key + 1);
      }
    });

    if (variantcheck.status === 1 || productcheck === 1) {
      let message = `please fill all fields in`;
      if (variantcheck.status === 1) {
        variantcheck.variants = [...new Set(variantcheck.variants)];
        message += ` variants ${variantcheck.variants}`;
        if (productcheck === 1) {
          message += ` and `;
        }
      }
      if (productcheck === 1) {
        message += ` product details`;
      }
      setStatus(id ? "Edit Again" : "Submit Again");
      return alert(message);
    }

    const formdata = new FormData();
    formdata.append("ProductData", JSON.stringify(form));
    formdata.append("VariantsData", JSON.stringify(products));
    await Promise.all(
      fileListmain.map(async (data, key) => {
        await Promise.all(
          data.images
            .filter((data) => data.originFileObj)
            .map(async (images) => {
              // const img = await compressFileSingle(images.originFileObj);
              // formdata.append(`album${key}`, img);
              await compressAndAppendFiles([images], formdata, `album${key}`);
            })
        );
        await Promise.all(
          data.main
            .filter((data) => data.originFileObj)
            .map(async (main) => {
              // const img = await compressFileSingle(main.originFileObj);
              // formdata.append(`main${key}`, img);
              await compressAndAppendFiles([main], formdata, `main${key}`);
            })
        );
        data.videos
          .filter((data) => data.originFileObj)
          .forEach((videos) =>
            formdata.append(`video${key}`, videos.originFileObj)
          );
      })
    );

    if (id) {
      axios
        .post(`${PROXY}/product/update`, formdata, config)
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
      axios
        .post(`${PROXY}/product/create`, formdata, config)
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
          {/* <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Company Name</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, companyName: e.target.value });
                  }}
                  type="text"
                  value={form.companyName}
                  placeholder="Company Name"
                  className={Styles.phone_tag}
                  required
                ></input>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Contact Email</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, contactEmail: e.target.value });
                  }}
                  type="text"
                  value={form.contactEmail}
                  placeholder="Contact Email"
                  className={Styles.phone_tag}
                ></input>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <label className={Styles.label}>Contact Phone</label>
              <br></br>
              <input
                onChange={(e) => {
                  setForm({ ...form, contactPhone: e.target.value });
                }}
                type="number"
                value={form.contactPhone}
                placeholder="Contact Phone"
                className={Styles.email_tag}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Address</label>
                <br></br>
                <textarea
                  onChange={(e) => {
                    setForm({ ...form, address: e.target.value });
                  }}
                  type="text"
                  value={form.address}
                  placeholder="Address"
                  className={Styles.phone_tag}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <div className={Styles.category_section}>
                <label className={Styles.label}>City</label>
                <br></br>
                <select
                  onChange={(e) => {
                    setForm({ ...form, city: e.target.value });
                  }}
                  id="city"
                  defaultValue={form.city}
                  className={Styles.select_tag}
                >
                  <option value={""} disabled selected>
                    --select--
                  </option>
                  {cities.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Area</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, area: e.target.value });
                  }}
                  type="text"
                  value={form.area}
                  placeholder="Area"
                  className={Styles.phone_tag}
                ></input>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Category</label>
                <br></br>
                <select
                  onChange={(e) => {
                    setForm({ ...form, category: e.target.value });
                  }}
                  id="category"
                  className={Styles.select_tag}
                  defaultValue={form.category}
                >
                  <option value={""} disabled selected>
                    --select--
                  </option>
                  {categories.map((item, key) => (
                    <option key={key} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Sub Category</label>
                <br></br>
                <select
                  onChange={(e) => {
                    setForm({ ...form, subCategory: e.target.value });
                  }}
                  id="city"
                  className={Styles.select_tag}
                  defaultValue={form.subCategory}
                >
                  <option value={null} disabled selected>
                    --select--
                  </option>
                  {categories.map((item, key) =>
                    form.category === item.name
                      ? item.subCategories.map((sub, i) => (
                          <option key={i} value={sub}>
                            {sub}
                          </option>
                        ))
                      : ""
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className={Styles.category_section}>
                <label className={Styles.label}>For Which Occations</label>
                <br></br>
                <select
                  onChange={(e) => {
                    setForm({ ...form, occation: e.target.value });
                  }}
                  id="city"
                  defaultValue={form.occation}
                  className={Styles.select_tag}
                >
                  <option value={null} selected disabled>
                    --select--
                  </option>
                  {occations.map((item, key) => (
                    <option key={key} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Product Name</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, productName: e.target.value });
                  }}
                  type="text"
                  value={form.productName}
                  placeholder="Product Name"
                  className={Styles.phone_tag}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Discount</label>
                <br></br>
                <input
                  onChange={(e) => {
                    if (e.target.value >= 0 && e.target.value <= 100) {
                      setForm({ ...form, discount: e.target.value });
                      let prodDummy = products;
                      prodDummy = prodDummy.map((product) => {
                        product.discount = e.target.value;
                        product.psizes.Small.discount = e.target.value;
                        product.psizes.Medium.discount = e.target.value;
                        product.psizes.Large.discount = e.target.value;
                        product.psizes["Extra Large"].discount = e.target.value;
                        product.psizes.XXL.discount = e.target.value;
                        product.psizes.XXXL.discount = e.target.value;
                        return product;
                      });
                      setproducts(prodDummy);
                    }
                  }}
                  value={form.discount}
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Discount %"
                  className={Styles.phone_tag}
                ></input>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Garment Type</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, garmentType: e.target.value });
                  }}
                  type="text"
                  value={form.garmentType}
                  placeholder="Garment Type"
                  className={Styles.phone_tag}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <label className={Styles.label}>Price Inclusive</label>
              <br></br>
              <div className={Styles.category_section}>
                <input
                  onChange={(e) => {
                    setForm({ ...form, priceInclusive: e.target.value });
                    let prodDummy = products;
                    prodDummy = prodDummy.map((product) => {
                      product.priceInclusive = e.target.value;
                      product.psizes.Small.priceInclusive = e.target.value;
                      product.psizes.Medium.priceInclusive = e.target.value;
                      product.psizes.Large.priceInclusive = e.target.value;
                      product.psizes["Extra Large"].priceInclusive =
                        e.target.value;
                      product.psizes.XXL.priceInclusive = e.target.value;
                      product.psizes.XXXL.priceInclusive = e.target.value;
                      return product;
                    });
                    setproducts(prodDummy);
                  }}
                  value={form.priceInclusive}
                  type="number"
                  placeholder="Price Inclusive"
                  className={Styles.phone_tag}
                ></input>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <label className={Styles.label}>Price Exclusive</label>
              <br></br>
              <div className={Styles.category_section}>
                <input
                  onChange={(e) => {
                    setForm({ ...form, priceExclusive: e.target.value });
                    let prodDummy = products;
                    prodDummy = prodDummy.map((product) => {
                      product.priceExclusive = e.target.value;
                      product.psizes.Small.priceExclusive = e.target.value;
                      product.psizes.Medium.priceExclusive = e.target.value;
                      product.psizes.Large.priceExclusive = e.target.value;
                      product.psizes["Extra Large"].priceExclusive =
                        e.target.value;
                      product.psizes.XXL.priceExclusive = e.target.value;
                      product.psizes.XXXL.priceExclusive = e.target.value;
                      return product;
                    });
                    setproducts(prodDummy);
                  }}
                  value={form.priceExclusive}
                  type="number"
                  placeholder="Price Exclusive"
                  className={Styles.phone_tag}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className={Styles.category_section}>
                <label className={Styles.label}>Manufacturing Details</label>
                <br></br>
                <textarea
                  onChange={(e) => {
                    setForm({ ...form, manufacturingDetails: e.target.value });
                  }}
                  type="text"
                  value={form.manufacturingDetails}
                  placeholder="Manufacturing Details"
                  className={Styles.phone_tag}
                ></textarea>
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
          <h4
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Variants
            <span
              style={{ fontSize: "25px", marginLeft: "10px" }}
              onClick={() => {
                const newitem = {
                  name: "",
                  psizes: {
                    Small: {
                      qauntity: 0,
                      priceInclusive: 0,
                      priceExclusive: 0,
                      discount: 0,
                      weight: 0,
                    },
                    Medium: {
                      qauntity: 0,
                      priceInclusive: 0,
                      priceExclusive: 0,
                      discount: 0,
                      weight: 0,
                    },
                    Large: {
                      qauntity: 0,
                      priceInclusive: 0,
                      priceExclusive: 0,
                      discount: 0,
                      weight: 0,
                    },
                    "Extra Large": {
                      qauntity: 0,
                      priceInclusive: 0,
                      priceExclusive: 0,
                      discount: 0,
                      weight: 0,
                    },
                    XXL: {
                      qauntity: 0,
                      priceInclusive: 0,
                      priceExclusive: 0,
                      discount: 0,
                      weight: 0,
                    },
                    XXXL: {
                      qauntity: 0,
                      priceInclusive: 0,
                      priceExclusive: 0,
                      discount: 0,
                      weight: 0,
                    },
                  },
                  fabric: "",
                  sleeveLength: "",
                  discount: "",
                  priceInclusive: 0,
                  priceExclusive: 0,
                  vidLinks: [""],
                };
                const newfiles = {
                  images: [],
                  videos: [],
                  main: [],
                };
                setproducts((old) => [...old, newitem]);
                setFileListmain((old) => [...old, newfiles]);
              }}
            >
              +
            </span>
          </h4>
          {products?.map((data, key) => {
            return (
              <div
                className="row"
                style={{
                  backgroundColor: key % 2 === 0 ? "#f8f8f8" : "white",
                }}
                key={key}
              >
                <div
                  style={{
                    borderBottom: "1px solid grey",
                    paddingBottom: "30px",
                    marginBottom: "30px",
                  }}
                >
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className={Styles.category_section}>
                      <label className={Styles.label}>
                        Upload Banner Images
                      </label>
                      <br></br>
                      <ImgCrop rotationSlider aspect={1 / 1}>
                        <Upload
                          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          fileList={fileListmain[key].main}
                          onChange={(e) => onChangemain(e, key)}
                          // onPreview={onPreview}
                        >
                          {fileListmain[key].main?.length < 1 && "+ Upload"}
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
                        fileList={fileListmain[key].images}
                        onChange={(e) => handleChangeImages(e, key)}
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
                        fileList={fileListmain[key].videos}
                        onChange={(e) => handleChangeVideos(e, key)}
                      >
                        {uploadButton}
                      </Upload>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className={Styles.category_section}>
                        <label className={Styles.label}>Variant Name</label>
                        <br></br>
                        <input
                          onChange={(e) => {
                            const newarr = [...products];
                            newarr[key].name = e.target.value;
                            setproducts(newarr);
                          }}
                          type="text"
                          value={data?.name}
                          placeholder="Variant Name"
                          className={Styles.phone_tag}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8">
                      <div className={Styles.category_section}>
                        <label className={Styles.label}>
                          Video Links &nbsp;&nbsp;&nbsp;&nbsp;
                          <span
                            onClick={() => {
                              const newarr = [...products];

                              newarr[key].vidLinks?.push("");

                              setproducts([...newarr]);
                            }}
                            className="fs-5 cursor-pointer"
                          >
                            +
                          </span>
                        </label>
                        <br></br>
                        {data.vidLinks?.map((data1, key1) => (
                          <div className="row mt-3 mb-3">
                            <div className="col-md-4">
                              <input
                                onChange={(e) => {
                                  const newarr = [...products];
                                  newarr[key].vidLinks[key1] = e.target.value;
                                  setproducts(newarr);
                                }}
                                value={data1}
                                type="text"
                                placeholder="https://youtu.be/dOKQeqGNJwY"
                                className={Styles.phone_tag}
                              />
                            </div>
                            <div className="col-md-4" style={{ marginTop: 10 }}>
                              <span
                                onClick={() => {
                                  const newarr = [...products];

                                  newarr[key].vidLinks.splice(key1, 1);

                                  setproducts(newarr);
                                  // setForm({ ...form, features: newarr });
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
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                      <div className={Styles.category_section}>
                        <label className={Styles.label}>Color</label>
                        <br></br>
                        <select
                          onChange={(e) => {
                            const newarr = [...products];
                            newarr[key].color = e.target.value;
                            setproducts(newarr);
                          }}
                          id="color"
                          defaultValue={data?.color}
                          className={Styles.select_tag}
                        >
                          <option value={""} disabled selected>
                            --select--
                          </option>
                          {colors.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className={Styles.category_section}>
                        <h5
                          style={{
                            textAlign: "left",
                            marginTop: "20px",
                          }}
                        >
                          Sizes
                        </h5>
                        <br></br>
                        {sizes?.map((size, key1) => {
                          return (
                            <div
                              className="row"
                              style={{ marginBottom: "20px" }}
                              key={key1}
                            >
                              <div
                                className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div className={Styles.category_section}>
                                  <h6>{size}</h6>
                                </div>
                              </div>

                              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                                <label className={Styles.label}>Quantity</label>
                                <br></br>
                                <div className={Styles.category_section}>
                                  <input
                                    onChange={(e) => {
                                      handleSize(
                                        key,
                                        size,
                                        e.target.value,
                                        "qauntity"
                                      );
                                    }}
                                    type="number"
                                    value={data?.psizes[size]?.qauntity}
                                    placeholder="Quantity"
                                    className={Styles.phone_tag}
                                  ></input>
                                </div>
                              </div>
                              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                                <label className={Styles.label}>
                                  Price Inclusive
                                </label>
                                <br></br>
                                <div className={Styles.category_section}>
                                  <input
                                    onChange={(e) => {
                                      handleSize(
                                        key,
                                        size,
                                        e.target.value,
                                        "priceInclusive"
                                      );
                                    }}
                                    type="number"
                                    value={data?.psizes[size]?.priceInclusive}
                                    placeholder="Price Inclusive"
                                    className={Styles.phone_tag}
                                  ></input>
                                </div>
                              </div>
                              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                                <label className={Styles.label}>
                                  Price Exclusive
                                </label>
                                <br></br>
                                <div className={Styles.category_section}>
                                  <input
                                    onChange={(e) => {
                                      handleSize(
                                        key,
                                        size,
                                        e.target.value,
                                        "priceExclusive"
                                      );
                                    }}
                                    type="number"
                                    value={data?.psizes[size]?.priceExclusive}
                                    placeholder="Price Exclusive"
                                    className={Styles.phone_tag}
                                  ></input>
                                </div>
                              </div>
                              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                                <label className={Styles.label}>Discount</label>
                                <br></br>
                                <div className={Styles.category_section}>
                                  <input
                                    onChange={(e) => {
                                      handleSize(
                                        key,
                                        size,
                                        e.target.value,
                                        "discount"
                                      );
                                    }}
                                    type="number"
                                    value={data?.psizes[size]?.discount}
                                    placeholder="Discount %"
                                    className={Styles.phone_tag}
                                  ></input>
                                </div>
                              </div>
                              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                                <label className={Styles.label}>Weight</label>
                                <br></br>
                                <div className={Styles.category_section}>
                                  <input
                                    onChange={(e) => {
                                      handleSize(
                                        key,
                                        size,
                                        e.target.value,
                                        "weight"
                                      );
                                    }}
                                    type="number"
                                    value={data?.psizes[size]?.weight}
                                    placeholder="Weight gm"
                                    className={Styles.phone_tag}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                      <label className={Styles.label}>Price Inclusive</label>
                      <br></br>
                      <div className={Styles.category_section}>
                        <input
                          onChange={(e) => {
                            const newarr = [...products];
                            newarr[key].priceInclusive = e.target.value;
                            newarr[key].psizes.Small.priceInclusive =
                              e.target.value;
                            newarr[key].psizes.Medium.priceInclusive =
                              e.target.value;
                            newarr[key].psizes.Large.priceInclusive =
                              e.target.value;
                            newarr[key].psizes["Extra Large"].priceInclusive =
                              e.target.value;
                            newarr[key].psizes.XXL.priceInclusive =
                              e.target.value;
                            newarr[key].psizes.XXXL.priceInclusive =
                              e.target.value;
                            setproducts(newarr);
                          }}
                          value={data.priceInclusive}
                          type="number"
                          placeholder="Price Inclusive"
                          className={Styles.phone_tag}
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                      <label className={Styles.label}>Price Exclusive</label>
                      <br></br>
                      <div className={Styles.category_section}>
                        <input
                          onChange={(e) => {
                            const newarr = [...products];
                            newarr[key].priceExclusive = e.target.value;
                            newarr[key].psizes.Small.priceExclusive =
                              e.target.value;
                            newarr[key].psizes.Medium.priceExclusive =
                              e.target.value;
                            newarr[key].psizes.Large.priceExclusive =
                              e.target.value;
                            newarr[key].psizes["Extra Large"].priceExclusive =
                              e.target.value;
                            newarr[key].psizes.XXL.priceExclusive =
                              e.target.value;
                            newarr[key].psizes.XXXL.priceExclusive =
                              e.target.value;
                            setproducts(newarr);
                          }}
                          value={data.priceExclusive}
                          type="number"
                          placeholder="Price Exclusive"
                          className={Styles.phone_tag}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                      <label className={Styles.label}>Fabric</label>
                      <br></br>
                      <div className={Styles.category_section}>
                        <input
                          onChange={(e) => {
                            const newarr = [...products];
                            newarr[key].fabric = e.target.value;
                            setproducts(newarr);
                          }}
                          type="text"
                          value={data?.fabric}
                          placeholder="Fabric"
                          className={Styles.phone_tag}
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                      <label className={Styles.label}>
                        Sleeve Length (in cm)
                      </label>
                      <br></br>
                      <div className={Styles.category_section}>
                        <input
                          onChange={(e) => {
                            const newarr = [...products];
                            newarr[key].sleeveLength = e.target.value;
                            setproducts(newarr);
                          }}
                          type="text"
                          value={data?.sleeveLength}
                          placeholder="Sleeve Length"
                          className={Styles.phone_tag}
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                      <div className={Styles.category_section}>
                        <label className={Styles.label}>Discount</label>
                        <br></br>
                        <input
                          onChange={(e) => {
                            if (e.target.value >= 0 && e.target.value <= 100) {
                              const newarr = [...products];
                              newarr[key].discount = e.target.value;
                              newarr[key].psizes.Small.discount =
                                e.target.value;
                              newarr[key].psizes.Medium.discount =
                                e.target.value;
                              newarr[key].psizes.Large.discount =
                                e.target.value;
                              newarr[key].psizes["Extra Large"].discount =
                                e.target.value;
                              newarr[key].psizes.XXL.discount = e.target.value;
                              newarr[key].psizes.XXXL.discount = e.target.value;
                              setproducts(newarr);
                            }
                          }}
                          type="number"
                          value={data?.discount}
                          placeholder="Discount %"
                          className={Styles.phone_tag}
                        ></input>
                      </div>
                    </div>
                  </div>

                  {id ? (
                    <>
                      {products.length !== 1 ? (
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            marginTop: "30px",
                          }}
                        >
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              width: "15%",
                              padding: "10px",
                              backgroundColor: "#b6255a",
                              color: "white",
                              fontSize: "18px",
                              marginRight: "10px",
                            }}
                            onClick={() => {
                              updateVariant(
                                data,
                                data._id ? "Update" : "Add",
                                key
                              );
                            }}
                          >
                            {data._id ? "Update" : "Add"}
                          </button>
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              width: "15%",
                              padding: "10px",
                              backgroundColor: "white",
                              color: "#b6255a",
                              fontSize: "18px",
                              marginRight: "10px",
                              border: "1px solid #b6255a",
                            }}
                            onClick={() => deleteVariant(data, key)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      {products.length !== 1 ? (
                        <div className="col-md-4" style={{ marginTop: 30 }}>
                          <span
                            onClick={() => {
                              const newarr = [...products];
                              newarr.splice(key, 1);
                              const newFile = [...fileListmain];
                              newFile.splice(key, 1);
                              setproducts(newarr);
                              setFileListmain(newFile);
                            }}
                            className="fs-5 cursor-pointer"
                          >
                            <RiDeleteBin6Line />
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
          <div className="d-block mt-3">
            <button
              onClick={addHandler}
              className={` primary-btn`}
              disabled={uploading ? true : false}
            >
              {status}
            </button>
          </div>
        </div>
      )}
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
    </div>
  );
}
export default AddShopItems;
