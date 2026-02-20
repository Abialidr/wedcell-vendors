import { useEffect, useState } from "react";
import ShopNowBox from "../../Components/Dashboard/ShopNowBox";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import Layout from "../../Components/Dashboard/layout";
import AddShopItems from "../../Components/Dashboard/shop/AddShopItems";
import AddOtherProduct from "../../Components/Dashboard/shop/AddOtherProduct";
import ShopNowModal from "../../Components/Auth/ShopNowModal";
import OtherProductBox from "../../Components/Dashboard/OtherProductBox";
import DecorBox from "../../Components/Dashboard/DecorBox";
import AddDecor from "../../Components/Dashboard/shop/AddDecor";
import EditDecor from "../../Components/Dashboard/shop/EditDecor";

const Dashboard = () => {
  const [productId, setproductId] = useState(true);
  const [currState, setCurrState] = useState("Listing");
  const globleuser = useSelector(selectUser);
  console.log(
    "🚀 ~ file: sellersdashboard.js:16 ~ Dashboard ~ globleuser:",
    globleuser
  );
  const router = useRouter();

  // const [data, setData] = useState();

  // useEffect(() => {
  //   const auth = localStorage.getItem("wedcell");
  //   const role = localStorage.getItem("role");
  //   setData(JSON.parse(auth));

  //   // if (!auth || JSON.parse(role).role !== "ShopNow") {
  //   //   router.push("/");
  //   // }
  // }, []);
  let [open, setOpen] = useState(false);
  useEffect(() => {
    if (!globleuser?.data?.email) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [globleuser]);
  if (globleuser?.data?.categories === "Clothes") {
    return (
      <Layout>
        <ShopNowModal openModal={open}></ShopNowModal>
        {currState === "Listing" ? (
          <ShopNowBox setCurrState={setCurrState} setproductId={setproductId} />
        ) : currState === "AddShopItem" ? (
          <AddShopItems
            setCurrState={setCurrState}
            productId={productId}
          ></AddShopItems>
        ) : (
          <></>
        )}
      </Layout>
    );
  } else if (globleuser?.data?.category === "Planning & Decor") {
    return (
      <Layout>
        {currState === "Listing" ? (
          <DecorBox setCurrState={setCurrState} setproductId={setproductId} />
        ) : currState === "AddShopItem" ? (
          <AddDecor setCurrState={setCurrState}></AddDecor>
        ) : currState === "EditShopItem" ? (
          <EditDecor
            setCurrState={setCurrState}
            productId={productId}
          ></EditDecor>
        ) : (
          <></>
        )}
      </Layout>
    );
  } else {
    return (
      <Layout>
        <ShopNowModal openModal={open}></ShopNowModal>
        {currState === "Listing" ? (
          <OtherProductBox
            setCurrState={setCurrState}
            setproductId={setproductId}
          />
        ) : currState === "AddShopItem" ? (
          <AddOtherProduct
            setCurrState={setCurrState}
            productId={productId}
          ></AddOtherProduct>
        ) : (
          <></>
        )}
      </Layout>
    );
  }
};

export default Dashboard;
