import Header from "../../Components/Dashboard/Header";
import Styles from "../../styles/Dashboard/Dashboard.module.css";
import { useEffect, useState } from "react";
import Sidebar from "../../Components/Dashboard/Sidebar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginRoute, selectUser } from "../../redux/reducer/appEssentials";
import Layout from "../../Components/Dashboard/layout";
const pricing = () => {
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    !globleuser.success && router.push("/");
  }, []);
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    let user = globleuser;
    if (!user) {
      router.push("/vendor-login");
      dispatch(
        loginRoute({
          pathname: router.pathname,
          query: router.query,
        })
      );
    }
  }, [router]);
  return (
    <Layout>
      <div className="section header mb-3">
        <h4>Pricing Plan</h4>
        <span className="text-gray">Choose wisely your pricing plan.</span>
      </div>
      <div className="plan-status-card-container mb-3 ">
        <div className="row">
          <div className="col-md-3">
            <div className="bg-white box-shadow py-4 ">
              <h5 className="fw-bold text-center mb-3">Plan Type</h5>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bg-white box-shadow py-4 ">
              <h5 className="fw-bold text-center mb-3">Time Duration </h5>
              <div className="date d-flex align-items-center justify-content-center">
                <span className="text-gray">Started: 1970-01-01</span>
                <span className="primary-text ms-2">Expired: 1970-01-01</span>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white box-shadow py-4 ">
              <h5 className="fw-bold text-center mb-3">Status</h5>
              <span className="d-block  text-center">Deactivated</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row gy-4">
        <div className="col-md-4">
          <div
            className={`bg-white box-shadow py-5 text-center  ${Styles.border_3}`}
          >
            <span className="primary-text fs-3 text-uppercase fw-bold">
              Basic
            </span>
            <h3 className="mt-3 text-black ">Free</h3>
            <span className="mt-3 text-black fw-semi d-block fs-5">
              10 Wedding Leads
            </span>
            <span className="mt-3 text-black fw-semi d-block fs-5">
              30 Days Listing
            </span>
            <span className="mt-3 text-black fw-semi d-block fs-5">
              Basic Listing
            </span>
            <span className="mt-3 text-black fw-semi d-block fs-5">
              Limited Support
            </span>

            <button className="primary-btn fw-bold d-block mt-4 mx-auto">
              Get One Month Free
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className={`primary-bg box-shadow py-5 text-center  ${Styles.border_3}`}
          >
            <span className="text-white fs-3 text-uppercase fw-bold">
              Standard
            </span>
            <h3 className="mt-3 text-white ">9999</h3>
            <span className="mt-3 text-white fw-semi d-block fs-5">
              50 Wedding Leads
            </span>
            <span className="mt-3 text-white fw-semi d-block fs-5">
              60 Days Availability
            </span>
            <span className="mt-3 text-white fw-semi d-block fs-5">
              Standards Listing
            </span>
            <span className="mt-3 text-white fw-semi d-block fs-5">
              24/7 Support
            </span>

            <button className="secondary-btn fw-bold d-block mt-4 mx-auto">
              Select Plan
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className={`bg-white box-shadow py-5 text-center  ${Styles.border_3}`}
          >
            <span className="primary-text fs-3 text-uppercase fw-bold">
              Premium
            </span>
            <h3 className="mt-3 text-black ">19999</h3>
            <span className="mt-3 text-black fw-semi d-block fs-5">
              125 Wedding Leads
            </span>
            <span className="mt-3 text-black fw-semi d-block fs-5">
              90 Days Availability
            </span>
            <span className="mt-3 text-black fw-semi d-block fs-5">
              Featured In Top 10 Results
            </span>
            <span className="mt-3 text-black fw-semi d-block fs-5">
              24/7 Support
            </span>

            <button className="primary-btn fw-bold d-block mt-4 mx-auto">
              Select Plan
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default pricing;
