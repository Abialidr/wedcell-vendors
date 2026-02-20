import { useState } from "react";
import Styles from "../../styles/Auth/Auth.module.css";
import VenueRegLogin from "./VenueRegLogin";
import VendorRegLogin from "./VendorRegLogin";
import ShopNowRegLogin from "./ShopNowRegLogin";
import { MenuItem, Select } from "@mui/material";
import { S3PROXY } from "../../config/index";
const AuthForm = () => {
  const [active, setActive] = useState("login");
  const [venVendShop, setVenVendShop] = useState("Venue");

  return (
    <div className={Styles.form_container}>
      <div className={Styles.leftDiv}>
        <img src={`${S3PROXY}/vendors/images/loginim.svg`} alt="" />
      </div>
      <div className={Styles.rightSide}>
        <div className="form-title">
          <h5>
            Welcome Back{" "}
            {venVendShop === "Venue" || venVendShop === "Vendor"
              ? venVendShop
              : "Product"}{" "}
            Dealer
          </h5>
        </div>
        <label className="form-label text-gray mb-4">
          Join wedcell get your{" "}
          {venVendShop === "Venue"
            ? "Venue"
            : venVendShop === "Vendor"
            ? "Services"
            : "Products"}{" "}
          listed or to claim your listing for FREE!
        </label>
        <div className="">
          <span style={{}}>Select Type</span>
          <Select
            style={{ width: "100%" }}
            value={venVendShop}
            labelId="demo-simple-select-label"
            placeholder="Attending"
            onChange={async (e) => {
              setVenVendShop(e.target.value);
            }}
          >
            <MenuItem value={"Venue"}>Venue</MenuItem>
            <MenuItem value={"Vendor"}>Vendor</MenuItem>
            <MenuItem value={"ShopNow"}>Product</MenuItem>
            {/* <MenuItem value={"Product"}></MenuItem> */}
          </Select>
          {/* <span
            className={
              venVendShop === "Venue"
                ? "cursor-pointer primary-text  fs-5 w-33 text-center py-3"
                : "cursor-pointer fs-5 w-33 text-center py-3"
            }
            style={{
              borderBottom: venVendShop === "Venue" ? "2px solid #b5255c" : "",
              cursor: "pointer",
              boxShadow:
                venVendShop === "Venue" ? "0px 2px 0px 0px #32323253" : "",
              color: venVendShop === "Venue" ? "" : "#32323253",
              width: "33%",
            }}
            onClick={() => setVenVendShop("Venue")}>
            Venue
          </span>
          <span
            className={
              venVendShop === "Vendor"
                ? "cursor-pointer primary-text  fs-5 w-33 text-center py-3"
                : "cursor-pointer fs-5 w-33 text-center py-3"
            }
            style={{
              borderBottom: venVendShop === "Vendor" ? "2px solid #b5255c" : "",
              cursor: "pointer",
              boxShadow:
                venVendShop === "Vendor" ? "0px 2px 0px 0px #32323253" : "",
              color: venVendShop === "Vendor" ? "" : "#32323253",
              width: "33%",
            }}
            onClick={() => setVenVendShop("Vendor")}>
            Vendor
          </span>
          <span
            className={
              venVendShop === "ShopNow"
                ? "cursor-pointer primary-text  fs-5 w-33 text-center py-3"
                : "cursor-pointer fs-5 w-33 text-center py-3"
            }
            style={{
              borderBottom:
                venVendShop === "ShopNow" ? "2px solid #b5255c" : "",
              cursor: "pointer",
              boxShadow:
                venVendShop === "ShopNow" ? "0px 2px 0px 0px #32323253" : "",
              color: venVendShop === "ShopNow" ? "" : "#32323253",
              width: "33%",
            }}
            onClick={() => setVenVendShop("ShopNow")}>
            Product
          </span> */}
        </div>

        {venVendShop === "Venue" ? (
          <VenueRegLogin active={active} setActive={setActive} />
        ) : venVendShop === "Vendor" ? (
          <VendorRegLogin active={active} setActive={setActive} />
        ) : venVendShop === "ShopNow" ? (
          <ShopNowRegLogin active={active} setActive={setActive} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
