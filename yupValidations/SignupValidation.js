import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const signupforVenueVal = yup.object({
  name: yup.string().required("No Name Provided"),
  category: yup.string().required("No Category Provided"),
  description: yup.string().required("No Description Provided"),
  contactEmail: yup
    .string()
    .required("No Email Provided")
    .email("Enter Proper Email"),
  termsandconditions: yup.string().required("No Terms Provided"),
  company_address: yup.object({
    address1: yup.string().required("No Address 1 Provided"),
    state: yup.string().required("No State Provided"),
    city: yup.string().required("No City Provided"),
    pincode: yup
      .string()
      .required("No Pincode Provided")
      .matches(/^\d+$/, "Pincode Should Be in Numbers")
      .length(6, "Pincode Should be 6 Digits"),
  }),
  price: yup
    .string()
    .required("No Room Price Provided")
    .matches(/^\d+$/, "Room Price Should Be in Numbers"),
  vegPerPlate: yup
    .string()
    .required("No Veg Per/Plate Provided")
    .matches(/^\d+$/, "Veg Per/Plate Should Be in Numbers"),
  nonVegPerPlate: yup
    .string()
    .required("No Non-Veg Per/Plate Provided")
    .matches(/^\d+$/, "Non-Veg Per/Plate Should Be in Numbers"),
  totalRooms: yup
    .string()
    .required("No Total Room Provided")
    .matches(/^\d+$/, "Total Room Should Be in Numbers"),
  totalBanquet: yup
    .string()
    .required("No Total Banquet Provided")
    .matches(/^\d+$/, "Total Banquet Should Be in Numbers"),
  totalLawns: yup
    .string()
    .required("No Total Lawn Provided")
    .matches(/^\d+$/, "Total Lawn Should Be in Numbers"),
  contactPhone: yup
    .string()
    .trim("No Space Should Be Provided In Mobile Number")
    .matches(/^\d+$/, "Mobile No. Should Be in Numbers")
    .length(10, "Mobile No. Should be 10 Digits")
    .required("No Mobile No. Provided"),
  password: yup.string().required("No Password Provided"),
  secondNumbers: yup
    .array()
    .of(
      yup
        .string()
        .required("Please Fill Second Number")
        .matches(/^\d+$/, "Second Number Should Be in Numbers")
        .length(10, "Second Number Should be 10 Digits")
    ),
  vidLinks: yup
    .array()
    .of(yup.string().required("Please Add Video Link"))
    .min(1, "Please Enter Atleast one Video Link"),
  plans: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Fill Plan Name"),
      })
    )
    .min(1, "Please Enter Atleast one Plan"),
  amenities: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Fill Lawn & Banquet Name"),
        min: yup
          .string()
          .required("Fill Lawn & Banquet Minimum Capacity")
          .matches(/^\d+$/, "Minimum Capacity Should Be in Numbers"),
        max: yup
          .string()
          .required("Fill Lawn & Banquet Maximum Capacity")
          .matches(/^\d+$/, "Maximum Capacity Should Be in Numbers"),
      })
    )
    .min(1, "Please Enter Atleast one Lawn & Banquets"),
  features: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Fill Features Name"),
      })
    )
    .min(1, "Please Enter Atleast one Feature"),
  fileListMain: yup.array().length(1, "Main Image is Required"),
  fileListBrochure: yup.array().length(1, "Brochure is Required"),
  fileListGallery: yup.array().min(1, "Insert Atleast 1 Gallery Image"),
  fileListMenu: yup.array().min(1, "Insert Atleast 1 Menu"),
  fileListAlbum: yup
    .array()
    .min(1, "Insert Atleast 1 Album")
    .of(
      yup.object({
        name: yup.string().required("Please enter Album Name"),
        value: yup.array().min(1, "Insert Atleast 1 Album Image"),
      })
    ),
});
export const profileforVenueVal = yup.object({
  name: yup.string().required("No Name Provided"),
  category: yup.string().required("No Category Provided"),
  description: yup.string().required("No Description Provided"),
  contactEmail: yup
    .string()
    .required("No Email Provided")
    .email("Enter Proper Email"),
  termsandconditions: yup.string().required("No Terms Provided"),
  address: yup.string().required("No Address 1 Provided"),
  state: yup.string().required("No State Provided"),
  city: yup.string().required("No City Provided"),
  zipcode: yup
    .string()
    .required("No Pincode Provided")
    .matches(/^\d+$/, "Pincode Should Be in Numbers")
    .length(6, "Pincode Should be 6 Digits"),
  price: yup
    .string()
    .required("No Room Price Provided")
    .matches(/^\d+$/, "Room Price Should Be in Numbers"),
  vegPerPlate: yup
    .string()
    .required("No Veg Per/Plate Provided")
    .matches(/^\d+$/, "Veg Per/Plate Should Be in Numbers"),
  nonVegPerPlate: yup
    .string()
    .required("No Non-Veg Per/Plate Provided")
    .matches(/^\d+$/, "Non-Veg Per/Plate Should Be in Numbers"),
  totalRooms: yup
    .string()
    .required("No Total Room Provided")
    .matches(/^\d+$/, "Total Room Should Be in Numbers"),
  totalBanquet: yup
    .string()
    .required("No Total Banquet Provided")
    .matches(/^\d+$/, "Total Banquet Should Be in Numbers"),
  totalLawns: yup
    .string()
    .required("No Total Lawn Provided")
    .matches(/^\d+$/, "Total Lawn Should Be in Numbers"),
  contactPhone: yup
    .string()
    .trim("No Space Should Be Provided In Mobile Number")
    .matches(/^\d+$/, "Mobile No. Should Be in Numbers")
    // .length(10, 'Mobile No. Should be 10 Digits')
    .required("No Mobile No. Provided"),
  secondNumbers: yup
    .array()
    .of(
      yup
        .string()
        .required("Please Fill Second Number")
        .matches(/^\d+$/, "Second Number Should Be in Numbers")
        .length(10, "Second Number Should be 10 Digits")
    ),
  vidLinks: yup
    .array()
    .of(yup.string().required("Please Add Video Link"))
    .min(1, "Please Enter Atleast one Video Link"),
  plans: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Fill Plan Name"),
      })
    )
    .min(1, "Please Enter Atleast one Plan"),
  amenities: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Fill Lawn & Banquet Name"),
        min: yup
          .string()
          .required("Fill Lawn & Banquet Minimum Capacity")
          .matches(/^\d+$/, "Minimum Capacity Should Be in Numbers"),
        max: yup
          .string()
          .required("Fill Lawn & Banquet Maximum Capacity")
          .matches(/^\d+$/, "Maximum Capacity Should Be in Numbers"),
        layout: yup.array().required("Fill Lawn & Banquet Maximum Capacity"),
        sqaurefeet: yup
          .string()
          .required("Fill Lawn & Banquet Maximum Capacity")
          .matches(/^\d+$/, "Maximum Capacity Should Be in Numbers"),
      })
    )
    .min(1, "Please Enter Atleast one Lawn & Banquets"),
  features: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Fill Features Name"),
      })
    )
    .min(1, "Please Enter Atleast one Feature"),
  fileListMain: yup
    .mixed()
    .test("asjldjhalskdjlas", "Main Image is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  fileListBrochure: yup
    .mixed()
    .test("asjldjhalskdjlas", "Brochure is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  fileListGallery: yup
    .mixed()
    .test("Gallery Image is Required", "Gallery Image is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  fileListMenu: yup
    .mixed()
    .test("Menu is Required", "Menu is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  fileListAlbum: yup
    .array()
    .min(1, "Insert Atleast 1 Album")
    .of(
      yup.object({
        name: yup.string().required("Please enter Album Name"),
        value: yup
          .mixed()
          .test(
            "Album Image is Required",
            "Album Image is Required",
            (value) => {
              if (typeof value[0].url === "string" || value[0]?.originFileObj) {
                return true;
              } else {
                return false;
              }
            }
          ),
      })
    ),
});
// ====================================================================
export const signupforVendorVal = yup.object({
  name: yup.string().required("No Name Provided"),
  category: yup.string().required("No Category Provided"),
  subCategory: yup.string().required("No Sub Category Provided"),
  description: yup.string().required("No Description Provided"),
  contactEmail: yup
    .string()
    .required("No Email Provided")
    .email("Enter Proper Email"),
  termsandconditions: yup.string().required("No Terms Provided"),
  company_address: yup.object({
    address1: yup.string().required("No Address 1 Provided"),
    state: yup.string().required("No State Provided"),
    city: yup.string().required("No City Provided"),
    pincode: yup
      .string()
      .required("No Pincode Provided")
      .matches(/^\d+$/, "Pincode Should Be in Numbers")
      .length(6, "Pincode Should be 6 Digits"),
  }),
  price: yup
    .string()
    .required("No Amenty Price Provided")
    .matches(/^\d+$/, "Amenty Price Should Be in Numbers"),
  contactPhone: yup
    .string()
    .trim("No Space Should Be Provided In Mobile Number")
    .matches(/^\d+$/, "Mobile No. Should Be in Numbers")
    .length(10, "Mobile No. Should be 10 Digits")
    .required("No Mobile No. Provided"),
  password: yup.string().required("No Password Provided"),
  secondNumbers: yup
    .array()
    .of(
      yup
        .string()
        .required("Please Fill Second Number")
        .matches(/^\d+$/, "Second Number Should Be in Numbers")
        .length(10, "Second Number Should be 10 Digits")
    ),
  vidLinks: yup
    .array()
    .of(yup.string().required("Please Add Video Link"))
    .min(1, "Please Enter Atleast one Video Link"),
  plans: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Fill Plan Name"),
      })
    )
    .min(1, "Please Enter Atleast one Plan"),
  fileListMain: yup.array().length(1, "Main Image is Required"),
  fileListBrochure: yup.array().length(1, "Brochure is Required"),
  fileListGallery: yup.array().min(1, "Insert Atleast 1 Gallery Image"),
  fileListAlbum: yup
    .array()
    .min(1, "Insert Atleast 1 Album")
    .of(
      yup.object({
        name: yup.string().required("Please enter Album Name"),
        value: yup.array().min(1, "Insert Atleast 1 Album Image"),
      })
    ),
});
export const profileforVendorVal = yup.object({
  name: yup.string().required("No Name Provided"),
  category: yup.string().required("No Category Provided"),
  subCategory: yup.string().required("No Sub Category Provided"),
  description: yup.string().required("No Description Provided"),
  contactEmail: yup
    .string()
    .required("No Email Provided")
    .email("Enter Proper Email"),
  termsandconditions: yup.string().required("No Terms Provided"),

  address: yup.string().required("No Address Provided"),
  state: yup.string().required("No State Provided"),
  city: yup.string().required("No City Provided"),
  zipcode: yup
    .string()
    .required("No Pincode Provided")
    .matches(/^\d+$/, "Pincode Should Be in Numbers")
    .length(6, "Pincode Should be 6 Digits"),
  price: yup
    .string()
    .required("No Amenty Price Provided")
    .matches(/^\d+$/, "Amenty Price Should Be in Numbers"),
  contactPhone: yup
    .string()
    .trim("No Space Should Be Provided In Mobile Number")
    .matches(/^\d+$/, "Mobile No. Should Be in Numbers")
    .required("No Mobile No. Provided"),
  secondNumbers: yup
    .array()
    .of(
      yup
        .string()
        .required("Please Fill Second Number")
        .matches(/^\d+$/, "Second Number Should Be in Numbers")
        .length(10, "Second Number Should be 10 Digits")
    ),
  vidLinks: yup
    .array()
    .of(yup.string().required("Please Add Video Link"))
    .min(1, "Please Enter Atleast one Video Link"),
  plans: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Fill Plan Name"),
      })
    )
    .min(1, "Please Enter Atleast one Plan"),
  fileListMain: yup
    .mixed()
    .test("Main Image is Required", "Main Image is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  fileListBrochure: yup
    .mixed()
    .test("Brochure is Required", "Brochure is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  fileListGallery: yup
    .mixed()
    .test("Gallery Image is Required", "Gallery Image is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  fileListAlbum: yup
    .array()
    .min(1, "Insert Atleast 1 Album")
    .of(
      yup.object({
        name: yup.string().required("Please enter Album Name"),
        value: yup
          .mixed()
          .test(
            "Album Image is Required",
            "Album Image is Required",
            (value) => {
              if (typeof value[0].url === "string" || value[0]?.originFileObj) {
                return true;
              } else {
                return false;
              }
            }
          ),
      })
    ),
});
export const profileforVendorMusicVal = yup.object({
  name: yup.string().required("No Name Provided"),
  category: yup.string().required("No Category Provided"),
  subCategory: yup.string().required("No Sub Category Provided"),
  description: yup.string().required("No Description Provided"),
  contactEmail: yup
    .string()
    .required("No Email Provided")
    .email("Enter Proper Email"),
  termsandconditions: yup.string().required("No Terms Provided"),

  address: yup.string().required("No Address Provided"),
  state: yup.string().required("No State Provided"),
  city: yup.string().required("No City Provided"),
  zipcode: yup
    .string()
    .required("No Pincode Provided")
    .matches(/^\d+$/, "Pincode Should Be in Numbers")
    .length(6, "Pincode Should be 6 Digits"),
  price: yup
    .string()
    .required("No Amenty Price Provided")
    .matches(/^\d+$/, "Amenty Price Should Be in Numbers"),
  contactPhone: yup
    .string()
    .trim("No Space Should Be Provided In Mobile Number")
    .matches(/^\d+$/, "Mobile No. Should Be in Numbers")
    .required("No Mobile No. Provided"),
  secondNumbers: yup
    .array()
    .of(
      yup
        .string()
        .required("Please Fill Second Number")
        .matches(/^\d+$/, "Second Number Should Be in Numbers")
        .length(10, "Second Number Should be 10 Digits")
    ),
  vidLinks: yup
    .array()
    .of(yup.string().required("Please Add Video Link"))
    .min(1, "Please Enter Atleast one Video Link"),
  plans: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Fill Plan Name"),
      })
    )
    .min(1, "Please Enter Atleast one Plan"),
});
// =====================================================================
export const signupforShopnowVal = yup.object({
  name: yup.string().required("No Name Provided"),
  company_name: yup.string().required("No Company Name Provided"),
  password: yup.string().required("No Password Provided"),
  email: yup.string().required("No Email Provided").email("Enter Proper Email"),
  mobile: yup
    .string()
    .trim("No Space Should Be Provided In Mobile Number")
    .matches(/^\d+$/, "Mobile No. Should Be in Numbers")
    .length(10, "Mobile No. Should be 10 Digits")
    .required("No Mobile No. Provided"),
  company_address: yup.string().required("No Company Address Provided"),
  address1: yup.string().required("No Address 1 Provided"),
  address2: yup.string().required("No Address 2 Provided"),
  landmark: yup.string().required("No Landmark Provided"),
  state: yup.string().required("No State Provided"),
  city: yup.string().required("No City Provided"),
  pincode: yup
    .string()
    .required("No Pincode Provided")
    .matches(/^\d+$/, "Pincode Should Be in Numbers")
    .length(6, "Pincode Should be 6 Digits"),
  country: yup.string().required("No Country Provided"),
  profilePic: yup.array().length(1, "Profile Pic is Required"),
  coverPic: yup.array().min(1, "Insert Atleast 1 Cover Pic"),
});
export const profileforShopnowVal = yup.object({
  name: yup.string().required("No Name Provided"),
  company_name: yup.string().required("No Company Name Provided"),
  email: yup.string().required("No Email Provided").email("Enter Proper Email"),
  mobile: yup
    .string()
    .trim("No Space Should Be Provided In Mobile Number")
    .matches(/^\d+$/, "Mobile No. Should Be in Numbers")
    .length(10, "Mobile No. Should be 10 Digits")
    .required("No Mobile No. Provided"),
  company_address: yup.string().required("No Company Address Provided"),
  address1: yup.string().required("No Address 1 Provided"),
  address2: yup.string().required("No Address 2 Provided"),
  landmark: yup.string().required("No Landmark Provided"),
  state: yup.string().required("No State Provided"),
  city: yup.string().required("No City Provided"),
  pincode: yup
    .string()
    .required("No Pincode Provided")
    .matches(/^\d+$/, "Pincode Should Be in Numbers")
    .length(6, "Pincode Should be 6 Digits"),
  country: yup.string().required("No Country Provided"),
  profilePic: yup
    .mixed()
    .test("asjldjhalskdjlas", "Profile Pic is Required", (value) => {
      if (typeof value === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
  coverPic: yup
    .mixed()
    .test("coverPic is Required", "coverPic is Required", (value) => {
      if (typeof value[0].url === "string" || value[0]?.originFileObj) {
        return true;
      } else {
        return false;
      }
    }),
});
